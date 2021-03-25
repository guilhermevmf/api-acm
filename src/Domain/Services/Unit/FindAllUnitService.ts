import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IUnitRepository } from '@domain/Repositories/IUnitRepository';
import { Unit } from '@infra/Typeorm/Entities/Unit';

@injectable()
export class FindAllUnitService {

    constructor(
        @inject('UnitRepository')
        private unitRepository: IUnitRepository,
    ) { }

    async execute(): Promise<Unit[]> {
        const units = await this.unitRepository.findAll();
        if (!units) {
            throw new AppError('Não encontramos unidades');
        }

        return units;
    }
}
