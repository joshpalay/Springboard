const guests = {
  ANTONY: {
    title: "General",
    region: "Rome",
    dietaryPreference: "Vegetarian",
    pastGifts: ["Golden Laurel", "Chariot"]
  },
  CICERO: {
    title: "Orator",
    region: "Arpinum",
    dietaryPreference: "Omnivore",
    pastGifts: ["Scroll of Proverbs", "Quill"]
  }
};

// Step 1: Add "BRUTUS" to the guest directory.
guests.BRUTUS = {
  title: "Senator",
  region: "Rome",
  dietaryPreference: "Vegan",
  pastGifts: ["Silver Dagger", "Marble Bust"]
};

// Step 2: Update CICERO's past gifts to include a "Golden Lyre".
guests.CICERO.pastGifts.push("Golden Lyre");

// Step 3: Retrieve the region of "ANTONY".
const antonyRegion = guests.ANTONY.region;

// Step 4: Remove "CICERO" from the guest list.
delete guests.CICERO;

// Step 5: Assign ANTONY's profile to generalProfile, then change the region to "Egypt".
const generalProfile = guests.ANTONY;
generalProfile.region = "Egypt";

// Question 1: After executing Step 5, what will be the region of ANTONY in the original guests object?
// The region will be "Egypt". generalProfile and guests.ANTONY refer to the same object, so changing generalProfile.region also changes guests.ANTONY.region.
