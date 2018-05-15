import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderTable1523438635107 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('orders', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isNullable: false,
            },
            {
                name: 'state',
                type: 'varchar',
                length: 100,
                isPrimary: false,
                isNullable: false,
            },
            {
                name: 'order_date',
                type: 'date',
                isPrimary: false,
                isNullable: false,
                default: 'CURRENT_DATE',
            },
        ]);
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('orders');
    }
}
