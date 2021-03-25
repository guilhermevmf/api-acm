import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';
import { Department } from '@infra/Typeorm/Entities/Department';
import { AppError } from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    unitId: string;
}

@injectable()
export class FindAllDepartmentService {
    constructor(
        @inject('DepartmentRepostory')
        private departmentRepository: IDepartmentRepository,
    ) { }

    async execute({ unitId }: IRequest): Promise<Department[]> {
        const departments = await this.departmentRepository.findAll(unitId);
        if (!departments) {
            throw new AppError('Não encontramos departamentos');
        }

        return departments;
    }
}
