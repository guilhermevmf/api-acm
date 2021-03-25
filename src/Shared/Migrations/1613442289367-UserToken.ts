import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class UserToken1613442289367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_token',
                columns: [
                    {
                        type: 'uuid',
                        name: 'id',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        type: 'uuid',
                        name: 'userId',
                    },
                    {
                        type: 'uuid',
                        name: 'token',
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
                        name: 'tokenToUser',
                        columnNames: ['userId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_token', 'tokenToUser');
        await queryRunner.dropTable('user_token');
    }

}
