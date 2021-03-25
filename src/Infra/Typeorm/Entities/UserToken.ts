import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_token' })
export class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    userId: string;

    @Column()
    token: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
