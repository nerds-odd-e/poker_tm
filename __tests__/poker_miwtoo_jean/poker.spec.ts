import * as fs from "fs";
import * as path from "path";
import { pokerPlayerCount } from "../../src/poker_miwtoo_jean/poker";

describe('CheaterDetector', () => {

    it("should return empty result if the file is empty", () => {
        const result = pokerPlayerCount("");

        expect(result).toEqual([]);
    });

    it("should be count Jane", () => {
        //arrange
        const filePath = path.join(__dirname, '../poker_miwtoo_jean/data/poker.txt');
        const buffer = fs.readFileSync(filePath, "utf8");
        const file = buffer.toString();

        // act
        const result = pokerPlayerCount(file)

        //assert
        expect(result).toEqual([{
            name: "Jane",
            count: 999
        },
        {
            name: "Mike",
            count: 998
        },
        {
            name: "Wu",
            count: 2
        },
        {
            name: "Ken",
            count: 1
        },
        ]);
    })

    it('should be count only 1 records', () => {
        //arrange
        const filePath = path.join(__dirname, '../poker_miwtoo_jean/data/data1.txt');
        const buffer = fs.readFileSync(filePath, "utf8");
        const file = buffer.toString();

        // act
        const result = pokerPlayerCount(file)

        //assert
        expect(result).toEqual([{
            name: "Jane",
            count: 1
        },
        {
            name: "Mike",
            count: 1
        }
        ]);
    })
})