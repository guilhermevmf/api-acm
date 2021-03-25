import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IProviderRepository } from '@domain/Repositories/IProviderRepository';

@injectable()
export class RemoveProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const findProvider = await this.providerRepository.findById(id);
        if (!findProvider) {
            throw new AppError('Não encontramos esse terceiro');
        }

        const result = await this.providerRepository.remove(id);
        if (!result) {
            throw new AppError('Erro ao remover');
        }
    }
}
