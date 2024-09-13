//todo
// Function to find the longest palindromic substring
function longestPalindrome(s) {
    let start = 0, end = 0;

    for (let i = 0; i < s.length; i++) {
        // Check for odd-length palindromes
        let len1 = expandAroundCenter(s, i, i);
        // Check for even-length palindromes
        let len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len2);
        
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
}

// Helper function to expand around the center
function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

// Test case
const testString = "babad";
console.log(`Input: "${testString}"`);
console.log(`Longest palindromic substring: "${longestPalindrome(testString)}"`);

// Additional test cases
const testCases = [
    "cbbd",
    "a",
    "ac",
    "racecar",
    "bananas"
];

testCases.forEach(test => {
    console.log(`\nInput: "${test}"`);
    console.log(`Longest palindromic substring: "${longestPalindrome(test)}"`);
});

