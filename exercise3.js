// Step 1: Generate a decimal number between 0 (inclusive) and 1 (exclusive).
const randomDecimal = Math.random();

// Step 2: Determine the desired range for the secret shift value, between 3 and 33.
const range = 33 - 3 + 1; // 31

// Question 1: Why did we add 1 to the difference between 33 and 3?
// We added 1 to ensure we include both endpoints of our range, 3 and 33, so we have a total of 31 possible numbers (from 3 to 33 inclusive).

// Step 3: Adjust the random decimal so it fits within the desired range.
const randomInRange = randomDecimal * range; // Adjusts the range to get a number between 0 (inclusive) and the value of 'range' (exclusive).

// Question 2: How does multiplying randomDecimal by range help us get a number within our desired range?
// Multiplying the randomDecimal (which is between 0 and 1) by the range scales the decimal to fall within the range of 0 to range. This means we'll get a decimal number that's between 0 (inclusive) and the value of range (exclusive), thus fitting it within our desired range.

// Step 4: Round down the decimal number to get a whole integer.
const randomInt = Math.floor(randomInRange); // Convert the decimal number to an integer to get values between 0 and (range - 1).

// Question 3: Why do we use the Math.floor() function instead of other rounding methods like Math.round()?
// We use Math.floor() to ensure we always round down to the nearest whole number, giving us an integer between 0 and range - 1. Using Math.round() could potentially round up, causing us to exceed our desired range.

// Step 5: Adjust the integer so the final shift value is between 3 and 33, inclusive.
const shiftValue = randomInt + 3; // Shift the range to get an integer between 3 and 33

// Question 4: How does adding 3 to randomInt ensure that our final shiftValue is between 3 and 33?
// Since randomInt is a number between 0 and range - 1 (which is 30 in this case), adding 3 shifts this range upward, resulting in numbers between 3 and 33 inclusive.
