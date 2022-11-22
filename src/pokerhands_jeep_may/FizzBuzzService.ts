const fizzBuzz = (input: number): string => {
    if (input % 3 == 0 && input % 5 == 0) return "fizzbuzz"
    if (input % 3 == 0 ) {
        return "fizz"
    }
    if (input % 5 == 0) {
        return "buzz"
    }
    return input.toString()
} 

export default { fizzBuzz }