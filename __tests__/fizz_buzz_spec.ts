import { fizzBuzz } from "../src/services/FizzBuzzService";

describe("fizzBuzz", ()=> {
    it("given 1 should return 1", ()=> {
        expect(fizzBuzz(1)).toBe("1");
    });

    it("given 2 should return 2", ()=> {
        expect(fizzBuzz(2)).toBe("2");
    });

    it("given 3 should return fizz", ()=> {
        expect(fizzBuzz(3)).toBe("fizz");
    });

    it("given 4 should return 4", ()=> {
        expect(fizzBuzz(4)).toBe("4");
    });

    it("given 5 should return buzz", ()=> {
        expect(fizzBuzz(5)).toBe("buzz");
    });

    it("given a number should return its string value", ()=> {
        expect(fizzBuzz(8)).toBe("8");
        expect(fizzBuzz(7)).toBe("7");
        expect(fizzBuzz(17)).toBe("17");
    });

    xit("given a number divisible by 3 should return fizz", ()=> {
        for (let i=0; i < 10; i++) {
            expect(fizzBuzz(3*i)).toBe("fizz");
        }
    });

    xit("given a number divisible by 5 should return buzz", ()=> {
        for (let i=0; i < 10; i++) {
            expect(fizzBuzz(5*i)).toBe("buzz");
        }
    });

    xit("given a number divisible by 3 and 5 should return fizzbuzz", ()=> {
        for (let i=0; i < 10; i++) {
            expect(fizzBuzz(3*5*i)).toBe("fizzbuzz");
        }
    });
})
