import { MongoMemoryServer } from "mongodb-memory-server";
import describeWithDB from "../../test_helpers/describeWithDB";

import { getNames, getNamesAndWinCount } from "../../src/services/tao_maxim_poker_jean_kan/NameService";
import { getNamesAndGamesCount } from "../../src/services/tao_maxim_poker_jean_kan/NameService";
import { CardRank, extractCards, extractNames, getRankOfHand, play } from "../../src/services/tao_maxim_poker_jean_kan/NameService";

describeWithDB("product ", () => {
  it("should return empty list of name for not existing file", async () => {
    const s = getNames("non-existing-fileName");
    expect(s).toStrictEqual(new Set());
  });

  it("should return empty list for empty file", async () => {
    const s = getNames("tao_maxim_file_jean_kan/emptyNameList.txt");
    expect(s).toStrictEqual(new Set());
  });

  it("should return names list for single line file", async () => {
    const s = getNames("tao_maxim_file_jean_kan/singleLine.txt");
    const expected = ["Jane", "Mike"];
    expect(s).toStrictEqual(new Set(expected));
  });

  it("should return names list for multiple line file", async () => {
    const s = getNames("tao_maxim_file_jean_kan/multipleLine.txt");
    const expected = ["Jane", "Mike", "Wu", "Ken"];
    expect(s).toStrictEqual(new Set(expected));
  });

  it("should return names with games played list for multiple line file", async () => {
    const s = getNamesAndGamesCount("tao_maxim_file_jean_kan/multipleLine.txt");
    const expected = new Map<string, number>([
      ["Mike", 998],
      ["Jane", 999],
      ["Wu", 2],
      ["Ken", 1],
    ]);
    expect(s).toStrictEqual(expected);
  });

  it("should return empty played game list for empty file", async () => {
    const s = getNamesAndGamesCount("tao_maxim_file_jean_kan/emptyNameList.txt");
    const expected = new Map<string, number>();
    expect(s).toStrictEqual(expected);
  });

  it("should return amount of game won by player for single line file", async () => {
    const s = getNamesAndWinCount("tao_maxim_file_jean_kan/singleLine.txt");
    expect(s.get("Jane")).toBe(1);
  });

  it("should return amount of game won by player2 for single line file", async () => {
    const s = getNamesAndWinCount("tao_maxim_file_jean_kan/singleLine2.txt");
    expect(s.get("Mike")).toBe(1);
  });
  
  it("should return rank 0 when we have nothing",() => {
    const rank =  getRankOfHand('') ;
    expect(rank).toBe(0);
  }); 

  it("should return rank of royal flush when we have TS JS QS KS AS",() => {
    const rank =  getRankOfHand("TS JS QS KS AS") ;
    expect(rank).toBe(CardRank.Royal_Flush);
  }); 

  it("should return rank of Straight Flush when we have 4H 5H 6H 7H 8H",() => {
    const rank =  getRankOfHand("4H 5H 6H 7H 8H") ;
    expect(rank).toBe(CardRank.Straight_Flush);
  }); 

  it("extractCards",() => {
    const cards =  extractCards("Jane: TS JS QS KS AS Mike: 4H 5H 6H 7H 8H") ;
    expect(cards).toEqual(["TS JS QS KS AS","4H 5H 6H 7H 8H"]);
  }); 

  it("extractName should retirn [Jane, Mike]",() => {
    const player =  extractNames("Jane: TS JS QS KS AS Mike: 4H 5H 6H 7H 8H") ;
    expect(player).toEqual(["Jane","Mike"]);
  }); 

  it("play function",() => {
    const player =  play("Jane: 4H 5H 6H 7H 8H Mike: TS JS QS KS AS") ;
    expect(player).toEqual('Mike');
  }); 

});

