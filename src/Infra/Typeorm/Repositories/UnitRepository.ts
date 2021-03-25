import { getRepository, Repository } from 'typeorm';
import { Unit } from '../Entities/Unit';

import { IUnitRepository } from '@domain/Repositories/IUnitRepository';
import { UnitDTO } from '@domain/Dtos/Unit/UnitDTO';

export class UnitRepository implements IUnitRepository {
    private readonly ormRepository: Repository<Unit>;

    constructor() {
        this.ormRepository = getRepository(Unit);
    }

    async findById(id: string): Promise<Unit | undefined> {
        const unit = await this.ormRepository.findOne({ where: { id } });
        return unit;
    }

    async findByName(name: string): Promise<Unit | undefined> {
        const unit = await this.ormRepository.findOne({ where: { name } });
        return unit;
    }

    async findAll(): Promise<Unit[] | undefined> {
        const units = await this.ormRepository.find();
        return units;
    }

    async create({
        name,
        cnpj,
        active,
    }: Omit<UnitDTO, 'id'>): Promise<Unit | undefined> {
        const unit = this.ormRepository.create({ name, cnpj, active });
        this.ormRepository.save(unit);
        return unit;
    }

    async update({
        id,
        name,
        cnpj,
        active,
    }: UnitDTO): Promise<Unit | undefined> {
        const unit = this.ormRepository.create({ id, name, cnpj, active });
        this.ormRepository.save(unit);
        return unit;
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
