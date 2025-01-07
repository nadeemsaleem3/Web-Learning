// Write a function reverseString(str) that takes a string and returns it reversed.

function reverseString(str) {
    //return str.split("").reverse().join(""); //First Method

    // var newString = ""; //Second Method
    // for (var i = str.length - 1; i >= 0; i--) {
    //     newString += str[i];
    // }
    // return newString;

    if (str === "") //Third Method
         return "";
       else
         return reverseString(str.substr(1)) + str.charAt(0);
}

console.log(reverseString("hello"));

// Create a function isPalindrome(str) that checks if a string is a palindrome (reads the same backward as forward).

function palindrome(str) {
    const alphanumericOnly = str
        // 1) Lowercase the input
        .toLowerCase()
        // 2) Strip out non-alphanumeric characters
        .match(/[a-z0-9]/g);

    // 3) return string === reversedString
    return alphanumericOnly.join('') ===
        alphanumericOnly.reverse().join('');
}

console.log(palindrome("racecar"));
console.log(palindrome("Hello"));

// Write a function fizzBuzz(n) that prints numbers from 1 to n. For multiples of 3, print "Fizz", for multiples of 5, print "Buzz", and for multiples of both 3 and 5, print "FizzBuzz".

function fizzBuzz(number) {
    for (var i = 1; i < number; i++) {
        if (i % 15 == 0) console.log("FizzBuzz");
        else if (i % 3 == 0) console.log("Fizz");
        else if (i % 5 == 0) console.log("Buzz");
        else console.log(i);
    }
}

console.log(fizzBuzz(101));

// Create a function factorial(num) that returns the factorial of a given number.

function factorialize(num) {
    if (num < 0) 
           return -1;
    else if (num == 0) 
         return 1;
    else {
        return (num * factorialize(num - 1));
    }

    // var result = num;
    // if (num === 0 || num === 1) 
    //     return 1; 
    // while (num > 1) { 
    //     num--;
    //     result *= num;
    // }
    // return result;

    // if (num === 0 || num === 1)
    //     return 1;
    //   for (var i = num - 1; i >= 1; i--) {
    //     num *= i;
    //   }
    //   return num;
  }

  console.log(factorialize(5));

  // Write a function findLargest(arr) that takes an array of numbers and returns the largest number.

  function largestOfFour(mainArray) {
    return mainArray.map(function(subArray) {
      return Math.max.apply(null, subArray);
    });
  }
  console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));

  // Create a function removeDuplicates(arr) that removes duplicate values from an array.

  function removeDuplicates(arr) {
    let a1 = arr.reduce(function (acc, curr) {
        if (!acc.includes(curr)) {
            acc.push(curr);
        }
        
        return acc;
    }, []);
    
    console.log(a1)
  }

  removeDuplicates([1, 2, 2, 3, 4, 4, 5]);

  // Write a function countChar(str, char) that counts the number of occurrences of a specific character in a string.

  function countChar(str, char) {
    let res = 0;
 
    for (let i = 0; i < str.length; i++)
    {
        // checking character in string
        if (str.charAt(i) == char)
            res++;
    } 
    return res;
  }

  console.log(countChar("javascript", "a"));

  // Write a function findMissing(arr, n) that finds the missing number in a sequence of numbers from 1 to n.

  function findMissing(arr, n) {
    const sumOfFirstN = (n * (n + 1)) / 2;

    let sumOfArray = 0;
    for (let i = 0; i < n - 1; i++) {
        sumOfArray = sumOfArray + arr[i];
    }

    let missingNumber = sumOfFirstN - sumOfArray;

    return missingNumber;
  }

  console.log(findMissing([1, 2, 4, 5], 5));

  // Create a function flattenArray(arr) that flattens a nested array.

  function flattenArray(arr) {
    let result = [];
    arr.forEach((item) => {
        if (Array.isArray(item)) {
            result = result.concat(flattenArray(item));
        } else {
            result.push(item);
        }
    });
  
    return result;
  }

  console.log(flattenArray([1, [2, [3, [4]], 5]]));

  // Write a function areAnagrams(str1, str2) that checks if two strings are anagrams.

  function areAnagrams(str1, str2) {
    if(!str1 || !str2 || str1.length !== str2.length){return false;}

    var lS1 = str1.toLowerCase();
    var lS2 = str2.toLowerCase();
   
    if(lS1 === lS2) {return false;}
   
    var rS1 = lS1.split('').sort().join('');
    var rS2 = lS2.split('').sort().join('');
   
    return rS1 === rS2;
  }

  console.log(areAnagrams("listen", "silent"));
  console.log(areAnagrams("hello", "world"));

  // Implement a debounce(func, delay) function that delays the execution of a given function until after a specified delay.

  function debounce(func, timeout = 300) {
    let timer;
    return function(...args) {
        const context = this; // Capture `this`
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), timeout);
    };
}

const debouncedFn = debounce(() => console.log("Called!"), 300);
debouncedFn();

  // Create a throttle(func, limit) function that ensures a function is called at most once in a specified time interval.

  function throttle(func, delay) {
    let timeout = null;
    return (...args) => {
        if (!timeout) {
            func(...args);
            timeout = setTimeout(() => {
                timeout = null;
            }, delay);
        }
    };
}

const throttledFn = throttle(() => console.log("Called!"), 1000);
throttledFn(); // Should call immediately
throttledFn(); // Subsequent calls within the delay are ignored

// Write a function generatePermutations(arr) that returns all permutations of an array.

function generatePermutations(arr) {
    var length = arr.length,
      result = [arr.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = arr[i];
      arr[i] = arr[k];
      arr[k] = p;
      ++c[i];
      i = 1;
      result.push(arr.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

console.log(generatePermutations([1, 2, 3]));

// Create a Calculator class that supports basic operations like addition, subtraction, multiplication, and division.

class Calculator {
    constructor() {
        this.value = 0;
    }

    add(num) {
        this.value += num;
        return this;
    }

    subtract(num) {
        this.value -= num;
        return this;
    }

    multiply(num) {
        this.value *= num;
        return this;
    }

    divide(num) {
        if (num !== 0) {
            this.value /= num;
        } else {
            console.log("Division by zero is not allowed!");
        }
        return this;
    }

    result() {
        return this.value;
    }
}

const calc = new Calculator();
console.log(calc.add(5).subtract(2).multiply(3).divide(2).result()); // Output: 4.5

// Implement a function memoize(func) that caches the results of a function for faster repeated calls.

function memoize(func) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args); // Use arguments as key
        if (key in cache) {
            console.log("Fetching from cache");
            return cache[key];
        } else {
            console.log("Calculating result");
            const result = func(...args);
            cache[key] = result;
            return result;
        }
    };
}

const add = (a, b) => a + b;
const memoizedAdd = memoize(add);
console.log(memoizedAdd(1, 2)); // Calculates and caches result
console.log(memoizedAdd(1, 2)); // Returns cached result