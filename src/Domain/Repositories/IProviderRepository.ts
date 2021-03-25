import { ProviderDTO } from '@domain/Dtos/Provider/ProviderDTO';
import { Provider } from '@infra/Typeorm/Entities/Provider';

export interface IProviderRepository {
    findById(id: string): Promise<Provider | undefined>;
    findAll(departmentId: string): Promise<Provider[] | undefined>;
    create(data: Omit<ProviderDTO, 'id'>): Promise<Provider | undefined>;
    update(
        data: Omit<ProviderDTO, 'departmentId'>,
    ): Promise<Provider | undefined>;
    remove(id: string): Promise<boolean>;
}
