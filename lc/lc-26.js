// 给你一个有序数组nums ，请你原地删除重复出现的元素，使每个元素只出现一次 ，返回删除后数组的新长度。



// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用O(1)额外空间的条件下完成。
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let uniqueIndex = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[uniqueIndex]) {
            uniqueIndex++;
            nums[uniqueIndex] = nums[i];
            console.log(nums)
        }
    }

    return uniqueIndex + 1;
}

let a = [0,0,1,1,1,2,2,3,3,4]
let result = removeDuplicates(a)
// console.log(result, a)
console.log(result, a)

// Test cases
let testCases = [
    { input: [1, 1, 2], expected: [1, 2] },
    { input: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4], expected: [0, 1, 2, 3, 4] },
    { input: [], expected: [] },
    { input: [1, 2, 3], expected: [1, 2, 3] },
    { input: [1, 1, 1, 1, 1], expected: [1] }
];

testCases.forEach(({ input, expected }) => {
    let length = removeDuplicates(input);
    let result = input.slice(0, length);
    console.log(`Input: ${input}, Expected: ${expected}, Result: ${result}, Passed: ${JSON.stringify(result) === JSON.stringify(expected)}`);
});



