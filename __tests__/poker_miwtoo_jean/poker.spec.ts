import * as fs from "fs";
import * as path from "path";
import { pokerPlayerCount } from "../../src/poker_miwtoo_jean/poker";

describe('CheaterDetector', () => {
    const filePath = path.join(__dirname, '../../example_data/poker.txt');
    const buffer = fs.readFileSync(filePath, "utf8");
    const file = buffer.toString();
    it("should return empty result if the file is empty", () => {
        const result = pokerPlayerCount("");

        expect(result).toEqual([]);
    });

    it("should be count Jane", () => {
        //arrange

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
        },
        {
            name: "Wu",
            count: 1
        },
        {
            name: "Ken",
            count: 1
        },
        ]);
    })
})