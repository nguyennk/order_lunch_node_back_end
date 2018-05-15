import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderNote1524552325489 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('notes', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isNullable: false,
            },
            {
                name: 'note',
                type: 'varchar',
                length: 500,
                isUnique: false,
                isPrimary: false,
                isNullable: false,
            },
            {
                name: 'order_id',
                type: 'integer',
                isUnique: false,
                isPrimary: false,
                isNullable: false,
            },
            {
                name: 'user_id',
                type: 'integer',
                isUnique: false,
                isPrimary: false,
                isNullable: false,
            },
            {
                name: 'created_date',
                type: 'datetime',
                isPrimary: false,
                isNullable: false,
                default: 'current_timestamp',
            },
            {
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
        await queryRunner.dropTable('notes');
    }
}
