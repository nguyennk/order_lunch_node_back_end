import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddDishRestaurantVariationImageRelation1523450381468 implements MigrationInterface {

    private dishRestaurantForeignKey = new TableForeignKey(
        'fk_dish_restaurant',
        ['restaurant_id'],
        ['id'],
        'restaurants',
        ''
    );

    private dishTagForeignKey = new TableForeignKey(
        'fk_dish_tag',
        ['tag_id'],
        ['id'],
        'tags',
        ''
    );

    private dishImageForeignKey = new TableForeignKey(
        'fk_dish_image',
        ['image_id'],
        ['id'],
        'images',
        ''
    );

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('restaurant_dishes', this.dishRestaurantForeignKey);
        await queryRunner.createForeignKey('restaurant_dishes', this.dishTagForeignKey);
        await queryRunner.createForeignKey('restaurant_dishes', this.dishImageForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('restaurant_dishes', this.dishRestaurantForeignKey);
        await queryRunner.dropForeignKey('restaurant_dishes', this.dishTagForeignKey);
        await queryRunner.dropForeignKey('restaurant_dishes', this.dishImageForeignKey);
    }
}
