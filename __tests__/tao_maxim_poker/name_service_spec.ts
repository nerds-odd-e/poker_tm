import { MongoMemoryServer } from "mongodb-memory-server";
import describeWithDB from "../../test_helpers/describeWithDB";

import { getNamesAndWinRate } from "../../src/services/tao_maxim_poker/NameService";

// describeWithDB("file reader ", () => {
//   it("should return empty list of name for not existing file", async () => {
//     const s = getNames("non-existing-fileName");
//     expect(s).toStrictEqual(new Set());
//   });

//   it("should return empty list for empty file", async () => {
//     const s = getNames("tao_maxim_file/emptyNameList.txt");
//     expect(s).toStrictEqual(new Set());
//   });

//   it("should return names list for single line file", async () => {
//     const s = getNames("tao_maxim_file/singleLine.txt");
//     const expected = ["Jane", "Mike"];
//     expect(s).toStrictEqual(new Set(expected));
//   });

//   it("should return names list for multiple line file", async () => {
//     const s = getNames("tao_maxim_file/multipleLine.txt");
//     const expected = ["Jane", "Mike", "Wu", "Ken"];
//     expect(s).toStrictEqual(new Set(expected));
//   });
// });


describeWithDB("WinRateCollector ", () => {

  it("should return names list for empty file", () => {
    const winRateCollection = getNamesAndWinRate("tao_maxim_file/emptyNameList.txt");
    expect(winRateCollection.keys.length).toBe(0);
  }); 

  it("should return amount of game won by player2 for single line file", () => {
    const winRateCollection = getNamesAndWinRate("tao_maxim_file/singleLinePlayer2RoyalFlush.txt");
    expect(winRateCollection.get("Mike")).toBe(1);
    expect(winRateCollection.get("Jane")).toBe(0);
  });  

  it("should return amount of game won by player1 for single line file", () => {
    const winRateCollection = getNamesAndWinRate("tao_maxim_file/singleLinePlayer1RoyalFlush.txt");
    expect(winRateCollection.get("Mike")).toBe(0);
    expect(winRateCollection.get("Jane")).toBe(1);
  }); 

  it("should return amount of game won by both player1 and player2 for two games", () => {
    const winRateCollection = getNamesAndWinRate("tao_maxim_file/twoGames.txt");
    expect(winRateCollection.get("Mike")).toBe(0.5);
    expect(winRateCollection.get("Jane")).toBe(0.5);
  }); 
});