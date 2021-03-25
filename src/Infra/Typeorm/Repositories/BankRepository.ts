import { getRepository, Repository } from 'typeorm';
import { BankDTO } from '@domain/Dtos/Bank/BankDTO';
import { IBankRepository } from '@domain/Repositories/IBankRepository';
import { Bank } from '../Entities/Bank';

export class BankRepository implements IBankRepository {

    private readonly ormRepository: Repository<Bank>;

    constructor() {
        this.ormRepository = getRepository(Bank);
    }

    async findById(id: string): Promise<Bank | undefined> {
        const bank = await this.ormRepository.findOne({ where: { id } });
        return bank;
    }

    async findByName(unitId: string, name: string): Promise<Bank | undefined> {
        const bank = await this.ormRepository.findOne({
            where: { unitId, name },
        });
        return bank;
    }

    async findByCode(unitId: string, name: string): Promise<Bank | undefined> {
        const bank = await this.ormRepository.findOne({
            where: { unitId, name },
        });
        return bank;
    }

    async findAll(unitId: string): Promise<Bank[] | undefined> {
        const banks = await this.ormRepository.find({ where: { unitId } });
        return banks;
    }

    async create({
        unitId,
        code,
        name,
    }: Omit<BankDTO, 'id'>): Promise<Bank | undefined> {
        const bank = this.ormRepository.create({ unitId, code, name });
        this.ormRepository.save(bank);
        return bank;
    }

    async update({
        id,
        code,
        name,
    }: Omit<BankDTO, 'unitId'>): Promise<Bank | undefined> {
        const bank = this.ormRepository.create({ id, code, name });
        this.ormRepository.save(bank);
        return bank;
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
