import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderDishesTable1523438725551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('order_dishes', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isNullable: false,
            }, {
                name: 'order_id',
                type: 'integer',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'dish_id',
                type: 'integer',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'user_id',
                type: 'integer',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'price',
                type: 'double',
                isPrimary: false,
                isNullable: false,
            },
        ]);
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('order_dishes');
    }
}
