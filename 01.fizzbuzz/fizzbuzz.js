let num = 1;

function FizzBuzz(max_num){
  while (num <= max_num) {
    if (num % 15 == 0){
      console.log('FizzBuzz');
    }else if (num % 5 == 0){
      console.log('Buzz');
    }else if (num % 3 == 0){
      console.log('Fizz');
    }else{
      console.log(num);
    }
    num += 1;
  }
}

FizzBuzz(20);
