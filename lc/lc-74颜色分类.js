
// 给定一个包含红色、白色和蓝色，一共n个元素的数组，原地对它们进行排序，使得相 同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
// 此题中，我们使用整数0、1和2分别表示红色、白色和蓝色。
// 示例 1:
// 示例 2:
// 示例 3:
// 示例 4:
// 提示:
// n == nums.length 1 <= n <= 300
// 输入:nums = [2,0,2,1,1,0] 输出:[0,0,1,1,2,2]
// 输入:nums = [2,0,1] 输出:[0,1,2]
// 输入:nums = [0] 输出:[0]
// 输入:nums = [1] 输出:[1]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;
    
    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap nums[low] and nums[mid]
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else if (nums[mid] === 2) {
            // Swap nums[mid] and nums[high]
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
};

// Test cases
let nums1 = [2,0,2,1,1,0];
sortColors(nums1);
console.log(nums1); // Expected: [0,0,1,1,2,2]

let nums2 = [2,0,1];
sortColors(nums2);
console.log(nums2); // Expected: [0,1,2]

let nums3 = [0];
sortColors(nums3);
console.log(nums3); // Expected: [0]

let nums4 = [1];
sortColors(nums4);
console.log(nums4); // Expected: [1]
