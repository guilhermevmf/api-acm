import { inject, injectable } from 'tsyringe';
import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';
import { AppError } from '@shared/Errors/AppError';
import { Department } from '@infra/Typeorm/Entities/Department';

interface IRequest {
    name: string;
    unitId: string;
}

@injectable()
export class CreateDepartmentService {
    constructor(
        @inject('DepatmentRespository')
        private departmentRepository: IDepartmentRepository,
    ) { }

    async execute({ name, unitId }: IRequest): Promise<Department> {
        const checkName = await this.departmentRepository.findByName(
            name,
            unitId,
        );

        if (checkName) {
            throw new AppError('Já tem um departamento com esse nome');
        }

        const department = await this.departmentRepository.create({
            name,
            unitId,
            active: true,
        });
        if (!department) {
            throw new AppError('Erro ao criar departamento');
        }

        return department;
    }
}
