import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IBankRepository } from '@domain/Repositories/IBankRepository';
import { Bank } from '@infra/Typeorm/Entities/Bank';
import { IUnitRepository } from '@domain/Repositories/IUnitRepository';

@injectable()
export class FindAllBankService {
    constructor(
        @inject('UnitRepository')
        private unitRepository: IUnitRepository,
        @inject('BankRepository')
        private bankRepository: IBankRepository,
    ) { }

    async execute(unitId: string): Promise<Bank[]> {
        const findUnit = await this.unitRepository.findById(unitId);
        if (!findUnit) {
            throw new AppError('Unidade invalida');
        }

        const banks = await this.bankRepository.findAll(unitId);
        if (!banks) {
            throw new AppError('Não encontramos bancos nessa unidade');
        }

        return banks;
    }
}
