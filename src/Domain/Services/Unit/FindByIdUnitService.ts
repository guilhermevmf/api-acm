import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IUnitRepository } from '@domain/Repositories/IUnitRepository';
import { Unit } from '@infra/Typeorm/Entities/Unit';

@injectable()
export class FindByIdUnitService {

    constructor(
        @inject('UnitRepository')
        private unitRepository: IUnitRepository,
    ) { }

    async execute(id: string): Promise<Unit> {
        const unit = await this.unitRepository.findById(id);
        if (!unit) {
            throw new AppError('Não encontramos essa unidade');
        }

        return unit;
    }
}
