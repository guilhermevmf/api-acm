import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IBankRepository } from '@domain/Repositories/IBankRepository';
import { Bank } from '@infra/Typeorm/Entities/Bank';

interface IRequest {
    id: string;
    unitId: string;
    code: string;
    name: string;
}

@injectable()
export class UpdateBankService {
    constructor(
        @inject('BankRepository')
        private bankRepository: IBankRepository,
    ) { }

    async execute({ id, unitId, name, code }: IRequest): Promise<Bank> {
        const findById = await this.bankRepository.findById(id);
        if (!findById) {
            throw new AppError('Não encontramos esse banco');
        }

        const findCod = await this.bankRepository.findByCode(unitId, code);
        const checkCod = code !== findById?.code;
        if (findCod && checkCod) {
            throw new AppError('Já tem um banco com esse codigo');
        }

        const findName = await this.bankRepository.findByName(unitId, name);
        const checkName = name !== findById.name;
        if (findName && checkName) {
            throw new AppError('Já tem um banco com esse nome');
        }

        const bank = await this.bankRepository.update({ id, code, name });
        if (!bank) {
            throw new AppError('Erro ao atualizar');
        }

        return bank;
    }
}
