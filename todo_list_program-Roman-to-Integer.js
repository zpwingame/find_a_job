/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
    const romanValues = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let result = 0;
    
    for (let i = 0; i < s.length; i++) {
        const currentValue = romanValues[s[i]];
        const nextValue = romanValues[s[i + 1]];
        
        if (nextValue && currentValue < nextValue) {
            result += nextValue - currentValue;
            i++; // Skip the next character as we've already considered it
        } else {
            result += currentValue;
        }
    }
    
    return result;
}

// Test cases
console.log(romanToInt("III")); // Output: 3
console.log(romanToInt("LVIII")); // Output: 58
console.log(romanToInt("MCMXCIV")); // Output: 1994
