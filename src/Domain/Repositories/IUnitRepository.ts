import { UnitDTO } from '@domain/Dtos/Unit/UnitDTO';
import { Unit } from '@infra/Typeorm/Entities/Unit';

export interface IUnitRepository {
    findById(id: string): Promise<Unit | undefined>;
    findByName(name: string): Promise<Unit | undefined>;
    findAll(): Promise<Unit[] | undefined>;
    create(data: Omit<UnitDTO, 'id'>): Promise<Unit | undefined>;
    update(data: UnitDTO): Promise<Unit | undefined>;
    remove(id: string): Promise<boolean>;
}
