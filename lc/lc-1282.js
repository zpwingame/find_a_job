// 有 n 个人被分成数量未知的组。

// 每个人都被标记为一个从 0 到 n-1 的唯一 ID 。

// 给定一个整数数组 groupSizes，其中 groupSizes[i] 是第 i 个人所在的组的大小。

// 例如，如果 groupSizes[1] = 3，则第 1 个人必须位于大小为 3 的组中。

// 返回一个组列表，使每个人 i 都在一个大小为 groupSizes[i] 的组中。

// 每个人应该恰好只出现在一个组中，并且每个人必须在一个组中。

// 如果有多个答案，返回其中任何一个。可以保证给定输入至少有一个有效的解。

// 示例 1：

// 输入：groupSizes = [3,3,3,3,3,1,3]

// 输出：[[5],[0,1,2],[3,4,6]]

// 解释：
// 第一组是 [5]，大小为 1，groupSizes[5] = 1。
// 第二组是 [0,1,2]，大小为 3，groupSizes[0] = groupSizes[1] = groupSizes[2] = 3。
// 第三组是 [3,4,6]，大小为 3，groupSizes[3] = groupSizes[4] = groupSizes[6] = 3。 
// 其他可能的解决方案有 [[2,1,6],[5],[0,4,3]] 和 [[5],[0,6,2],[4,3,1]]。
// 示例 2：

// 输入：groupSizes = [2,1,3,3,3,2]

// 输出：[[1],[0,5],[2,3,4]]
/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function(groupSizes) {
    const groups = new Map();
    const result = [];

    for (let i = 0; i < groupSizes.length; i++) {
        const size = groupSizes[i];
        if (!groups.has(size)) {
            groups.set(size, []);
        }
        groups.get(size).push(i);

        if (groups.get(size).length === size) {
            result.push(groups.get(size));
            groups.set(size, []);
        }
    }

    return result;
};

// Test cases
console.log(groupThePeople([3,3,3,3,3,1,3])); // Expected output: [[5],[0,1,2],[3,4,6]] or any valid grouping
console.log(groupThePeople([2,1,3,3,3,2])); // Expected output: [[1],[0,5],[2,3,4]] or any valid grouping
