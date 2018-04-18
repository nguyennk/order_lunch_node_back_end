import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFeedbackTable1523438677163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table('feedbacks', [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isNullable: false,
            }, {
                name: 'title',
                type: 'varchar',
                length: 250,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'content',
                type: 'varchar',
                length: 500,
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'user_id',
                type: 'bigint',
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
        await queryRunner.dropTable('feedbacks');
    }
}
