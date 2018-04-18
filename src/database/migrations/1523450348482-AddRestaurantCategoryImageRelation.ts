import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRestaurantCategoryImageRelation1523450348482 implements MigrationInterface {

    private restaurantCategoryForeignKey = new TableForeignKey(
        'fk_restaurant_category',
        ['category_id'],
        ['id'],
        'categories',
        ''
    );

    private restaurantImageForeignKey = new TableForeignKey(
        'fk_restaurant_image',
        ['image_id'],
        ['id'],
        'images',
        ''
    );

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('restaurants', this.restaurantCategoryForeignKey);
        await queryRunner.createForeignKey('restaurants', this.restaurantImageForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('restaurants', this.restaurantCategoryForeignKey);
        await queryRunner.dropForeignKey('restaurants', this.restaurantImageForeignKey);
    }
}
