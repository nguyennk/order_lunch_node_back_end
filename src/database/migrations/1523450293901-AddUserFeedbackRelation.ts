import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserFeedbackRelation1523450293901 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey(
        'fk_feedback_user',
        ['user_id'],
        ['id'],
        'users',
        ''
    );

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('feedbacks', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('feedbacks', this.tableForeignKey);
    }

}
