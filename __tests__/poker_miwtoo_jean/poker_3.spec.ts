import * as fs from "fs";
import * as path from "path";
import { winnerDetector2 } from "../../src/poker_miwtoo_jean/poker";

describe('CheaterDetector', () => {

    it("should return player whos has higher high card (8C TS KC 9H 4S) vs (7D 2S 5D 3S AC)", () => {
        expect(winnerDetector2()).toEqual([])
    })

})