import { YearDTO } from '@domain/Dtos/Year/YearDTO';
import { Year } from '@infra/Typeorm/Entities/Year';

export interface IYearRepository {
    findById(id: string): Promise<Year | undefined>;
    findAll(unitId: string): Promise<Year[] | undefined>;
    create(data: Omit<YearDTO, 'id'>): Promise<Year | undefined>;
    update(data: YearDTO): Promise<Year | undefined>;
    remove(id: string): Promise<boolean>;
}
