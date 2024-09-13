/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const s1Count = new Array(26).fill(0);
    const windowCount = new Array(26).fill(0);
    
    // Count characters in s1
    for (let i = 0; i < s1.length; i++) {
        s1Count[s1.charCodeAt(i) - 97]++;
        windowCount[s2.charCodeAt(i) - 97]++;
    }
    
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (s1Count[i] === windowCount[i]) matches++;
    }
    
    let left = 0;
    for (let right = s1.length; right < s2.length; right++) {
        if (matches === 26) return true;
        
        let index = s2.charCodeAt(right) - 97;
        windowCount[index]++;
        if (s1Count[index] === windowCount[index]) matches++;
        else if (s1Count[index] + 1 === windowCount[index]) matches--;
        
        index = s2.charCodeAt(left) - 97;
        windowCount[index]--;
        if (s1Count[index] === windowCount[index]) matches++;
        else if (s1Count[index] - 1 === windowCount[index]) matches--;
        
        left++;
    }
    
    return matches === 26;
}

// Test cases
console.log(checkInclusion("ab", "eidbaooo")); // Expected output: true
console.log(checkInclusion("ab", "eidboaoo")); // Expected output: false

// 字符串的排列（Permutation in String）问题解析：

// 1. 问题描述：
// 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
// 换句话说，第一个字符串的排列之一是第二个字符串的子串。

// 2. 解题思路：
// 使用滑动窗口法。我们维护一个固定大小的窗口（大小为s1的长度），
// 在s2上滑动这个窗口，检查每个窗口是否包含s1的所有字符。

// 3. 时间复杂度：
// O(n)，其中n是s2的长度。我们只需要遍历一次s2。

// 4. 空间复杂度：
// O(1)，我们使用了固定大小的数组来存储字符计数。

// 5. 注意事项：
// - 使用数组来存储字符计数，而不是哈希表，可以提高效率
// - 使用matches变量来跟踪匹配的字符数，避免每次都比较整个数组

// 6. 优化方向：
// - 可以在开始时快速检查s1的长度是否大于s2，如果是，直接返回false
// - 如果字符集较大，可以考虑使用哈希表而不是固定大小的数组
// Another solution using a sliding window with a map

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const charCount = new Map();
    
    // Count characters in s1
    for (let char of s1) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    let left = 0;
    let right = 0;
    let requiredChars = charCount.size;
    
    while (right < s2.length) {
        // Expand the window
        let char = s2[right];
        if (charCount.has(char)) {
            charCount.set(char, charCount.get(char) - 1);
            if (charCount.get(char) === 0) requiredChars--;
        }
        
        // Check if we have a valid permutation
        if (right - left + 1 === s1.length) {
            if (requiredChars === 0) return true;
            
            // Contract the window
            char = s2[left];
            if (charCount.has(char)) {
                if (charCount.get(char) === 0) requiredChars++;
                charCount.set(char, charCount.get(char) + 1);
            }
            left++;
        }
        
        right++;
    }
    
    return false;
}

// Test cases
console.log(checkInclusion("ab", "eidbaooo")); // Expected output: true
console.log(checkInclusion("ab", "eidboaoo")); // Expected output: false

// This solution uses a Map instead of an array to count characters.
// It's more flexible for larger character sets and doesn't assume
// only lowercase English letters.

// Time Complexity: O(n), where n is the length of s2
// Space Complexity: O(k), where k is the size of the character set in s1

// The main differences from the previous solution:
// 1. Uses a Map instead of an array for character counting
// 2. Doesn't require pre-processing of the entire s2 string
// 3. More flexible with different character sets
// 4. Slightly different logic for expanding and contracting the window
