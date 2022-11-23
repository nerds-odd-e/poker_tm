import * as fs from "fs";
import * as path from "path";
import { winnerDetector } from "../../src/poker_miwtoo_jean/poker";

describe('CheaterDetector', () => {

   it('should return name of winner for high card vs high card', () => {
    //arrange
    const filePath = path.join(__dirname, '../poker_miwtoo_jean/data/data1.txt');
    const buffer = fs.readFileSync(filePath, "utf8");
    const file = buffer.toString();

    expect(winnerDetector(file)).toBe("Mike")
   })

   it('should return name of winner for high card vs pair card', () => {
    //arrange
    const filePath = path.join(__dirname, '../poker_miwtoo_jean/data/data_pair.txt');
    const buffer = fs.readFileSync(filePath, "utf8");
    const file = buffer.toString();

    expect(winnerDetector(file)).toBe("Jane")
   })
})