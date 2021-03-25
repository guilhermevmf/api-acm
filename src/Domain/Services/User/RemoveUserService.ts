import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IUserRepository } from '@domain/Repositories/IUserRepository';

@injectable()
export class RemoveUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError('Não encontramos esse usuário');
        }

        const result = await this.userRepository.remove(id);
        if (!result) {
            throw new AppError('Erro ao remove usuário');
        }
    }
}
