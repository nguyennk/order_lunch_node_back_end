import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateIntegrationTable1523438775314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('integrations', [
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
                length: 250,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'source',
                type: 'varchar',
                length: 250,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'source_id',
                type: 'integer',
                isPrimary: false,
                isNullable: false,
            },
        ]);
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('integrations');
    }
}
