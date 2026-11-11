// Helping Caesar's Traditional Secret Party
// Technical Skills Survey, Project Part 2
//
// encrypt() turns a message into Caesar's code.
// decrypt() reverses that code back into the original message.
//
// Twist: after every two characters of the shifted message, a random
// lowercase letter is inserted so the ciphertext is harder to read.

const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Step 1: Shift letters.
// A letter moves forward by shiftValue places. The alphabet wraps, so
// X, Y, and Z with a shift of 3 become A, B, and C.
// Uppercase stays uppercase and lowercase stays lowercase.
// Spaces, punctuation, and any other non-letter are copied unchanged.
//
// charCodeAt() reads the numeric code of a character.
// String.fromCharCode() turns a numeric code back into a character.
// The remainder operator (%) wraps a code that runs past Z back to A.
function shiftCharacter(char, shiftValue) {
  // Non-letters do not move. A space stays a space, and "." stays ".".
  const isUppercase = char >= "A" && char <= "Z";
  const isLowercase = char >= "a" && char <= "z";
  if (!isUppercase && !isLowercase) {
    return char;
  }

  // "A" is code 65 and "a" is code 97. Subtracting the base turns the
  // letter into a position from 0 through 25, which is what % 26 expects.
  const base = isUppercase ? "A".charCodeAt(0) : "a".charCodeAt(0);
  const position = char.charCodeAt(0) - base;
  const shiftedPosition = (position + shiftValue) % 26;
  return String.fromCharCode(shiftedPosition + base);
}

// Step 2: Normalize the shift.
// A shift of 42 lands on the same letters as a shift of 16, because
// 42 - 26 = 16. The alphabet only has 26 letters, so extra full loops
// do not change the result.
//
// JavaScript's % keeps the sign of a negative number, so -3 % 26 is -3
// rather than 23. Adding 26 and taking % 26 again forces the result
// into 0–25. Decryption relies on this, because it shifts by a negative
// amount.
function normalizeShift(shiftValue) {
  return ((shiftValue % 26) + 26) % 26;
}

// Question: A shift of 42 is the same as which shift in the 0–25 range?
// Answer: 16. 42 % 26 = 16.

function encrypt(message, shiftValue) {
  // Step 2 is applied before any letter is moved.
  const normalizedShift = normalizeShift(shiftValue);

  let encryptedMessage = "";

  // Step 3: This counts characters added since the last random letter.
  // It counts every character, including spaces and punctuation.
  // The secret message in Step 5 only decodes when those count too.
  // Counting letters alone leaves the spaces in the wrong places.
  let charactersSinceRandomLetter = 0;

  for (let i = 0; i < message.length; i++) {
    // Step 1: shift this character and append it.
    encryptedMessage += shiftCharacter(message[i], normalizedShift);
    charactersSinceRandomLetter++;

    // Step 3: After two characters, insert one random lowercase letter,
    // then start the count over. A one-character message gets no insert,
    // because the count never reaches 2.
    if (charactersSinceRandomLetter === 2) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const randomLetter = alphabet[randomIndex];
      encryptedMessage += randomLetter;
      charactersSinceRandomLetter = 0;
    }
  }

  return encryptedMessage;
}

// Step 4: Decrypt.
// Encryption did two things, so decryption undoes them in reverse order:
//   1. Remove the random letter that was inserted after every two characters.
//   2. Shift the remaining letters backward by the same shift value.
//
// The random letters sit at indexes 2, 5, 8, ... so an index is noise
// when index % 3 === 2. Everything else is a real character.
//
// decrypt() does not call encrypt(). encrypt() would insert a new batch
// of random letters, and the message would still be disguised.
function decrypt(encryptedMessage, shiftValue) {
  let withoutRandomLetters = "";

  for (let i = 0; i < encryptedMessage.length; i++) {
    if (i % 3 !== 2) {
      withoutRandomLetters += encryptedMessage[i];
    }
  }

  // A backward shift is a negative shift. normalizeShift wraps it.
  const backwardShift = normalizeShift(-shiftValue);
  let decryptedMessage = "";

  for (let i = 0; i < withoutRandomLetters.length; i++) {
    decryptedMessage += shiftCharacter(withoutRandomLetters[i], backwardShift);
  }

  return decryptedMessage;
}

// ---------------------------------------------------------------------------
// Step 5: Test the cipher.
// encrypt() adds a different random letter on every run, so the printed
// ciphertext changes. The letters underneath do not: HELLO with a shift
// of 3 always contributes K, H, O, O, R. GARDEN with a shift of 3 always
// contributes J, D, U, G, H, Q.
// ---------------------------------------------------------------------------

// Question: What does a shift of 3 do to HELLO, before random letters?
// Answer: KHOOR. H->K, E->H, L->O, L->O, O->R.

