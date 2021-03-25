import { getRepository, Repository } from 'typeorm';

import { DepartmentDTO } from '@domain/Dtos/Deparment/DepartmentDTO';
import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';
import { Department } from '../Entities/Department';

export class DepartmentRepository implements IDepartmentRepository {
    private ormRepository: Repository<Department>;

    constructor() {
        this.ormRepository = getRepository(Department);
    }

    async findById(id: string): Promise<Department | undefined> {
        const department = await this.ormRepository.findOne({ where: { id } });
        return department;
    }

    async findByName(
        name: string,
        unitId: string,
    ): Promise<Department | undefined> {
        const department = await this.ormRepository.findOne({
            where: {
                name,
                unitId,
            },
        });
        return department;
    }

    async findAll(unitId: string): Promise<Department[] | undefined> {
        const departments = await this.ormRepository.find({
            where: { unitId },
        });
        return departments;
    }

    async create({
        name,
        unitId,
        active,
    }: Omit<DepartmentDTO, 'id'>): Promise<Department | undefined> {
        const department = this.ormRepository.create({ name, unitId, active });
        this.ormRepository.save(department);
        return department;
    }

    async update({
        id,
        name,
        active,
    }: Omit<DepartmentDTO, 'unitId'>): Promise<Department | undefined> {
        const department = this.ormRepository.create({ id, name, active });
        this.ormRepository.save(department);
        return department;
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
