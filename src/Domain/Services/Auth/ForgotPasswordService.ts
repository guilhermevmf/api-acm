import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { AppError } from '@shared/Errors/AppError';

import { IUserRepository } from '@domain/Repositories/IUserRepository';
import { IUserTokenRepository } from '@domain/Repositories/IUserTokenRepository';

@injectable()
export class ForgotPasswordService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository,
    ) { }

    async execute(email: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('E-mail invalido');
        }

        const token = v4().toString();

        const userToken = await this.userTokenRepository.create(user.id, token);
        if (!userToken) {
            throw new AppError('Erro ao recuperar senha');
        }

        return 'Enviamos um e-mail para recuperar sua senha';
    }
}
