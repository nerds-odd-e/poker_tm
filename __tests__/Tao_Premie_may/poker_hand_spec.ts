import getWinrate from "../../src/Tao_Premie_may/PokerHand";
import aGame from "../../test_helpers/poker_game_builder";

describe("winrate calculator", () => {
  it("should return empty when it input empty", () => {
    expect(getWinrate("")).toBe("");
  });

  xit("should return Jane with 100% with flush and Mike 0%", () => {
    expect(
      getWinrate(
        aGame
          .between("Jane")
          .diamondFlushHand()
          .vs("Mike")
          .highCardWithKHeart()
          .please()
      )
    ).toBe("Jane:100,Mike:0");
  });

  it("should return Mike with 100% with Three of a kind and Jane 0%",()=>{
    expect(      
      getWinrate(
      aGame
        .between("Jane")
        .threeOfAKind()
        .vs("Mike")
        .highCardWithKHeart()
        .please()
    )).toBe("Jane:100,Mike:0");
  })

});
