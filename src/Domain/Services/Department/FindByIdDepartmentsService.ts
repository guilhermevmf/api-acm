import { inject, injectable } from 'tsyringe';

import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';
import { Department } from '@infra/Typeorm/Entities/Department';
import { AppError } from '@shared/Errors/AppError';

interface IRequest {
    id: string;
}

@injectable()
export class FindByIdDepartmentService {
    constructor(
        @inject('DepartmentRepostory')
        private departmentRepository: IDepartmentRepository,
    ) { }

    async execute({ id }: IRequest): Promise<Department> {
        const department = await this.departmentRepository.findById(id);
        if (!department) {
            throw new AppError('Não encontramos esse departamento');
        }

        return department;
    }
}
