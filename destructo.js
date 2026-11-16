/* Task 1: Unveiling the Coordinates */
const coordinates = {x: 34, y: 42, z: 67};
// Object destructuring pulls properties out of an object by name.
// The names inside { } must match the property names on the object.
// `z` is left behind because we never asked for it.
// After this line, `x` and `y` are ordinary variables (34 and 42).
const { x, y } = coordinates;
console.log(`Coordinates: x = ${x}, y = ${y}`);

/* Task 2: The Map of Secrets */
const locations = {
	first: "Cave of Wonders",
	second: "Lake of Mystery",
	third: "Mount of Ages",
	fourth: "Desert of Shadows"
};
// Same idea as Task 1, plus the rest parameter (`...remaining`).
// `first` and `second` are pulled out by name.
// Everything that was NOT named is packed into a new object called `remaining`.
// So remaining is { third: "Mount of Ages", fourth: "Desert of Shadows" }.
// The `...` must come last; you cannot put named properties after it.
const { first, second, ...remaining } = locations;
console.log(`Key locations: ${first}, ${second}`);
console.log("Remaining locations:", remaining);

/* Task 3: The Mysterious Door */
const doorCode = {
	upper: "Alpha",
	lower: "Omega"
};
// A `=` inside the destructuring pattern is a default, used only when
// the property is missing or undefined. `upper` and `lower` exist, so
// they keep "Alpha" and "Omega". `middle` is not on doorCode, so the
// default runs. It reads `remaining.third` from Task 2 ("Mount of Ages").
// If doorCode later gained a middle property, that value would win and
// the default would be ignored.
const { upper, middle = remaining.third, lower } = doorCode;
console.log(`Door code sequence: ${upper} - ${middle} - ${lower}`);

/* Task 4: The Guardian's Riddle */
const riddle = {
	ancientWord: "Sphinx",
	modernWord: "Cat"
};
// The colon here is a rename, not a default. The form is { oldName: newName }.
// We look up `ancientWord` on the object, then store that value in a
// variable called `translation`. There is no variable named ancientWord
// after this line. `modernWord` is skipped because we did not list it.
const { ancientWord: translation } = riddle;
console.log(`Riddle translation: ${translation}`);

/* Task 5: The Array of Elements */
const elements = ["Fire", "Water", "Earth", "Air"];
// Array destructuring matches by position, not by name.
// The first slot gets index 0, the second slot gets index 1.
// "Earth" and "Air" are ignored because there are no more slots.
const [essential1, essential2] = elements;
console.log(`Essential elements: ${essential1}, ${essential2}`);

/* Task 6: Skipping Stones */
const stones = [1, 2, 3, 4, 5, 6];
// A hole (just a comma) skips that index without creating a variable.
// Slot 0 -> firstStone (1)
// Slots 1 through 4 are skipped (2, 3, 4, 5)
// Slot 5 -> sixthStone (6)
const [firstStone, , , , , sixthStone] = stones;
console.log(`Extracted stones: ${firstStone} and ${sixthStone}`);

/* Task 7: The Array of Shadows */
const shadows = ["Darkness", "Silence", "Whisper", "Echo"];
// The first position takes index 0. `...hiddenShadows` gathers every
// remaining item into a new array: ["Silence", "Whisper", "Echo"].
// On arrays, rest builds an array. On objects (Task 2), rest builds an object.
const [visibleShadow, ...hiddenShadows] = shadows;
console.log(`Visible shadow: ${visibleShadow}`);
console.log("Hidden shadows:", hiddenShadows);

/* Task 8: The Wise Function */
// Destructuring can happen in a function's parameter list.
// Calling revealPath({ direction: "north", distance: 5 }) unpacks the
// argument object immediately, so the body can use `direction` and
// `distance` without writing path.direction or path.distance.
function revealPath({ direction, distance }) {
	console.log(`Travel ${distance} units ${direction}.`);
}
revealPath({ direction: "north", distance: 12 });

/* Task 9: Potion of Clarity */
// Defaults live inside the parameter pattern, same as Task 3.
// If a caller omits ingredient1, it becomes "Water".
// If a caller omits ingredient2, it becomes "Fireflower".
// The `= {}` on the whole parameter matters too: if someone calls
// mixPotion() with no argument at all, we destructure an empty object
// instead of crashing on undefined.
function mixPotion({ ingredient1 = "Water", ingredient2 = "Fireflower" } = {}) {
	console.log(`Mixing ${ingredient1} and ${ingredient2}.`);
}
mixPotion({ ingredient1: "Moondew" });
mixPotion({});

/* Task 10: The Array Spell */
// The parameter itself is an array pattern. The first item of whatever
// array is passed becomes ingredient1; the second becomes ingredient2.
// Later items are ignored, just like Task 5.
function castSpell([ingredient1, ingredient2]) {
	console.log(`Casting spell with ${ingredient1} and ${ingredient2}.`);
}
castSpell(["Owl Feather", "Starlight", "Dust"]);

/* Task 11: The Nested Secret */
const nestedSecret = {outer: {inner: "The Final Key"}};
// Patterns can nest to follow the shape of the data.
// outer: { inner } means: take the `outer` property (which is an object),
// then take `inner` from that inner object. Only `inner` becomes a
// variable. `outer` itself is not kept.
const { outer: { inner } } = nestedSecret;
console.log(`Unveiled secret: ${inner}`);

/* Task 12: The Swap of Fate */
let stoneA = "Emerald";
let stoneB = "Ruby";
// The right side builds a temporary array: ["Ruby", "Emerald"].
// The left side assigns that array back by position, so stoneA gets
// the first item and stoneB gets the second. No temporary variable needed.
// `let` above is required because const bindings cannot be reassigned.
[stoneA, stoneB] = [stoneB, stoneA];
console.log(`After the swap: stoneA = ${stoneA}, stoneB = ${stoneB}`);
