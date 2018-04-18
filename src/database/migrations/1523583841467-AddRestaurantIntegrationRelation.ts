import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRestaurantIntegrationRelation1523583841467 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey(
        'fk_restaurant_integration',
        ['integration_id'],
        ['id'],
        'integrations',
        ''
    );

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('restaurants', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('restaurants', this.tableForeignKey);
    }

}
