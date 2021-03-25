import { inject, injectable } from 'tsyringe';
import { Unit } from '@infra/Typeorm/Entities/Unit';
import { IUnitRepository } from '@domain/Repositories/IUnitRepository';
import { UnitDTO } from '@domain/Dtos/Unit/UnitDTO';
import { AppError } from '@shared/Errors/AppError';

@injectable()
export class CreateUnitService {
    constructor(
        @inject('UnitRepository')
        private unitRepository: IUnitRepository,
    ) { }

    async execute({ name, cnpj, active }: Omit<UnitDTO, 'id'>): Promise<Unit> {
        const findUnit = await this.unitRepository.findByName(name);
        if (findUnit) {
            throw new AppError('Já tem uma unidade com esse nome');
        }

        const unit = await this.unitRepository.create({ name, cnpj, active });
        if (!unit) {
            throw new AppError('Erro ao criar unidade');
        }

        return unit;
    }
}
