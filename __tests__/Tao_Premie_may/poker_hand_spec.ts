import getWinrate from "../../src/Tao_Premie_may/PokerHand";
import aGame from "../../test_helpers/poker_game_builder";

describe("winrate calculator", () => {
  it("should return empty when it input empty", () => {
    expect(getWinrate("")).toBe("");
  });

  it("should return Mike with 100% with High Card and Jane 0%", () => {
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
});
