const friend = "BRUTUS"
const shiftValue = 3;

// Step 1: Store the Latin alphabet in lowercase.
const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Step 2: Find the index of the first letter of Caesar's friend.
const firstLetter = friend[0];
const index = alphabet.indexOf(firstLetter.toLowerCase());

// Question 1: Oh, I know B is the 2nd letter of the alphabet. Then, why the result is 1 instead of 2?
// JavaScript uses zero-based indexing, which means the first item of a string is accessed using 0.

// Step 3: Shift the first letter by the shift value.
let newIndex = index + shiftValue;
let encryptedFirstLetter = alphabet[newIndex];

// Question 2: If we continue shifting letters and go beyond the last letter, "z", which operator could help us to wrap around and continue from the beginning of the alphabet?
// The modulus operator, `%`, helps us wrap around the alphabet. If we try to access an index beyond the length of our alphabet, the modulus operator ensures that the result wraps around starting from 0. For instance, accessing the 28th position (which doesn't exist) would give us an index of 2, corresponding to the third letter, "c". This operator ensures we always get a valid index within the bounds of the alphabet.

// Step 4: Determine the length of the alphabet.
const alphabetLength = alphabet.length;

// Step 5: Shift the first letter, wrapping around the alphabet when needed.
newIndex = (index + shiftValue) % alphabetLength;
encryptedFirstLetter = alphabet[newIndex];

// Step 6: Extract the first 3 characters from the encrypted message.
const encryptedMessage = "EUXWXV";
const teaserMessage = encryptedMessage.slice(0, 3);
