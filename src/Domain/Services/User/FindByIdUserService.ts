import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { User } from '@infra/Typeorm/Entities/User';
import { IUserRepository } from '@domain/Repositories/IUserRepository';

@injectable()
export class FindByIdUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) { }

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError('Não encontramos esse usuário');
        }

        return user;
    }
}