const helloEncrypted = encrypt("HELLO", 3);
console.log(helloEncrypted); // KHOOR, with a random letter after every two characters
console.log(decrypt(helloEncrypted, 3)); // HELLO

const gardenEncrypted = encrypt("GARDEN", 3);
console.log(decrypt(gardenEncrypted, 3)); // GARDEN

// Mixed case, spaces, and punctuation must survive a round trip.
const partyMessage = "Hello, Caesar! The party is in the GARDEN.";
console.log(decrypt(encrypt(partyMessage, 3), 3)); // same sentence

// Shifts outside 0–25, including a negative shift, must wrap.
console.log(decrypt(encrypt("ABC", 42), 42)); // ABC
console.log(decrypt(encrypt("ABC", -3), -3)); // ABC

// The plain word KHOOR has no inserted letters, so it is not a ciphertext
// from encrypt(). Stripping every third character of that short word would
// throw a letter away. The shift itself is still KHOOR -> HELLO, which is
// what the walkthrough table is showing. Real ciphertexts take the other
// path: strip the inserted letters, then shift.
console.log(shiftCharacter("K", normalizeShift(-3))
  + shiftCharacter("H", normalizeShift(-3))
  + shiftCharacter("O", normalizeShift(-3))
  + shiftCharacter("O", normalizeShift(-3))
  + shiftCharacter("R", normalizeShift(-3))); // HELLO

// Question: Decrypt Caesar's secret message with a shift of 42.
// Answer: Seek the midnight shadow of Romulus and Remus. There, whisper the word 'Aurelius' to the winds. And by being able to get to this message, you have completed the quest!
const secretMessage = "Iuuuau juxuu cuytudyuwxuj uixuqtuemu euv uHeuckubkui uqdut uHuuckui.u Juxuuhuu, umxuyiufuuh ujxuu umeuhtu 'uQkuhuubyukiu' ujeu juxuu muydutiu. uQdut urou ruuyudwu qurbuu ujeu wuuju jue ujxuyiu cuuiuiquwuu, uoeuk uxquluu suecufbuujuutu juxuu gukuuiju!";

console.log(decrypt(secretMessage, 42));

// ---------------------------------------------------------------------------
// Optional challenge: alternate the shift direction.
// In each pair of characters, the first letter moves forward and the second
// letter moves backward. A random letter is still inserted after the pair.
// Non-letters still hold a slot in the pair, so decrypt can keep removing
// every third character. These are separate functions, so the quest above
// keeps using the original cipher.
// ---------------------------------------------------------------------------

function encryptAlternate(message, shiftValue) {
  const forwardShift = normalizeShift(shiftValue);
  const backwardShift = normalizeShift(-shiftValue);
  let encryptedMessage = "";
  let charactersSinceRandomLetter = 0;

  for (let i = 0; i < message.length; i++) {
    // Slot 0 of the pair goes forward. Slot 1 goes backward.
    const pairShift = charactersSinceRandomLetter === 0 ? forwardShift : backwardShift;
    encryptedMessage += shiftCharacter(message[i], pairShift);
    charactersSinceRandomLetter++;

    if (charactersSinceRandomLetter === 2) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      encryptedMessage += alphabet[randomIndex];
      charactersSinceRandomLetter = 0;
    }
  }

  return encryptedMessage;
}

function decryptAlternate(encryptedMessage, shiftValue) {
  const forwardShift = normalizeShift(shiftValue);
  const backwardShift = normalizeShift(-shiftValue);
  let withoutRandomLetters = "";

  for (let i = 0; i < encryptedMessage.length; i++) {
    if (i % 3 !== 2) {
      withoutRandomLetters += encryptedMessage[i];
    }
  }

  let decryptedMessage = "";
  let charactersSinceRandomLetter = 0;

  for (let i = 0; i < withoutRandomLetters.length; i++) {
    // Reverse the pair: the first letter now comes backward, the second forward.
    const pairShift = charactersSinceRandomLetter === 0 ? backwardShift : forwardShift;
    decryptedMessage += shiftCharacter(withoutRandomLetters[i], pairShift);
    charactersSinceRandomLetter++;
    if (charactersSinceRandomLetter === 2) {
      charactersSinceRandomLetter = 0;
    }
  }

  return decryptedMessage;
}

console.log(decryptAlternate(encryptAlternate("HELLO", 3), 3)); // HELLO
console.log(decryptAlternate(encryptAlternate(partyMessage, 5), 5)); // same sentence

// Attribution:
// The shift formula (charCodeAt, fromCharCode, and %) and the idea of
// dropping every third character come from the project instructions for
// Springboard's Technical Skills Survey, Project Part 2.
// I did not paste a solution file, and I did not get mentor or TA help.
