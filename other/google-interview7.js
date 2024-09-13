// Given an array, return an array where the each value is the product of the next two items: E.g. [3, 4, 5] -> [20, 15, 12]
// function test(arr) {
//     let result = [];
//     for(var i=0; i< arr.length; i++) {
//         console.log(...arr.slice(0,i), ...arr.slice(i+1))

//         result.push(multiply(...arr.slice(0,i), ...arr.slice(i+1)))
//         // console.log(result)
//     }
//     console.log(result)
// }
// function multiply(a,b ) {
//     return a * b
// }
// test([3,4,5])
function productOfNextTwo(arr) {
    if (arr.length < 2) {
        return [];
    }

    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const nextIndex = (i + 1) % arr.length;
        const nextNextIndex = (i + 2) % arr.length;
        result.push(arr[nextIndex] * arr[nextNextIndex]);
    }

    return result;
}

// Test the function
console.log(productOfNextTwo([3, 4, 5])); // Output: [20, 15, 12]
console.log(productOfNextTwo([1, 2, 3, 4, 5])); // Output: [6, 12, 20, 5, 8]
