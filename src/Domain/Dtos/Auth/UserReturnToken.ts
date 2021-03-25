import { User } from '@infra/Typeorm/Entities/User';

export interface UserReturnToken {
    token: string;
    user: User;
}
