/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([5,1,2,3,10]) // [10,2,4,6,20]

*/

// forEach visits every item in an array and runs a callback for each one.
// It does not return a new array by itself, so we build one ourselves.
function doubleValues(arr){
    // Start with an empty array. This is where the doubled numbers will go.
    // We must not change the original array; the exercise asks for a new one.
    let newArr = [];

    // arr.forEach runs the function once per number.
    // val is the current number (1, then 2, then 3, and so on).
    arr.forEach(function(val){
        // Multiply the current number by 2, then add that result to newArr.
        // push always adds to the end, so the order stays the same as the input.
        newArr.push(val * 2);
    });

    // Hand the finished array back to whoever called doubleValues.
    return newArr;
}

/*
Write a function called onlyEvenValues which accepts an array and returns a new array with only the even values in the array passed to the function

Examples:
    onlyEvenValues([1,2,3]) // [2]
    onlyEvenValues([5,1,2,3,10]) // [2,10]

*/

// Even numbers divide by 2 with no remainder. Odd numbers have a remainder of 1.
function onlyEvenValues(arr){
    // Empty array that will hold only the even numbers we decide to keep.
    let newArr = [];

    // Walk through every number in the input array.
    arr.forEach(function(val){
        // The % operator gives the remainder of a division.
        // val % 2 === 0 means the number is even (2, 4, 10, 0, -2, ...).
        // Odd numbers fail this check and are skipped.
        if(val % 2 === 0){
            // Only even numbers get pushed. Odds are ignored on purpose.
            newArr.push(val);
        }
    });

    // Return the shorter array that contains just the even values.
    return newArr;
}

/*
Write a function called showFirstAndLast which accepts an array of strings and returns a new array with only the first and last character of each string.

Examples:
    showFirstAndLast(['colt','matt', 'tim', 'test']) // ["ct", "mt", "tm", "tt"]
    showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']

*/

// Strings can be indexed like arrays: the first character is at index 0.
function showFirstAndLast(arr){
    // This new array will hold the two-letter strings we build.
    let newArr = [];

    // val is one full string from the array, such as "colt" or "goodbye".
    arr.forEach(function(val){
        // val[0] is the first character. For "colt" that is "c".
        // val.length - 1 is the index of the last character.
        //   "colt" has length 4, so the last index is 3, which is "t".
        // The + operator joins the two characters into one string: "c" + "t" => "ct".
        // A two-letter word like "hi" uses both letters, so the result is still "hi".
        newArr.push(val[0] + val[val.length - 1]);
    });

    // Return one two-character string for every original string.
    return newArr;
}

/*
Write a function called addKeyAndValue which accepts an array of objects, a key, and a value and returns the array passed to the function with the new key and value added for each object 

Examples:
    addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor') 
    
    // [{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, {name: 'Matt', title:'instructor'}, {name: 'Colt', title:'instructor'}]

*/

// This one changes the objects that were passed in, then returns that same array.
// key and value are extra arguments, not items from the array.
function addKeyAndValue(arr,key,value){
    // val is one object, for example {name: 'Elie'}.
    arr.forEach(function(val){
        // Bracket notation lets us use a variable as the property name.
        // If key is "title" and value is "instructor", this line means:
        //   val["title"] = "instructor"
        // which adds title: "instructor" onto the existing object.
        // The name property that was already there stays in place.
        val[key] = value;
    });

    // Return the original array. Its objects now have the extra property.
    return arr;
}

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

// Vowels are a, e, i, o, and u. Y is not counted in this exercise.
// Case insensitive means "E" and "e" both count as the same vowel.
function vowelCount(str){
    // toLowerCase turns "Elie" into "elie" so capitals and lowercase match.
    // split("") breaks the string into an array of single characters:
    //   "elie" becomes ["e", "l", "i", "e"]
    let splitArr = str.toLowerCase().split("");

    // This object will store the counts. Keys are vowels, values are how many times.
    // It starts empty. If the string has no vowels, we return {}.
    let obj = {};

    // A string of the vowels we care about. indexOf will search inside it.
    let vowels = "aeiou";

    // Look at one character at a time.
    splitArr.forEach(function(letter){
        // indexOf returns the position of letter inside "aeiou", or -1 if it is missing.
        // "e" is found, so indexOf is not -1. "l", spaces, and punctuation return -1.
        // !== -1 means "this character is a vowel."
        if(vowels.indexOf(letter) !== -1){
            // obj[letter] is the count we already have for this vowel.
            // If it is already a number (truthy), we have seen this vowel before.
            if(obj[letter]){
                // Add 1 to the existing count. The second "e" in "elie" does this.
                obj[letter]++;
            } else {
                // First time we see this vowel, so start its count at 1.
                obj[letter] = 1;
            }
        }
        // Non-vowels fall through and are not stored.
    });

    // Example for "Elie": {e: 2, i: 1}
    return obj;
}
