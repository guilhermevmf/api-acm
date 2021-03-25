import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IBankRepository } from '@domain/Repositories/IBankRepository';

@injectable()
export class RemoveBankService {
    constructor(
        @inject('BankRepository')
        private bankRepository: IBankRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const findBank = await this.bankRepository.findById(id);
        if (!findBank) {
            throw new AppError('Não encontramos esse banco');
        }

        const result = await this.bankRepository.remove(id);
        if (!result) {
            throw new AppError('Erro ao remove');
        }
    }
}
