import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1613347896921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        type: 'uuid',
                        name: 'id',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        type: 'uuid',
                        name: 'unitId',
                    },
                    {
                        type: 'uuid',
                        name: 'departmentId',
                        isNullable: true,
                    },
                    {
                        type: 'varchar',
                        name: 'avatar',
                        isNullable: true,
                    },
                    {
                        type: 'varchar',
                        name: 'cod',
                    },
                    {
                        type: 'varchar',
                        name: 'name',
                    },
                    {
                        type: 'varchar',
                        name: 'email',
                    },
                    {
                        type: 'varchar',
                        name: 'password',
                    },
                    {
                        type: 'varchar',
                        name: 'role',
                    },
                    {
                        type: 'bool',
                        name: 'active',
                    },
                    {
                        type: 'timestamp with time zone',
                        name: 'created_at',
                        default: 'now()',
                    },
                    {
                        type: 'timestamp with time zone',
                        name: 'updated_at',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'unitToUser',
                        columnNames: ['unitId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'units',
                    },
                    {
                        name: 'deparmentToUser',
                        columnNames: ['departmentId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'departments',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'unitToUser');
        await queryRunner.dropForeignKey('users', 'deparmentToUser');
        await queryRunner.dropTable('users');
    }

}
