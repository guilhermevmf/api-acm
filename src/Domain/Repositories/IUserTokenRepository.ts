import { UserToken } from '@infra/Typeorm/Entities/UserToken';

export interface IUserTokenRepository {
    findByToken(token: string): Promise<UserToken | undefined>;
    create(userId: string, token: string): Promise<UserToken | undefined>;
}
