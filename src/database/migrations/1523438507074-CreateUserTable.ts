import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1523438507074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('users', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isNullable: false,
            }, {
                name: 'email',
                type: 'varchar',
                length: 255,
                isUnique: true,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'first_name',
                type: 'varchar',
                length: 255,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'last_name',
                type: 'varchar',
                length: 255,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'password_hash',
                type: 'varchar',
                length: 255,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'is_admin',
                type: 'boolean',
                isPrimary: false,
                isNullable: false,
                default: 0,
            }, {
                name: 'created_date',
                type: 'datetime',
                isPrimary: false,
                isNullable: false,
                default: 'current_timestamp',
            }, {
                name: 'modified_date',
                type: 'datetime',
                isPrimary: false,
                isNullable: false,
                default: 'current_timestamp',
            },
        ]);
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('users');
    }

}
