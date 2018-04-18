import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddOrderDishesUserRelation1523450412802 implements MigrationInterface {

    private orderDishesForeignKey = new TableForeignKey(
        'fk_order_dishes',
        ['dish_id'],
        ['id'],
        'restaurant_dishes',
        ''
    );

    private orderUserForeignKey = new TableForeignKey(
        'fk_order_user',
        ['user_id'],
        ['id'],
        'users',
        ''
    );

    private orderDishOrdersForeignKey = new TableForeignKey(
        'fk_orderdish_orders',
        ['order_id'],
        ['id'],
        'orders',
        ''
    );

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('order_dishes', this.orderDishesForeignKey);
        await queryRunner.createForeignKey('order_dishes', this.orderUserForeignKey);
        await queryRunner.createForeignKey('order_dishes', this.orderDishOrdersForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('order_dishes', this.orderDishesForeignKey);
        await queryRunner.dropForeignKey('order_dishes', this.orderUserForeignKey);
        await queryRunner.dropForeignKey('order_dishes', this.orderDishOrdersForeignKey);
    }

}
