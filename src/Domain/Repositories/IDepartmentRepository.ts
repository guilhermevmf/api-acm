import { DepartmentDTO } from '@domain/Dtos/Deparment/DepartmentDTO';
import { Department } from '@infra/Typeorm/Entities/Department';

export interface IDepartmentRepository {
    findById(id: string): Promise<Department | undefined>;
    findByName(name: string, unitId: string): Promise<Department | undefined>;
    findAll(unitId: string): Promise<Department[] | undefined>;
    create(data: Omit<DepartmentDTO, 'id'>): Promise<Department | undefined>;
    update(
        data: Omit<DepartmentDTO, 'unitId'>,
    ): Promise<Department | undefined>;
    remove(id: string): Promise<boolean>;
}
