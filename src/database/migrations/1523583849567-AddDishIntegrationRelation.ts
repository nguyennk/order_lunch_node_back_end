import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddDishIntegrationRelation1523583849567 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey(
        'fk_dish_integration',
        ['integration_id'],
        ['id'],
        'integrations',
        ''
    );

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('restaurant_dishes', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('restaurant_dishes', this.tableForeignKey);
    }

}
