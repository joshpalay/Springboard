/* Task 1: Compile Participant Details with Shorthand Property Names */

// These three variables hold the raw participant data.
// The variable names match the property names we want on the object.
const name = "Dr. Nova Quark";
const age = 34;
const studyField = "Quantum Biology";

// Shorthand property names: when a property name is the same as the
// variable that supplies its value, you can write just the name.
//
// This object is exactly the same as writing:
//   const participant = {
//     name: name,
//     age: age,
//     studyField: studyField
//   };
//
// JavaScript copies each variable's current value into the matching property.
const participant = {
  name,
  age,
  studyField
};

console.log("Task 1 — participant object:");
console.log(participant);


/* Task 2: Implement a Shorthand Function for Participant Info */

// Copy every property from `participant` into a new object, then add a method.
// The spread (`...participant`) does the copy so the original object stays unchanged.
//
// `displayInfo() { ... }` is method shorthand. It is the short form of:
//   displayInfo: function () { ... }
//
// A regular method gets its own `this`. When we call
// `participantWithInfo.displayInfo()`, `this` is `participantWithInfo`,
// so `this.name`, `this.age`, and `this.studyField` read that object's properties.
// The backticks are a template string: ${...} inserts those values into the sentence.
const participantWithInfo = {
  ...participant,
  displayInfo() {
    console.log(
      `Participant: ${this.name}, Age: ${this.age}, Study Field: ${this.studyField}`
    );
  }
};

console.log("\nTask 2 — shorthand method (this refers to the object):");
participantWithInfo.displayInfo();


/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
/*
 * Observations:
 * The regular method in Task 2 prints the participant's real details because
 * a normal function sets `this` from the call. Calling
 * participantWithInfo.displayInfo() sets `this` to participantWithInfo.
 *
 * The arrow function below does not. Arrow functions have no `this` of their
 * own. They reuse `this` from the surrounding scope (lexical this), and they
 * ignore the object they are stored on. Method shorthand (`displayInfo() {}`)
 * always creates a regular function, so an arrow function has to be assigned
 * as a property: `displayInfo: () => { ... }`.
 *
 * This file's top-level code is that surrounding scope. In Node.js, top-level
 * `this` is the module exports object, which has no name, age, or studyField.
 * In a browser script, top-level `this` is the window object. Either way,
 * `this` is not the participant, so the template string prints `undefined`
 * (or the window's own name, which is usually an empty string) instead of
 * Dr. Nova Quark's details.
 *
 * Use a regular method when the function needs the object it belongs to.
 * Use an arrow function when you want `this` to stay the same as the code
 * around it, such as a callback inside a method.
 */

// Same copy as Task 2, but displayInfo is an arrow function.
// The arrow captures `this` from here, at the top of the file, not from
// the object created by the curly braces.
const participantWithArrowInfo = {
  ...participant,
  displayInfo: () => {
    console.log(
      `Participant: ${this.name}, Age: ${this.age}, Study Field: ${this.studyField}`
    );
  }
};

console.log("\nTask 3 — arrow function (this is NOT the participant object):");
participantWithArrowInfo.displayInfo();


/* Task 4: Using Computed Property Names */

// updateParticipantInfo builds a new object instead of changing the one passed in.
//
// Parameters:
//   propertyName       — the key to set, such as "studyField" or "age"
//   value              — the new value for that key
//   participantObject  — the existing participant to copy
//
// `[propertyName]` is a computed property name. The expression inside the
// brackets is evaluated, and its result becomes the property key. That lets
// one function update any field. A fixed key like `studyField: value` could
// only ever change studyField.
//
// The spread copies the old properties first. The computed property comes
// after the spread, so it overwrites that key when it already exists and adds
// it when it does not. The original object is left as it was.
function updateParticipantInfo(propertyName, value, participantObject) {
  return {
    ...participantObject,
    [propertyName]: value
  };
}

// Change an existing field. `participant` still says "Quantum Biology".
const promotedParticipant = updateParticipantInfo(
  "studyField",
  "Astrobiology",
  participant
);

// Add a brand-new field. The key "lab" comes from the propertyName argument.
const assignedParticipant = updateParticipantInfo(
  "lab",
  "Crazy Science Lab",
  promotedParticipant
);

console.log("\nTask 4 — computed property update (new objects, original unchanged):");
console.log("Original participant:", participant);
console.log("After studyField update:", promotedParticipant);
console.log("After adding lab:", assignedParticipant);
