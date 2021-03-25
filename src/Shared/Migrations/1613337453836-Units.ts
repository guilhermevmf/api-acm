import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Units1613337453836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'units',
                columns: [
                    {
                        type: 'uuid',
                        name: 'id',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        type: 'varchar',
                        name: 'name',
                    },
                    {
                        type: 'varchar',
                        name: 'cnpj',
                        isNullable: true,
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
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('units');
    }

}
