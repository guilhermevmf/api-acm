import { UserDTO } from '@domain/Dtos/User/UserDTO';
import { User } from '@infra/Typeorm/Entities/User';

export interface IUserRepository {
    findById(id: string): Promise<User | undefined>;
    findByCod(unitId: string, cod: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findAll(unitId: string, providerId: string): Promise<User[] | undefined>;
    create(data: Omit<UserDTO, 'id'>): Promise<User | undefined>;
    update(data: UserDTO): Promise<User | undefined>;
    remove(id: string): Promise<boolean>;
}
