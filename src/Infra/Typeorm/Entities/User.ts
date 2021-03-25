import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Department } from './Department';
import { Unit } from './Unit';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    unitId: string;

    @OneToOne(() => Unit)
    @JoinColumn()
    unit: Unit;

    @OneToOne(() => Department)
    @JoinColumn()
    department: Department;

    @Column({ nullable: true })
    departmentId: string;

    @Column()
    cod: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    password?: string;

    @Column()
    role: string;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
