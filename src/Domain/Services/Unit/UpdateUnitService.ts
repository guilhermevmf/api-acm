import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { UnitDTO } from '@domain/Dtos/Unit/UnitDTO';
import { IUnitRepository } from '@domain/Repositories/IUnitRepository';
import { Unit } from '@infra/Typeorm/Entities/Unit';

@injectable()
export class UpdateUnitService {

    constructor(
        @inject('UnitRepository')
        private unitRepository: IUnitRepository,
    ) { }

    async execute({ id, name, cnpj, active }: UnitDTO): Promise<Unit> {
        const findUnit = await this.unitRepository.findById(id);
        if (!findUnit) {
            throw new AppError('Não encontramos essa unidade');
        }

        const findName = await this.unitRepository.findByName(name);
        const checkName = name !== findName?.name;
        if (findName && !checkName) {
            throw new AppError('Já tem um unidade com esse nome');
        }

        const unit = await this.unitRepository.update({
            id,
            name,
            cnpj,
            active,
        });
        if (!unit) {
            throw new AppError('Erro ao atualizar');
        }

        return unit;
    }

}
