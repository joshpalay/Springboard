/* Task 1: Track Animal Sightings */
// A rest parameter is written as three dots in front of the last parameter name.
// In trackAnimalSightings, ...animals gathers every argument the caller passes
// into one real array called animals. The function does not need to know ahead
// of time how many animal names it will receive.
//
// A normal fixed parameter list, such as (firstAnimal, secondAnimal, thirdAnimal),
// would not work here. That kind of list only has room for a set number of names.
// A fourth sighting would have nowhere to go, and a report with only one animal
// would leave the extra parameters empty. Rest parameters solve that by collecting
// any number of arguments, including zero, into a single array you can loop over.

function trackAnimalSightings(...animals) {
	// animals is an array. Each element is one animal name from the call below.
	console.log("Number of sightings reported:", animals.length);

	// Print each sighting on its own line so every collected name is visible.
	for (const animal of animals) {
		console.log("Sighting:", animal);
	}
}

// This call passes four separate string arguments. The rest parameter packs
// them into ["Elephant", "Giraffe", "Zebra", "Cheetah"] inside the function.
trackAnimalSightings("Elephant", "Giraffe", "Zebra", "Cheetah");

/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];

// Array spread uses the same three-dot syntax, but in a different place.
// Inside a new array literal, ...forestHabitats copies each element of that
// array into the new list, and ...savannahHabitats does the same for the second
// array. The result is one new array that contains every habitat name.
//
// Spread copies the elements. It does not move them, and it does not change
// the arrays they came from. forestHabitats and savannahHabitats stay exactly
// as they were declared above.
const protectedAreas = [...forestHabitats, ...savannahHabitats];

console.log("Protected areas:", protectedAreas);
console.log("Original forest habitats (unchanged):", forestHabitats);
console.log("Original savannah habitats (unchanged):", savannahHabitats);

/* Task 3: Update Conservation Status */
const rhinoStatus = {
	population: 500,
	status: "Endangered"
};

// Object spread copies the top-level properties of rhinoStatus into a brand-new
// object. Here that means population and status are copied first.
//
// When two properties share the same key, the one written later wins. population
// is listed again after the spread, so 540 replaces the copied value of 500.
// habitat is a new key, so it is added to the new object only.
//
// Because the spread builds a new object, assigning these properties does not
// write back into rhinoStatus. The original object keeps population 500 and
// does not gain a habitat property.
const updatedRhinoStatus = {
	...rhinoStatus,
	population: 540,
	habitat: "Protected savannah reserve"
};

console.log("Original rhino status:", rhinoStatus);
console.log("Updated rhino status:", updatedRhinoStatus);

/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
	name: "Leo",
	age: 5,
	species: "Lion"
};

// This spread is a shallow copy of lionProfile. The new object receives its own
// copies of the top-level properties name, age, and species. Those values are
// strings and a number, so each one is copied by value.
//
// genetics is written after the spread, so it exists only on the copy. It was
// never a property of lionProfile. genetics is a nested object, and markers is
// a nested object inside genetics.
const lionProfileCopy = {
	...lionProfile,
	genetics: {
		diversity: "High",
		markers: {
			coatPattern: "Tawny",
			lineage: "Southern pride"
		}
	}
};

// This line changes a property buried inside the copy's genetics object.
// The original lionProfile has no genetics property, so this assignment cannot
// reach it.
lionProfileCopy.genetics.markers.coatPattern = "Golden tawny";

console.log("Original lion profile:", lionProfile);
console.log("Copied lion profile:", lionProfileCopy);

/*
 * Observations:
 * Adding genetics after the copy does not appear on the original, because it is
 * a new top-level property on the copy. The console output shows lionProfile
 * with only name, age, and species, while lionProfileCopy also has genetics,
 * including the updated coatPattern of "Golden tawny".
 *
 * Nested objects are shared by reference only when they already existed on the
 * source before the shallow copy. Here the nested genetics object was created
 * on the copy afterward, so mutating it does not change the original.
 *
 * If a nested object had already existed on lionProfile before the spread, the
 * shallow copy would copy only the reference to that nested object. Both the
 * original and the copy would then point at the same nested object in memory.
 * Changing a property inside it through the copy would also change the original,
 * because a shallow copy does not clone objects that are nested inside the source.
 */

/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
	waterQuality: "Good",
	foodSupply: {
		herbivores: "Abundant",
		carnivores: "Sufficient"
	}
};

// Object spread again makes a shallow copy. waterQuality is a top-level string,
// so the copy gets its own independent copy of that primitive value.
// foodSupply is different. It is a nested object that already existed on the
// source. The spread copies the reference to that same object. It does not
// create a second foodSupply.
const ecosystemHealthCopy = {
	...ecosystemHealth
};

// herbivores lives inside the shared foodSupply object. Changing it through the
// copy writes into the one object that both variables still point at, so the
// original ecosystemHealth changes too.
ecosystemHealthCopy.foodSupply.herbivores = "Scarce";

console.log("Original ecosystem health:", ecosystemHealth);
console.log("Copied ecosystem health:", ecosystemHealthCopy);

/*
 * Observations:
 * foodSupply is a nested object copied by reference, so changing herbivores on
 * the copy also changes the original. Both logged objects show herbivores as
 * "Scarce" even though the assignment used only ecosystemHealthCopy. The spread
 * copied the foodSupply property as a shared reference, not as a separate
 * nested object.
 *
 * A top-level primitive such as waterQuality would not be shared if it were
 * reassigned on the copy. A statement such as
 * ecosystemHealthCopy.waterQuality = "Poor" would update only the copy.
 * The original would still say "Good", because the string was copied by value
 * when the shallow copy was created. That is the opposite of the nested
 * foodSupply object, which both variables continue to share.
 */
