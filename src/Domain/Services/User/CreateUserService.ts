import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { User } from '@infra/Typeorm/Entities/User';
import { UserDTO } from '@domain/Dtos/User/UserDTO';
import { IUserRepository } from '@domain/Repositories/IUserRepository';
import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';

@injectable()
export class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('DepartmentRepository')
        private departmentRespitory: IDepartmentRepository,
    ) { }

    async execute({
        unitId,
        departmentId,
        cod,
        name,
        email,
        role,
        active,
    }: Omit<UserDTO, 'id'>): Promise<User> {
        const findCod = await this.userRepository.findByCod(unitId, cod);
        if (findCod) {
            throw new AppError('Já tem um usuário com esse codigo');
        }

        const findEmail = await this.userRepository.findByEmail(email);
        if (findEmail) {
            throw new AppError('Já tem um usuário com esse e-mail');
        }

        if (departmentId !== undefined && departmentId !== null) {
            const findDepartment = await this.departmentRespitory.findById(
                departmentId,
            );
            if (!findDepartment) {
                throw new AppError('Departmento invalido');
            }
        }

        const user = await this.userRepository.create({
            unitId,
            departmentId,
            cod,
            name,
            email,
            role,
            active,
        });
        if (!user) {
            throw new AppError('Erro ao criar usuário');
        }

        return user;
    }
}
