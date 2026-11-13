// Catalog of creature sightings. Each object records a name, a type, and
// the place the creature was last seen. Array methods below search this list
// without changing it.
const mythicalCreatures = [
	{name: "Dragon", type: "Fire", lastSeen: "Volcano Valley"},
	{name: "Mermaid", type: "Water", lastSeen: "Coral Caves"},
	{name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest"},
	{name: "Griffin", type: "Air", lastSeen: "Highwind Mountains"},
	{name: "Kraken", type: "Water", lastSeen: "Abyssal Depths"}
];

// Step 1: Find the first Water creature and log its name.
// find walks the array from the start and returns the first object for which
// the callback returns true. The callback here checks the type property.
// Mermaid matches first, so Kraken is skipped even though it is also Water.
// If nothing matched, find would return undefined.
const firstWaterCreature = mythicalCreatures.find(creature => creature.type === "Water");

// Log only the name, not the whole object. Expected output: Mermaid
console.log(firstWaterCreature.name);

// Step 2: Find the index of the Griffin and log it.
// findIndex works like find, but it returns a number (the position) instead
// of the object itself. Positions start at 0:
// 0 Dragon, 1 Mermaid, 2 Unicorn, 3 Griffin, 4 Kraken.
// If the name were missing, findIndex would return -1.
const griffinIndex = mythicalCreatures.findIndex(creature => creature.name === "Griffin");

// Expected output: 3
console.log(griffinIndex);

// Step 3: Find the first creature last seen in the Enchanted Forest.
// Same find pattern as Step 1, but the callback compares lastSeen instead of type.
// Unicorn is the only match, so find returns that whole object.
const enchantedForestCreature = mythicalCreatures.find(creature => creature.lastSeen === "Enchanted Forest");

// Log the whole sighting so name, type, and location all show up.
// Expected output: { name: 'Unicorn', type: 'Land', lastSeen: 'Enchanted Forest' }
console.log(enchantedForestCreature);
