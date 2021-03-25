import { getRepository, Repository } from 'typeorm';

import { YearDTO } from '@domain/Dtos/Year/YearDTO';
import { IYearRepository } from '@domain/Repositories/IYearRepository';
import { Year } from '../Entities/Year';

export class YearRepository implements IYearRepository {

    private readonly ormRepository: Repository<Year>;

    constructor() {
        this.ormRepository = getRepository(Year);
    }

    async findById(id: string): Promise<Year | undefined> {
        const year = await this.ormRepository.findOne({ where: { id } });
        return year;
    }

    async findAll(unitId: string): Promise<Year[] | undefined> {
        const years = await this.ormRepository.find({ where: { unitId } });
        return years;
    }

    async create({
        unitId,
        value,
    }: Omit<YearDTO, 'id'>,
    ): Promise<Year | undefined> {
        const year = this.ormRepository.create({ unitId, value });
        await this.ormRepository.save(year);
        return year;
    }

    async update({ id, unitId, value }: YearDTO): Promise<Year | undefined> {
        const year = this.ormRepository.create({ id, unitId, value });
        await this.ormRepository.save(year);
        return year;
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
