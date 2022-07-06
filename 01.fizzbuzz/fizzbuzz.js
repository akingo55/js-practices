function fizzBuzz (maxNumber) {
  for (let number = 1; number <= maxNumber; number++) {
    if (number % 15 === 0) {
      console.log('fizzBuzz')
    } else if (number % 5 === 0) {
      console.log('Buzz')
    } else if (number % 3 === 0) {
      console.log('Fizz')
    } else {
      console.log(number)
    }
  }
}

fizzBuzz(20)
