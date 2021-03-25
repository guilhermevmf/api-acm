import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { User } from '@infra/Typeorm/Entities/User';
import { IUserRepository } from '@domain/Repositories/IUserRepository';
import { IUnitRepository } from '@domain/Repositories/IUnitRepository';

@injectable()
export class FindAllUserService {
    constructor(
        @inject('UnitRepository')
        private unitRepository: IUnitRepository,
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) { }

    async execute(unitId: string, userId: string): Promise<User[]> {
        const findUnit = await this.unitRepository.findById(unitId);
        if (!findUnit) {
            throw new AppError('Unidade invalida');
        }

        const users = await this.userRepository.findAll(unitId, userId);
        if (!users) {
            throw new AppError('Não encontramos usuários');
        }

        return users;
    }
}
