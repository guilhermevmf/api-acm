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

@Entity({ name: 'years' })
export class Year {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Unit)
    @JoinColumn()
    unit: Unit;

    @Column()
    unitId: string;

    @Column()
    value: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
