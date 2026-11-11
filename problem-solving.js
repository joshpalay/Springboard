// Print Fizz, Buzz, FizzBuzz, or the number itself for every integer from 1 to n.
function fizzBuzz(n) {
  // n must be a whole number from 1 up to (but not including) 100.
  // Anything else — 0, 100, decimals, or non-numbers — is invalid.
  if (!Number.isInteger(n) || n < 1 || n >= 100) {
    console.log("Error");
    return; // Stop here so the loop never runs.
  }

  // Visit each integer from 1 through n, including both ends.
  for (let i = 1; i <= n; i++) {
    // % gives the leftover after division. A leftover of 0 means it divides evenly.
    const remainderBy3 = i % 3;
    const remainderBy5 = i % 5;

    // Check both divisors first. A number like 15 is divisible by 3 and by 5,
    // so it must print "FizzBuzz" only — not "Fizz" and then "Buzz" as well.
    if (remainderBy3 === 0 && remainderBy5 === 0) {
      console.log("FizzBuzz");
    } else if (remainderBy3 === 0) {
      console.log("Fizz");
    } else if (remainderBy5 === 0) {
      console.log("Buzz");
    } else {
      // Not divisible by 3 or 5, so print the number itself.
      console.log(i);
    }
  }
}

// Count how many times each letter appears in word.
// Returns an object like { c: 1, a: 2, e: 1, s: 1, r: 1 }.
function letterCount(word) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Reject anything that is not a string (numbers, null, objects, and so on).
  if (typeof word !== "string") {
    console.log("Error");
    return;
  }

  // Every character must be a letter. Digits, spaces, and symbols are invalid.
  // toLowerCase() lets "C" and "c" both match the lowercase alphabet.
  for (const letter of word) {
    if (!alphabet.includes(letter.toLowerCase())) {
      console.log("Error");
      return; // Stop before counting so a bad word never returns a partial result.
    }
  }

  // Keys are lowercase letters; values are how many times that letter has been seen.
  const letterCounts = {};

  for (const letter of word) {
    // Treat "A" and "a" as the same letter.
    const lowerCaseLetter = letter.toLowerCase();

    if (letterCounts[lowerCaseLetter] !== undefined) {
      // This letter was already counted, so add one more.
      letterCounts[lowerCaseLetter]++;
    } else {
      // First time seeing this letter, so start its count at 1.
      letterCounts[lowerCaseLetter] = 1;
    }
  }

  return letterCounts;
}

// The prompt also calls this function letterOccurrence.
const letterOccurrence = letterCount;

// Invalid inputs: 0 and 100 are outside 1–99, so each call prints "Error".
fizzBuzz(0);
fizzBuzz(100);

// Valid input: prints 1 through 16, with Fizz, Buzz, and FizzBuzz where required.
fizzBuzz(16);

// "Caesar42" contains digits, so this prints "Error" and returns nothing.
letterCount("Caesar42");

// These two are letters only, so each call returns and prints the letter counts.
console.log(letterCount("Caesar"));
console.log(letterCount("AAbaBa"));
