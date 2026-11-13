// Each planet is one object with three properties:
//   name        the planet's name
//   temperature average temperature in Kelvin (K)
//   distance    distance from the Sun in astronomical units (AU)
const planets = [
	{name: "Mercury", temperature: 440, distance: 0.39},
	{name: "Venus", temperature: 737, distance: 0.72},
	{name: "Earth", temperature: 288, distance: 1},
	{name: "Mars", temperature: 253, distance: 1.5},
	{name: "Jupiter", temperature: 163, distance: 5.2},
	{name: "Saturn", temperature: 133, distance: 9.58},
	{name: "Uranus", temperature: 78, distance: 19.22},
	{name: "Neptune", temperature: 73, distance: 30.05}
];

// A planet is a habitability candidate only when BOTH of these are true:
//   temperature is from 253 K through 323 K, including the endpoints
//   distance is from 0.75 AU through 1.5 AU, including the endpoints
// "Inclusive" means a planet sitting exactly on a boundary still counts.
// Mars is the example: 253 K and 1.5 AU are both the lowest/farthest allowed values.

// filter keeps an item when the callback returns true and drops it when the callback returns false.
// The original planets array is left unchanged. filter builds a new, possibly shorter, array.
const habitablePlanets = planets.filter(function(planet) {
	// planet is one object, such as {name: "Earth", temperature: 288, distance: 1}.
	// >= and <= include the boundary values. < or > would have rejected Mars.
	const temperatureIsHabitable = planet.temperature >= 253 && planet.temperature <= 323;
	const distanceIsHabitable = planet.distance >= 0.75 && planet.distance <= 1.5;

	// && means both checks must pass. Venus is warm enough in distance? No — 0.72 is below 0.75,
	// and 737 K is far above 323, so Venus is removed. Earth passes both, so Earth stays.
	return temperatureIsHabitable && distanceIsHabitable;
});

// The task asks for names, not the full planet objects.
// map visits every remaining planet and replaces it with whatever the callback returns.
// Returning planet.name turns {name: "Earth", ...} into the string "Earth".
// After filter, only Earth and Mars are left, so the new array is ["Earth", "Mars"].
const habitablePlanetNames = habitablePlanets.map(function(planet) {
	return planet.name;
});

// Print that new array of names. Expected output: ["Earth", "Mars"]
console.log(habitablePlanetNames);
