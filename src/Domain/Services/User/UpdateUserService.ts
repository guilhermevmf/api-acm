import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';
import { IUserRepository } from '@domain/Repositories/IUserRepository';
import { User } from '@infra/Typeorm/Entities/User';
import { UserDTO } from '@domain/Dtos/User/UserDTO';

@injectable()
export class UpdateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('DepartmentRepository')
        private departmentRespitory: IDepartmentRepository,
    ) { }

    async execute({
        id,
        unitId,
        departmentId,
        cod,
        name,
        email,
        role,
        active,
    }: UserDTO): Promise<User> {
        const findById = await this.userRepository.findById(id);
        if (!findById) {
            throw new AppError('Não encontramos esse usuário');
        }

        const findCod = await this.userRepository.findByCod(unitId, cod);
        const checkCod = cod !== findById?.cod;
        if (findCod && checkCod) {
            throw new AppError('Já tem um usuário com esse codigo');
        }

        const findEmail = await this.userRepository.findByEmail(email);
        const checkEmail = email !== findById?.email;
        if (findEmail && checkEmail) {
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

        const user = await this.userRepository.update({
            id,
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
