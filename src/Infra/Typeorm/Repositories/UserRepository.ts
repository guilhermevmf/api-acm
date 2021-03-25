import { getRepository, Repository } from 'typeorm';
import { User } from '../Entities/User';

import { UserDTO } from '@domain/Dtos/User/UserDTO';
import { IUserRepository } from '@domain/Repositories/IUserRepository';

export class UserRepository implements IUserRepository {
    private readonly ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { id } });
        return user;
    }

    async findByCod(unitId: string, cod: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { unitId, cod },
        });
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });
        return user;
    }

    async findAll(
        unitId: string,
        providerId: string,
    ): Promise<User[] | undefined> {
        const users = await this.ormRepository
            .createQueryBuilder('users')
            .select([
                'users.id',
                'users.departmentId',
                'users.cod',
                'users.avatar',
                'users.name',
                'users.email',
                'users.role',
                'users.active',
            ])
            .where('users.id != :id AND users.unitId = :unitId', {
                id: providerId,
                unitId,
            })
            .getMany();
        return users;
    }

    async create({
        unitId,
        departmentId,
        cod,
        name,
        email,
        role,
    }: Omit<UserDTO, 'id'>): Promise<User | undefined> {
        const user = this.ormRepository.create({
            unitId,
            departmentId,
            cod,
            name,
            email,
            role,
        });
        await this.ormRepository.save(user);
        return user;
    }

    async update({
        id,
        departmentId,
        cod,
        name,
        email,
        role,
        active,
    }: Omit<UserDTO, 'unitId'>): Promise<User | undefined> {
        const user = this.ormRepository.create({
            id,
            departmentId,
            cod,
            name,
            email,
            role,
            active,
        });
        await this.ormRepository.save(user);
        return user;
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
