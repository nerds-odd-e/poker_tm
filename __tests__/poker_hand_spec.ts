import { winRateFromFile, loadData } from "../src/services/PokerHandService";
import describeWithDB from "../test_helpers/describeWithDB";

describe("Cheater Dectector", () => {
it("when load empty file should return empty list", () => {
    const file = '';

    const result = winRateFromFile(file);

    expect(result).toBe('');
  });

  describe("Games Counting", () => {
    it("should show how many each player play the game", () => {
      expect(true).toBe(true);
    });
  });

  describe("Validate Hight Card", () => {
    it("should be get player win with hight card", () => {
      expect(true).toBe(true);
    });
  });
});

describe("Games Counting", () => {
  it("should show how many each player play the game", () => {
    expect(true).toBe(true);
  });
});
    
describeWithDB("Game Data Loader", () => {
    it ("shouldn't save any data when there is no record", () => {
        expect(loadData("")).toBe("ok")
    })
})
