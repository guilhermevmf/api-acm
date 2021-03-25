import { getRepository, Repository } from 'typeorm';
import { Provider } from '../Entities/Provider';

import { ProviderDTO } from '@domain/Dtos/Provider/ProviderDTO';
import { IProviderRepository } from '@domain/Repositories/IProviderRepository';

export class ProviderRepository implements IProviderRepository {

    private readonly ormRepository: Repository<Provider>;

    constructor() {
        this.ormRepository = getRepository(Provider);
    }

    async findById(id: string): Promise<Provider | undefined> {
        const provider = await this.ormRepository.findOne({ where: { id } });
        return provider;
    }

    async findAll(departmentId: string): Promise<Provider[] | undefined> {
        const providers = await this.ormRepository.find({
            where: { departmentId },
        });
        return providers;
    }

    async create({
        bankId,
        departmentId,
        name,
        document,
        email,
        phone,
        agency,
        typeAccount,
        account,
        digit,
    }: Omit<ProviderDTO, 'id'>): Promise<Provider | undefined> {
        const provider = this.ormRepository.create({
            bankId,
            departmentId,
            name,
            document,
            email,
            phone,
            agency,
            typeAccount,
            account,
            digit,
        });
        await this.ormRepository.save(provider);
        return provider;
    }

    async update({
        id,
        bankId,
        name,
        document,
        email,
        phone,
        agency,
        typeAccount,
        account,
        digit,
    }: Omit<ProviderDTO, 'departmentId'>): Promise<Provider | undefined> {
        const provider = this.ormRepository.create({
            id,
            bankId,
            name,
            document,
            email,
            phone,
            agency,
            typeAccount,
            account,
            digit,
        });
        await this.ormRepository.save(provider);
        return provider;
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.ormRepository.delete({ id });

        if (
            result.affected !== undefined &&
            result.affected !== null &&
            result.affected > 0
        ) {
            return true;
        }
        return false;
    }

}
