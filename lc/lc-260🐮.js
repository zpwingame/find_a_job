
// 给你一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。找出只出现一次的那两个元素。你可以按 任意顺序返回答案。



// 你必须设计并实现线性时间复杂度的算法且仅使用常量额外空间来解决此问题。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    // Step 1: XOR all numbers
    let xorResult = 0;
    for (let num of nums) {
        xorResult ^= num;
    }
    
    // Step 2: Find the rightmost set bit
    let rightmostSetBit = 1;
    while ((xorResult & rightmostSetBit) === 0) {
        rightmostSetBit <<= 1;
    }
    
    // Step 3: Divide numbers into two groups
    let num1 = 0, num2 = 0;
    for (let num of nums) {
        if ((num & rightmostSetBit) !== 0) {
            num1 ^= num;
        } else {
            num2 ^= num;
        }
    }
    
    return [num1, num2];
};

// Test cases
console.log(singleNumber([1,2,1,3,2,5])); // Expected output: [3,5]
console.log(singleNumber([-1,0])); // Expected output: [-1,0]
console.log(singleNumber([0,1])); // Expected output: [1,0]
