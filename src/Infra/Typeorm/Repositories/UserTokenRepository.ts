import { getRepository, Repository } from 'typeorm';

import { IUserTokenRepository } from '@domain/Repositories/IUserTokenRepository';
import { UserToken } from '../Entities/UserToken';

export class UserTokenRepository implements IUserTokenRepository {
    private readonly ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token },
            relations: ['user'],
        });
        return userToken;
    }

    async create(userId: string, token: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({ userId, token })
        await this.ormRepository.save(userToken);
        return userToken;
    }
}
