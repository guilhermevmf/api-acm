import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { AppError } from '@shared/Errors/AppError';
import { UserReturnToken } from '@domain/Dtos/Auth/UserReturnToken';
import { IUserRepository } from '@domain/Repositories/IUserRepository';

interface IRequest {
    email: string;
    password: string;
}

@injectable()
export class SessionService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) { }

    async execute({ email, password }: IRequest): Promise<UserReturnToken> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('E-mail invalido');
        }

        const checkPassword = await compare(password, user?.password || '');
        if (!checkPassword) {
            throw new AppError('Senha invalida');
        }

        if (!user.active) {
            throw new AppError('Usuário desativado');
        }

        const token = sign(
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

        return {
            token,
            user: user,
        };
    }
}
