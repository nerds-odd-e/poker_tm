import { MongoMemoryServer } from 'mongodb-memory-server';
import describeWithDB from '../../test_helpers/describeWithDB';

import { getNames } from '../../src/services/tao_maxim_poker/NameService';

describeWithDB('product ', () => {

  it('should return empty list of name for empty file', async () => {
    const s = getNames('fileName');
    expect(s).toStrictEqual([]);
  })
});
