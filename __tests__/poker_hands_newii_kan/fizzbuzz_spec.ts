import fizzbuzz from '../../src/poker_hands_newii_kan/fizzbuzz'

describe("fizzbuzz", () => {
    it("should say fizz when number is 3", () => {
        let result = fizzbuzz(3);
        expect(result).toBe("fizz");
    });

    it("should say fizz when number is 6", () => {
        let result = fizzbuzz(6);
        expect(result).toBe("fizz");
    });

    it("should not say fizz when number is divisible by 3", () => {
        let result = fizzbuzz(2);
        expect(result).not.toBe("fizz");
    });

    it("should say buzz when number is 5", () => {
        let result = fizzbuzz(5);
        expect(result).toBe("buzz");
    });

    it("should say buzz when number is 10", () => {
        let result = fizzbuzz(10);
        expect(result).toBe("buzz");
    });

    it("should say fizzbuzz when number is 15", () => {
        let result = fizzbuzz(15);
        expect(result).toBe("fizzbuzz");
    });

    it("should say fizzbuzz when number is 30", () => {
        let result = fizzbuzz(30);
        expect(result).toBe("fizzbuzz");
    });

    it("should say 1 when number is 1", () => {
        let result = fizzbuzz(1);
        expect(result).toBe("1");
    });

    it("should say 2 when number is 2", () => {
        let result = fizzbuzz(2);
        expect(result).toBe("2");
    });
})