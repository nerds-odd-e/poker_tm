import * as fs from "fs";
import * as path from "path";
import { winnerDetector } from "../../src/poker_miwtoo_jean/poker";

describe('CheaterDetector', () => {

    it('should return player whos has higher high card (8C TS KC 9H 4S) vs (7D 2S 5D 3S AC)', () => {
        const filePath = path.join(__dirname, '../poker_miwtoo_jean/data/data1.txt');
        const buffer = fs.readFileSync(filePath, "utf8");
        const file = buffer.toString();
        expect(winnerDetector(file)).toEqual([
            {
                name: "Mike",
                winrate: 100
            }, 
            {
                name: "Jane",
                winrate: 0
            },
        ])
    })

    it('should return player whos has higher high card (7C 9C 6D KD 3H) vs (4C QS TC AC KH)', () => {
        const filePath = path.join(__dirname, '../poker_miwtoo_jean/data/data2.txt');
        const buffer = fs.readFileSync(filePath, "utf8");
        const file = buffer.toString();
        expect(winnerDetector(file)).toEqual([
            {
                name: "Mike",
                winrate: 100
            }, 
            {
                name: "Jane",
                winrate: 0
            }
        ])
    })

    it('should return 50/50 win rate if they have the same higher card', () => {
        const filePath = path.join(__dirname, '../poker_miwtoo_jean/data/data3.txt');
        const buffer = fs.readFileSync(filePath, "utf8");
        const file = buffer.toString();
        expect(winnerDetector(file)).toEqual([
            {
                name: "Jane",
                winrate: 50
            }, 
            {
                name: "Mike",
                winrate: 50
            }
        ])
    })

})