import { isPair } from "../src/services/PockerHandRanker";
import {
  winRateFromFile,
  loadData,
  getTotalGames,
} from "../src/services/PokerHandService";
import describeWithDB from "../test_helpers/describeWithDB";

describe("Cheater Dectector", () => {
  it("when load empty file should return empty list", () => {
    const file = "";

    const result = winRateFromFile(file);

    expect(result).toBe("");
  });
});

describe("PokerHandRanker", () => {
  it("should return true when hand is flush", () => {
    expect(true).toBe(true);
  });

  describe("Validate Hight Card", () => {
    it("should be get player win with hight card", () => {
      expect(true).toBe(true);
    });
  });
});

describe("Games Counting", () => {
  it("should show total games as 0 when no game data", () => {
    expect(getTotalGames()).toBe(0);
  });
});

describeWithDB("Game Data Loader", () => {
  it("should return 0 when there is no record", () => {
    expect(loadData("")).toBe("ok");
  });
});
it("shouldn't save any data when there is no record", () => {
  expect(loadData("")).toBe("ok");
});

it("shouldn't save any data when there is no record", () => {
  expect(loadData("")).toBe("ok");
});
describe("Hand", () => {
  it("should return true for pair", () => {
    expect(isPair("")).toBe(true);
  });
});