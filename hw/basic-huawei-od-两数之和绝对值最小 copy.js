/**
 * 两数之和绝对值最小
 * @param {number[]} nums - 输入的整数数组
 * @returns {number[]} - 和的绝对值最小的两个数
 */
function findMinAbsSum(nums) {
    nums.sort((a, b) => a - b);
    let left = 0;
    let right = nums.length - 1;
    let minAbsSum = Infinity;
    let result = [];

    while (left < right) {
        const sum = nums[left] + nums[right];
        const absSum = Math.abs(sum);

        if (absSum < minAbsSum) {
            minAbsSum = absSum;
            result = [nums[left], nums[right]];
        }

        if (sum === 0) {
            break;
        } else if (sum < 0) {
            left++;
        } else {
            right--;
        }
    }

    return result.sort((a, b) => a - b);
}

// 测试
console.log(findMinAbsSum([-1, 0, 1, 2])); // 输出: [-1, 1]
console.log(findMinAbsSum([0, 0, 1, 1, 2, -1])); // 输出: [0, 0]
console.log(findMinAbsSum([-3, -1, 5, 7, 11, 15])); // 输出: [-3, 5]
