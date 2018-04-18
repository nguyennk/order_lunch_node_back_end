import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateImageTable1523438602312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('images', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isNullable: false,
            }, {
                name: 'type',
                type: 'varchar',
                length: 50,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'data',
                type: 'text',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'source',
                type: 'varchar',
                length: 250,
                isPrimary: false,
                isNullable: false,
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
        await queryRunner.dropTable('images');
    }
}
