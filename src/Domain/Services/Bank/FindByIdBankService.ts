import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IBankRepository } from '@domain/Repositories/IBankRepository';
import { Bank } from '@infra/Typeorm/Entities/Bank';

@injectable()
export class FindByIdBankService {
    constructor(
        @inject('BankRepository')
        private bankRepository: IBankRepository,
    ) { }

    async execute(id: string): Promise<Bank> {
        const bank = await this.bankRepository.findById(id);
        if (!bank) {
            throw new AppError('Não encontramos esse banco');
        }

        return bank;
    }
}
