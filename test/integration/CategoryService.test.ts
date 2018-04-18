import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Category } from '../../src/api/models/Category';
import { CategoryService } from '../../src/api/services/CategoryService';
import { closeDatabase, createDatabaseConnection, migrateDatabase } from '../utils/database';

describe('CategoryService', () => {

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    let connection: Connection;
    beforeAll(async () => connection = await createDatabaseConnection());
    beforeEach(() => migrateDatabase(connection));

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(() => closeDatabase(connection));

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('should create a new category in the database', async (done) => {
        const category = new Category();
        category.category = 'test_category';
        const service = Container.get<CategoryService>(CategoryService);
        const resultCreate = await service.create(category);
        expect(resultCreate.category).toBe(category.category);

        const resultFind = await service.findOne(resultCreate.id);
        if (resultFind) {
            expect(resultFind.category).toBe(category.category);
        } else {
            fail('Could not find category');
        }
        done();
    });

});
