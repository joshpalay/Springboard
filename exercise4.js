const emblemClue1 = "Eagle";
const emblemClue2 = "Laurel";
const emblemClue3 = 7;

// Step 1: Decipher the first clue with if, else if, and else.
let location;

if (emblemClue1 === "Eagle") {
  location = "Forum";
} else if (emblemClue1 === "Lion") {
  location = "Colosseum";
} else {
  location = "Villa";
}

// Step 2: Decipher the second clue with boolean logic.
if (emblemClue2 === "Laurel" && location === "Forum") {
  location += " of Augustus";
} else if (emblemClue2 === "Grapes" || location === "Villa") {
  location += " of Pompey";
}

// Step 3: Decipher the third clue with a switch statement.
switch (emblemClue3) {
  case 7:
    location += " North";
    break;
  case 3:
    location += " South";
    break;
  case 9:
    location += " East";
    break;
  case 4:
    location += " West";
    break;
}

// Question: Why is it important to be careful when using == (double equals) instead of === (triple equals) in our conditionals?
// == converts the values to the same type before comparing them. That can make a condition true when the types do not actually match, such as 7 == "7". === compares both the value and the type, so 7 === "7" is false. Using == can let a clue pass a check it should fail.

console.log(location);
