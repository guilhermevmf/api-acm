import { inject, injectable } from 'tsyringe';
import { IUnitRepository } from '@domain/Repositories/IUnitRepository';
import { AppError } from '@shared/Errors/AppError';

@injectable()
export class RemoveUnitService {

    constructor(
        @inject('UnitRepository')
        private unitRepository: IUnitRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const unit = await this.unitRepository.findById(id);
        if (!unit) {
            throw new AppError('Não encontramos essa unidade');
        }

        const remove = await this.unitRepository.remove(id);
        if (!remove) {
            throw new AppError('Erro ao remover essa unidade');
        }
    }
}
