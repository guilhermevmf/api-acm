import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Unit } from './Unit';

@Entity({ name: 'banks' })
export class Bank {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Unit)
    @JoinColumn()
    unit: Unit;

    @Column()
    unitId: string;

    @Column()
    code: string;

    @Column()
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
