//todo
function reverse(x) {
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;
    
    let reversed = 0;
    
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);
        
        // Check for overflow before adding the new digit
        if (reversed > INT_MAX / 10 || (reversed === INT_MAX / 10 && digit > 7)) return 0;
        if (reversed < INT_MIN / 10 || (reversed === INT_MIN / 10 && digit < -8)) return 0;
        
        reversed = (reversed * 10) + digit;
    }
    
    return reversed;
}

// Test cases
console.log(reverse(123));    // Output: 321
console.log(reverse(-123));   // Output: -321
console.log(reverse(120));    // Output: 21
console.log(reverse(0));      // Output: 0
console.log(reverse(1534236469)); // Output: 0 (overflow)

// If INT_MAX is not known, we can calculate it
const INT_MAX = Math.pow(2, 31) - 1;
const INT_MIN = -Math.pow(2, 31);

function reverse(x) {
    let reversed = 0;
    
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);
        
        // Check for overflow before adding the new digit
        if (reversed > Math.floor(INT_MAX / 10) || (reversed === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)) return 0;
        if (reversed < Math.ceil(INT_MIN / 10) || (reversed === Math.ceil(INT_MIN / 10) && digit < INT_MIN % 10)) return 0;
        
        reversed = (reversed * 10) + digit;
    }
    
    return reversed;
}

// Test cases
console.log(reverse(123));    // Output: 321
console.log(reverse(-123));   // Output: -321
console.log(reverse(120));    // Output: 21
console.log(reverse(0));      // Output: 0
console.log(reverse(1534236469)); // Output: 0 (overflow)
