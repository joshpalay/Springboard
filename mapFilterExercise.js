/*
Write a function called doubleValuesWithMap which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValuesWithMap([1,2,3]) // [2,4,6]
    doubleValuesWithMap([1,-2,-3]) // [2,-4,-6]
*/

// map is like forEach, except map automatically builds and returns a new array.
// Whatever the callback returns becomes the next item in that new array.
// The original array is left unchanged.
function doubleValuesWithMap(arr) {
    // map calls this function once for every number in arr.
    // Returning val * 2 puts the doubled number into the new array.
    // [1, 2, 3] becomes [2, 4, 6]. Negative numbers stay negative: -2 * 2 is -4.
    return arr.map(function(val){
        return val * 2;
    });
}

/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.

Examples:
    valTimesIndex([1,2,3]) // [0,2,6]
    valTimesIndex([1,-2,-3]) // [0,-2,-6]
*/

// Array indexes start at 0, not 1.
// The first item is always multiplied by 0, so the first result is always 0.
function valTimesIndex(arr){
    // map gives the callback two useful arguments here:
    //   val is the current number
    //   idx is its position (0, 1, 2, ...)
    // For [1, 2, 3]:
    //   index 0: 1 * 0 = 0
    //   index 1: 2 * 1 = 2
    //   index 2: 3 * 2 = 6
    return arr.map(function(val, idx){
        return val * idx;
    });
}

/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.

Examples:
    extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

// map is a good fit when every input item should become exactly one output item.
function extractKey(arr, key){
    // val is one object, such as {name: 'Elie'}.
    // val[key] looks up the property whose name is stored in key.
    // If key is "name", val[key] is the same as val.name, which is "Elie".
    // map collects those looked-up values into a new array of strings.
    return arr.map(function(val){
        return val[key];
    });
}

/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.

Examples:
    filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') // [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]
*/

// filter keeps items when the callback returns true, and drops items when it returns false.
// Unlike map, the output can be shorter than the input.
function filterByValue(arr, key) {
    // val is one person object from the array.
    // val[key] reads the property named by key, for example val["isCatOwner"].
    // If that property was never set, JavaScript gives back undefined.
    // !== undefined is true only when the object actually has that key,
    // so Tim and Colt stay in the result and Elie and Matt are removed.
    // The objects that pass are returned as they are; filter does not change them.
    return arr.filter(function(val){
        return val[key] !== undefined;
    });
}
