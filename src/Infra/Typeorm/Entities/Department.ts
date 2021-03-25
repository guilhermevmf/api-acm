import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'departments' })
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    unitId: string;

    @Column()
    name: string;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
