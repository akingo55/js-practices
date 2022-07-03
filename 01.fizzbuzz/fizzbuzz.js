let Number = 1

function FizzBuzz (MaxNumber) {
  while (Number <= MaxNumber) {
    if (Number % 15 === 0) {
      console.log('FizzBuzz')
    } else if (Number % 5 === 0) {
      console.log('Buzz')
    } else if (Number % 3 === 0) {
      console.log('Fizz')
    } else {
      console.log(Number)
    }
    Number += 1
  }
}

FizzBuzz(20)
