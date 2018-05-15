import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWeeklyRestaurantMenuDefaultTable1524624266132
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('weekly_restaurant_defaults', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isNullable: false,
            },
            {
                name: 'week_number',
                type: 'integer',
                isUnique: false,
                isPrimary: false,
                isNullable: false,
            },
            {
                name: 'restaurant_id',
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
        await queryRunner.dropTable('weekly_restaurant_defaults');
    }
}
