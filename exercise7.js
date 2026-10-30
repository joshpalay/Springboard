const friend = "BRUTUS"
const shiftValue = 3;

// Step 1: Recall the Latin alphabet variable from the previous exercise.
const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Step 2: Encrypt each letter of "BRUTUS" by shifting it with the Caesar Cipher.
let encryptedName = "";

for (let i = 0; i < friend.length; i++) {
  const currentLetter = friend[i];
  const currentIndex = alphabet.indexOf(currentLetter.toLowerCase());
  const newIndex = (currentIndex + shiftValue) % alphabet.length;
  encryptedName += alphabet[newIndex].toUpperCase();
}

// Question 1: What advantage does using a loop provide over manually encrypting each letter?
// A loop encrypts each letter in order without repeating the same code for every character. The same loop works for a name of any length.

// Question 2: Explain the role of `% alphabet.length` in our loop. How does it aid in the encryption process?
// The `%` operator wraps the shifted index back to the start of the alphabet when it passes the last letter. After "z", encryption continues at "a".
