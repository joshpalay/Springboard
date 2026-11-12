/*
 * Time Travel Agency — hoisting practice
 *
 * JavaScript processes declarations before it runs the rest of the line.
 * That "declarations get lifted to the top of their scope" behavior is
 * called hoisting. How useful the lifted name is depends on the keyword:
 *
 *   var  — hoisted and initialized to undefined. Safe to read early; you
 *          just get undefined until the assignment line runs.
 *   let  — hoisted, but NOT initialized. Reading it before its line throws
 *          a ReferenceError. That gap is the temporal dead zone (TDZ).
 *   const — same TDZ rules as let, plus the binding can never be reassigned.
 *
 * This file walks through those rules with a destination, a travel date,
 * and a time-machine model.
 */

/* Task 1: Declare a Destination Variable */

// `let` declares a block-scoped variable we are allowed to reassign later.
// The name `destination` enters the temporal dead zone at the top of this
// script and only becomes readable on the next line, when it is initialized.
let destination = "Ancient Egypt";

// Prints "Ancient Egypt". The declaration has already run, so the value
// is the string we just assigned — not undefined.
console.log(destination);

/* Task 2: Change the Destination */

// This is an assignment, not a new declaration. `let` allows it.
// Reusing `let destination` here would throw, because the name is already
// declared in this scope.
destination = "Medieval Europe";

// Prints "Medieval Europe". Same variable, new value.
console.log(destination);

/* Task 3: Declare a Constant Travel Date */

// `const` must be initialized on the same line as the declaration.
// Like `let`, it is block-scoped and hoisted into the temporal dead zone,
// so `console.log(travelDate)` ABOVE this line would throw a ReferenceError.
const travelDate = "2024-03-15";

// Prints "2024-03-15". Reading a const after initialization is fine.
console.log(travelDate);

// Uncomment the next line to see the failure. `const` creates a binding
// that cannot be pointed at a new value. The engine throws:
//   TypeError: Assignment to constant variable
// The original date stays "2024-03-15". (Note: const locks the binding,
// not the contents. If the value were an object, its properties could
// still be changed. A string has no properties to mutate, so this date
// is fixed.)
// travelDate = "2024-12-01";

/*
 * Observations:
 * Reassigning `travelDate` throws TypeError: Assignment to constant variable.
 * `const` means the variable always refers to the same value. The declaration
 * is hoisted, but the name sits in the temporal dead zone until the
 * `const travelDate = ...` line runs, so reading it earlier would throw
 * ReferenceError instead. After that line, the value stays "2024-03-15".
 */

/* Task 4: Experiment with Variable Hoisting */

// This log is intentionally BEFORE the `var` line below. It does not throw.
// `var timeMachineModel` is hoisted to the top of this script and initialized
// to undefined. Only the assignment `"T-800"` stays on the declaration line,
// so at this moment the variable exists but has not been given its value yet.
//
// What the engine effectively did before any of this file ran:
//   var timeMachineModel;          // hoisted, value is undefined
//   let destination;               // hoisted, but uninitialized (TDZ)
//   const travelDate;              // hoisted, but uninitialized (TDZ)
//
// Contrast: if this were `let` or `const`, this same log would throw
// ReferenceError: Cannot access 'timeMachineModel' before initialization.
console.log(timeMachineModel); // undefined

// Declaration was already hoisted. This line's real job is the assignment.
var timeMachineModel = "T-800";

// Prints "T-800". The assignment has run, so the hoisted variable now
// holds the model name.
console.log(timeMachineModel);

/*
 * Observations:
 * The first log prints undefined, not a ReferenceError. `var` declarations
 * are hoisted to the top of the script scope and initialized to undefined;
 * the assignment `"T-800"` is not hoisted with them. The first log therefore
 * runs while the variable is still undefined, and the second log prints
 * "T-800" because the assignment has executed.
 *
 * `let` and `const` are hoisted too, but they are not initialized, so using
 * them before their declaration line throws a ReferenceError. That window
 * between the start of the scope and the declaration line is the temporal
 * dead zone. `var` has no temporal dead zone — early reads return undefined.
 */
