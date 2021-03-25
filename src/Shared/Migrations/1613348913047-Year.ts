import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Year1613348913047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'years',
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
                        name: 'value',
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
                        name: 'yearToUnit',
                        columnNames: ['unitId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'units',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('years', 'yearToUnit');
        await queryRunner.dropTable('years');
    }

}
