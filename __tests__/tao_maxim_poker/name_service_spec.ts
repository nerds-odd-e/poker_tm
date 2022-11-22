import { MongoMemoryServer } from 'mongodb-memory-server';
import describeWithDB from '../../test_helpers/describeWithDB';

import { getNames } from '../../src/services/tao_maxim_poker/NameService';

describeWithDB('product ', () => {

  it('should return empty list of name for not existing file', async () => {
    const s = getNames('non-existing-fileName');
    expect(s).toStrictEqual([]);
  })

  it('should return empty list for empty file', async () => {
    const s = getNames('tao_maxim_file/emptyNameList.txt');
    expect(s).toStrictEqual([]);
  })

  it('should return names list for single line file', async () => {
    const s = getNames('tao_maxim_file/singleLine.txt');
    const expected = ["Jane","Mike"];
    expect(s).toStrictEqual(expected);
  })
});
