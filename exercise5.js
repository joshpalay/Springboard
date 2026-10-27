const guests = ["ANTONY", "CICERO", "CASSIUS", "CLEOPATRA"];

// Step 1: Add "BRUTUS" to the beginning of the guest list.
guests.unshift("BRUTUS");

// Question 1: How can you verify that "BRUTUS" was added to the beginning of the array?
// You can check the first element of the guests array using guests[0].

// Step 2: Add "AUGUSTUS" and "LUCIA" to the end of the guest list.
guests.push("AUGUSTUS", "LUCIA");

// Step 3: Check whether "SPARTACUS" is invited and find his position.
const spartacusIndex = guests.indexOf("SPARTACUS");

// Question 2: What would the value of spartacusIndex be if "SPARTACUS" wasn't invited?
// If "SPARTACUS" wasn't invited, the indexOf method would return -1.

// Step 4: Remove "CASSIUS" from the guest list.
const indexToRemove = guests.indexOf("CASSIUS");
guests.splice(indexToRemove, 1);

// Step 5: Extract the first three guests into a new array for a special invite.
const specialGuests = guests.slice(0, 3);

// Step 6: Sort the guest list alphabetically, but keep the honored guest at the top.
const honoredGuests = guests.slice(0, 1); // Extracts honored guests.
const otherGuests = guests.slice(1); // Extracts the rest of the guests.
otherGuests.sort(); // Sorts the other guests.
const sortedGuests = honoredGuests.concat(otherGuests); // Combines both arrays.
