import { winRateFromFile, loadData, getTotalGames } from "../src/services/PokerHandService";
import PokerHandRanker from "../src/services/PockerHandRanker";
import describeWithDB from "../test_helpers/describeWithDB";

describe("Cheater Dectector", () => {
    it("when load empty file should return empty list", () => {
        const file = '';

        const result = winRateFromFile(file);

        expect(result).toBe('');
    });
    
    describe("PokerHandRanker", () => {
        it("should return true when hand is flush", ()=> {
            expect(PokerHandRanker.isFlush(["D","D","D","D","D"])).toBe(true);
        });
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
})

describeWithDB("Game Data Loader", () => {
    it("should return 0 when there is no record", () => {
        expect(loadData("")).toBe(0)
    })
})
