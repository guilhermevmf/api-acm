import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/Errors/AppError';

import { IProviderRepository } from '@domain/Repositories/IProviderRepository';
import { Provider } from '@infra/Typeorm/Entities/Provider';

@injectable()
export class FindByIdProviderService {
    constructor(
        @inject('ProviverRepository')
        private providerRepository: IProviderRepository,
    ) { }

    async execute(departmentId: string): Promise<Provider> {
        const provider = await this.providerRepository.findById(departmentId);
        if (!provider) {
            throw new AppError('Não encontramos esse terceiro');
        }

        return provider;
    }
}
