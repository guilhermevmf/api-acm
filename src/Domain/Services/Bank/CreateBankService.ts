import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IBankRepository } from '@domain/Repositories/IBankRepository';
import { Bank } from '@infra/Typeorm/Entities/Bank';

interface IRequest {
    unitId: string;
    code: string;
    name: string;
}

@injectable()
export class CreateBankService {
    constructor(
        @inject('BankRepository')
        private bankRepository: IBankRepository,
    ) { }

    async execute({ unitId, code, name }: IRequest): Promise<Bank> {
        const findByCode = await this.bankRepository.findByCode(unitId, name);
        if (findByCode) {
            throw new AppError('Já tem um banco com esse codigo');
        }

        const findBank = await this.bankRepository.findByName(unitId, name);
        if (findBank) {
            throw new AppError('Já tem um banco com esse nome');
        }

        const bank = await this.bankRepository.create({ unitId, code, name });
        if (!bank) {
            throw new AppError('Erro ao criar o banco');
        }

        return bank;
    }
}
