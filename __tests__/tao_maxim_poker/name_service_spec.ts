import { MongoMemoryServer } from "mongodb-memory-server";
import describeWithDB from "../../test_helpers/describeWithDB";

import { getNames } from "../../src/services/tao_maxim_poker/NameService";
import { getNamesAndGamesCount } from "../../src/services/tao_maxim_poker/NameService";

describeWithDB("product ", () => {
  it("should return empty list of name for not existing file", async () => {
    const s = getNames("non-existing-fileName");
    expect(s).toStrictEqual(new Set());
  });

  it("should return empty list for empty file", async () => {
    const s = getNames("tao_maxim_file/emptyNameList.txt");
    expect(s).toStrictEqual(new Set());
  });

  it("should return names list for single line file", async () => {
    const s = getNames("tao_maxim_file/singleLine.txt");
    const expected = ["Jane", "Mike"];
    expect(s).toStrictEqual(new Set(expected));
  });

  it("should return names list for multiple line file", async () => {
    const s = getNames("tao_maxim_file/multipleLine.txt");
    const expected = ["Jane", "Mike", "Wu", "Ken"];
    expect(s).toStrictEqual(new Set(expected));
  });

  it("should return names with games played list for multiple line file", async () => {
    const s = getNamesAndGamesCount("tao_maxim_file/multipleLine.txt");
    const expected = new Map<string, number>([
      ["Mike", 998],
      ["Jane", 999],
      ["Wu", 2],
      ["Ken", 1],
    ]);
    expect(s).toStrictEqual(expected);
  });

  it("should return empty played game list for empty file", async () => {
    const s = getNamesAndGamesCount("tao_maxim_file/emptyNameList.txt");
    const expected = new Map<string, number>();
    expect(s).toStrictEqual(expected);
  });
});
