import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Provider1613352473484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'providers',
                columns: [
                    {
                        type: 'uuid',
                        name: 'id',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        type: 'uuid',
                        name: 'bankId',
                    },
                    {
                        type: 'uuid',
                        name: 'departmentId',
                    },
                    {
                        type: 'varchar',
                        name: 'name',
                    },
                    {
                        type: 'varchar',
                        name: 'document',
                    },
                    {
                        type: 'varchar',
                        name: 'email',
                        isNullable: true,
                    },
                    {
                        type: 'varchar',
                        name: 'phone',
                        isNullable: true,
                    },
                    {
                        type: 'varchar',
                        name: 'agency',
                    },
                    {
                        type: 'varchar',
                        name: 'typeAccount',
                    },
                    {
                        type: 'varchar',
                        name: 'account',
                    },
                    {
                        type: 'varchar',
                        name: 'digit',
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
                        name: 'providerToBank',
                        columnNames: ['bankId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'banks',
                    },
                    {
                        name: 'providerToDepartment',
                        columnNames: ['departmentId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'departments',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('providers', 'providerToBank');
        await queryRunner.dropForeignKey('providers', 'providerToDepartment');
        await queryRunner.dropTable('providers');
    }

}
