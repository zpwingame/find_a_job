/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;
    
    let i = 0;
    let result = 0;
    let sign = 1;
    
    // Ignore leading whitespace
    while (i < s.length && s[i] === ' ') {
        i++;
    }
    
    // Check for sign
    if (i < s.length && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '+' ? 1 : -1;
        i++;
    }
    
    // Process digits
    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        const digit = s[i].charCodeAt(0) - '0'.charCodeAt(0);
        
        // Check for overflow
        if (result > Math.floor(INT_MAX / 10) || 
            (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }
        
        result = result * 10 + digit;
        i++;
    }
    
    return sign * result;
}

// Test cases
console.log(myAtoi("42"));           // Output: 42
console.log(myAtoi("   -42"));       // Output: -42
console.log(myAtoi("4193 with words")); // Output: 4193
console.log(myAtoi("words and 987")); // Output: 0
console.log(myAtoi("-91283472332")); // Output: -2147483648
