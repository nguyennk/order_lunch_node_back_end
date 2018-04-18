import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRestaurantDishesTable1523438712316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('restaurant_dishes', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isNullable: false,
            }, {
                name: 'name',
                type: 'varchar',
                length: 250,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'description',
                type: 'varchar',
                length: 250,
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'restaurant_id',
                type: 'integer',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'price',
                type: 'double',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'discount_price',
                type: 'double',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'image_source',
                type: 'varchar',
                length: 250,
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'image_id',
                type: 'integer',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'tag_id',
                type: 'integer',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'integration_id',
                type: 'integer',
                isPrimary: false,
                isNullable: true,
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
        await queryRunner.dropTable('restaurant_dishes');
    }
}
