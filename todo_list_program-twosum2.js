// two pointer approach for Two Sum problem
function twoSum(nums, target) {
    const sortedNums = [...nums].sort((a, b) => a - b);
    let left = 0;
    let right = sortedNums.length - 1;

    while (left < right) {
        const sum = sortedNums[left] + sortedNums[right];
        if (sum === target) {
            return [sortedNums[left], sortedNums[right]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return null; // return null if no pair is found
}
// Hash table approach for Two Sum problem
function twoSumHash(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [complement, nums[i]];
        }
        numMap.set(nums[i], i);
    }
    
    return null; // return null if no pair is found
}

// Test cases
console.log(twoSumHash([2, 7, 11, 15], 9)); // Expected output: [2, 7]
console.log(twoSumHash([3, 2, 4], 6)); // Expected output: [2, 4]
console.log(twoSumHash([3, 3], 6)); // Expected output: [3, 3]
console.log(twoSumHash([1, 2, 3, 4, 5], 10)); // Expected output: null
