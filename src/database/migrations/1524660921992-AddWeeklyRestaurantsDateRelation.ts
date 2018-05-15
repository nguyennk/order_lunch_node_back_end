import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddWeeklyRestaurantsDateRelation1524660921992
    implements MigrationInterface {
    private weeklyDateForeignKey = new TableForeignKey(
        'fk_weekly_date',
        ['weekly_date_id'],
        ['id'],
        'weekly_restaurant_dates',
        ''
    );

    private weeklyRestaurantForeignKey = new TableForeignKey(
        'fk_weekly_restaurant',
        ['restaurant_id'],
        ['id'],
        'restaurants',
        ''
    );

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey(
            'weekly_restaurants',
            this.weeklyDateForeignKey
        );
        await queryRunner.createForeignKey(
            'weekly_restaurants',
            this.weeklyRestaurantForeignKey
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey(
            'weekly_restaurants',
            this.weeklyDateForeignKey
        );
        await queryRunner.dropForeignKey(
            'weekly_restaurants',
            this.weeklyRestaurantForeignKey
        );
    }
}
