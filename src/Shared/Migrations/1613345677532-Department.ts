import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Department1613345677532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'departments',
                columns: [
                    {
                        type: 'uuid',
                        name: 'id',
                        isPrimary: true,
                    },
                    {
                        type: 'uuid',
                        name: 'unitId',
                    },
                    {
                        type: 'varchar',
                        name: 'name',
                    },
                    {
                        type: 'bool',
                        name: 'active',
                        default: true,
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
                        name: 'departmentToUnit',
                        columnNames: ['unitId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'units',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('departments', 'departmentToUnit');
        await queryRunner.dropTable('departments');
    }

}
