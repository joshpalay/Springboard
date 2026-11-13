// Starting data: each user has a first name, last name, and a point total.
const users = [
	{firstName: "Alice", lastName: "Johnson", points: 120},
	{firstName: "Bob", lastName: "Smith", points: 99},
	{firstName: "Charlie", lastName: "Brown", points: 180}
];

// map walks the array once and builds a brand-new array of the same length.
// The callback receives one user at a time and must return the object we want
// in that same position of the new array. The original users array is left as-is.
const usersWithMembership = users.map((user) => {
	// Join the two name fields with a single space so "Alice" + "Johnson"
	// becomes "Alice Johnson".
	const fullName = user.firstName + " " + user.lastName;

	// Premium starts only after 100 points. 100 itself stays Standard,
	// and anything below that stays Standard too.
	const membershipStatus = user.points > 100 ? "Premium" : "Standard";

	// Return a new object. Spreading user keeps firstName, lastName, and points,
	// then we add the two new properties on top of those.
	return {
		...user,
		fullName,
		membershipStatus
	};
});

// Print the mapped array so we can see fullName and membershipStatus for each user.
console.log(usersWithMembership);
