import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { Provider } from '@infra/Typeorm/Entities/Provider';
import { IBankRepository } from '@domain/Repositories/IBankRepository';
import { IProviderRepository } from '@domain/Repositories/IProviderRepository';
import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';
import { ProviderDTO } from '@domain/Dtos/Provider/ProviderDTO';

@injectable()
export class UpdateProviderService {
    constructor(
        @inject('BankRepository')
        private bankRepository: IBankRepository,
        @inject('DepartmentRepository')
        private departmentRepository: IDepartmentRepository,
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
    ) { }

    async execute({
        id,
        bankId,
        name,
        document,
        email,
        phone,
        agency,
        typeAccount,
        account,
        digit,
    }: Omit<ProviderDTO, 'departmentId'>): Promise<Provider> {
        const findBank = await this.bankRepository.findById(bankId);
        if (!findBank) {
            throw new AppError('Banco invalido');
        }

        const bank = await this.providerRepository.update({
            id,
            bankId,
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
            throw new AppError('Erro ao atualizar terceiro');
        }

        return bank;
    }
}
