import PokerHandRanker from "../src/services/PockerHandRanker";

describe("PokerHandRanker", () => {
  it("should return true when hand is flush", () => {
    expect(PokerHandRanker.isFlush(["2D", "4D", "TD", "KD", "6D"])).toBe(true);
  });

  it("should return false when hand is not flush", () => {
    expect(PokerHandRanker.isFlush(["2D", "5A", "TD", "JD", "AD"])).toBe(false);
  });

  it("should return true when hand is flush", () => {
    expect(PokerHandRanker.isFlush(["2S", "3S", "4S", "5S", "6S"])).toBe(true);
  });

  it("should return true when hand is straight", () => {
    expect(PokerHandRanker.isStraight(["2D", "4S", "3S", "6D", "5S"])).toBe(true);
  });

  it("should return false when hand is straight", () => {
    expect(PokerHandRanker.isStraight(["2S", "4D", "3D", "7D", "5D"])).toBe(false);
  });

  it("should return false when hand is straight", () => {
    expect(PokerHandRanker.isStraight(["2S", "4D", "3S", "8D", "5S"])).toBe(false);
  });

  it("should return true when hand is straight", () => {
    expect(PokerHandRanker.isStraight(["AS", "KD", "QS", "JS", "TS"])).toBe(true);
  });
});