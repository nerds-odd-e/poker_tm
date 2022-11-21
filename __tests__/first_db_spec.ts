import { MongoMemoryServer } from 'mongodb-memory-server';
import FirstService from "../src/services/FirstService";
import describeWithDB from '../test_helpers/describeWithDB';

describeWithDB('product ', () => {

  it('can be created correctly', async () => {
    const s = await FirstService.create({ name: 'test' });
    expect(s).toBeDefined();
  });
});
