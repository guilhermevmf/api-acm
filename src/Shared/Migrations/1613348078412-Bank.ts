import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Bank1613348078412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'banks',
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
                        type: 'varchar',
                        name: 'code',
                    },
                    {
                        type: 'varchar',
                        name: 'name',
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
                        name: 'bankToUnit',
                        columnNames: ['unitId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'units',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('banks', 'bankToUnit');
        await queryRunner.dropTable('banks');
    }

}
