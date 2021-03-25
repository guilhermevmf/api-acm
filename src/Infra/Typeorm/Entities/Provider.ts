import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Bank } from './Bank';
import { Department } from './Department';

@Entity({ name: 'providers' })
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Bank)
    @JoinColumn()
    bank: Bank;

    @Column()
    bankId: string;

    @OneToOne(() => Department)
    @JoinColumn()
    department: Department;

    @Column()
    departmentId: string;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    agency: string;

    @Column()
    typeAccount: string;

    @Column()
    account: string;

    @Column()
    digit: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
