import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRestaurantTable1523438708585 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('restaurants', [
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
                name: 'location',
                type: 'varchar',
                length: 250,
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'phone_number',
                type: 'varchar',
                length: 250,
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'category_id',
                type: 'integer',
                isPrimary: false,
                isNullable: false,
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
        await queryRunner.dropTable('restaurants');
    }

}
