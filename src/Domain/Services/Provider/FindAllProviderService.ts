import { inject, injectable } from 'tsyringe';
import { IProviderRepository } from '@domain/Repositories/IProviderRepository';
import { Provider } from '@infra/Typeorm/Entities/Provider';
import { AppError } from '@shared/Errors/AppError';
import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';

@injectable()
export class FindAllProviderService {
    constructor(
        @inject('DepartmentRepository')
        private departmentRepository: IDepartmentRepository,
        @inject('ProviverRepository')
        private providerRepository: IProviderRepository,
    ) { }

    async execute(departmentId: string): Promise<Provider[]> {
        const findDepartment = await this.departmentRepository.findById(
            departmentId,
        );
        if (!findDepartment) {
            throw new AppError('Não encontramos esse departamento');
        }

        const providers = await this.providerRepository.findAll(departmentId);
        if (!providers) {
            throw new AppError('Não tem terceiros nesse departamento');
        }

        return providers;
    }
}
