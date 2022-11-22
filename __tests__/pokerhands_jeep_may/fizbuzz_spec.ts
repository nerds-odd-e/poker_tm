import FizzBuzzService from "../../src/pokerhands_jeep_may/FizzBuzzService";

describe("Fizz Buzz Test", () => {
    // it("If number cannot devide by 3 or 5 it should return its number", () => {
    //     var actual = FizzBuzzService.fizzBuzz(1)
    //     expect(actual).toBe("1")

    //     var actual = FizzBuzzService.fizzBuzz(2)
    //     expect(actual).toBe("2")
    // })
    it("if number is 1 it should return string of 1", () => {
        var actual = FizzBuzzService.fizzBuzz(1)
        expect(actual).toBe("1") 
    })
    it("if number can divide by 3 it should say fizz",()=>{
        var actual = FizzBuzzService.fizzBuzz(3)
        expect(actual).toBe("fizz")
    })
    it("if number can divide by 5 it should say buzz", () => {
        var actual = FizzBuzzService.fizzBuzz(5)
        expect(actual).toBe("buzz")
    })
    it("if number can divide by 3 and 5 it should say fizzbuzz",() =>{
        var actual = FizzBuzzService.fizzBuzz(15)
        expect(actual).toBe("fizzbuzz")
    })
    it("if number is 2 it should return string of 2", () => {
        var actual = FizzBuzzService.fizzBuzz(2)
        expect(actual).toBe("2") 
    })
    it("if number is 30 it should say fizzbuzz", () => {
        var actual = FizzBuzzService.fizzBuzz(30)
        expect(actual).toBe("fizzbuzz") 
    })
})