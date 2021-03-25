import { BankDTO } from '@domain/Dtos/Bank/BankDTO';
import { Bank } from '@infra/Typeorm/Entities/Bank';

export interface IBankRepository {
    findById(id: string): Promise<Bank | undefined>;
    findByName(unitId: string, name: string): Promise<Bank | undefined>;
    findByCode(unitId: string, code: string): Promise<Bank | undefined>;
    findAll(unitId: string): Promise<Bank[] | undefined>;
    create(data: Omit<BankDTO, 'id'>): Promise<Bank | undefined>;
    update(data: Omit<BankDTO, 'unitId'>): Promise<Bank | undefined>;
    remove(id: string): Promise<boolean>;
}
