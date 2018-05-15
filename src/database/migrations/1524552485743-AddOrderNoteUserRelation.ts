import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddOrderNoteUserRelation1524552485743
    implements MigrationInterface {
    private noteOrderForeignKey = new TableForeignKey(
        'fk_note_order',
        ['order_Id'],
        ['id'],
        'orders',
        ''
    );

    private noteUserForeignKey = new TableForeignKey(
        'fk_note_user',
        ['user_id'],
        ['id'],
        'users',
        ''
    );

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('notes', this.noteOrderForeignKey);
        await queryRunner.createForeignKey('notes', this.noteUserForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('notes', this.noteOrderForeignKey);
        await queryRunner.dropForeignKey('notes', this.noteUserForeignKey);
    }
}
