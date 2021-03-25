import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IBankRepository } from '@domain/Repositories/IBankRepository';
import { IProviderRepository } from '@domain/Repositories/IProviderRepository';
import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';
import { Provider } from '@infra/Typeorm/Entities/Provider';
import { ProviderDTO } from '@domain/Dtos/Provider/ProviderDTO';

@injectable()
export class CreateProviderService {
    constructor(
        @inject('BankRepository')
        private bankRepository: IBankRepository,
        @inject('DepartmentRepository')
        private departmentRepository: IDepartmentRepository,
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
    ) { }

    async execute({
        bankId,
        departmentId,
        name,
        document,
        email,
        phone,
        agency,
        typeAccount,
        account,
        digit,
    }: Omit<ProviderDTO, 'id'>): Promise<Provider> {
        const findBank = await this.bankRepository.findById(bankId);
        if (!findBank) {
            throw new AppError('Banco invalido');
        }

        const findDepartment = await this.departmentRepository.findById(
            departmentId,
        );
        if (!findDepartment) {
            throw new AppError('Departamento invalido');
        }

        const bank = await this.providerRepository.create({
            bankId,
            departmentId,
            name,
            document,
            email,
            phone,
            agency,
            account,
            typeAccount,
            digit,
        });
        if (!bank) {
            throw new AppError('Erro ao criar terceiro');
        }

        return bank;
    }
}
