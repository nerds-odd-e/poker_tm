import { winnerDetector } from "../../src/poker_miwtoo_jean/poker";

describe('CheaterDetector', () => {

   it('should return name of winner for high card vs high card', () => {
    expect(winnerDetector()).toBe("")
   })
})