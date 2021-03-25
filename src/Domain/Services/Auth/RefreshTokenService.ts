import { inject, injectable } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';

import { AppError } from '@shared/Errors/AppError';
import { IUserRepository } from '@domain/Repositories/IUserRepository';
import { UserReturnToken } from '@domain/Dtos/Auth/UserReturnToken';

@injectable()
export class RefreshTokenService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute(token: string | undefined): Promise<UserReturnToken> {
        if (!token) {
            throw new AppError('Informe o token', 401);
        }

        try {
            const { sub } = verify(token, process.env.TOKEN_KEY || '') as {
                sub: string;
            };

            const user = await this.userRepository.findById(sub);
            if (!user) {
                throw new AppError('Erro ao verificar o token', 401);
            }

            const newToken = sign(
                {
                    sub: user.id,
                    unitId: user.unitId,
                    cod: user.cod,
                    role: user.role,
                },
                process.env.TOKEN_KEY || '',
                {
                    issuer: 'IASDNET',
                    expiresIn: '2d',
                },
            );

            return { user, token: newToken };
        } catch (e) {
            throw new AppError(e.message, e.status);
        }
    }
}
