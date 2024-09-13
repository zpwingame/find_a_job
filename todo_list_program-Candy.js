/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    const n = ratings.length;
    const candies = new Array(n).fill(1);
    
    // Forward pass
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i-1]) {
            candies[i] = candies[i-1] + 1;
        }
    }
    
    // Backward pass
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i+1] && candies[i] <= candies[i+1]) {
            candies[i] = candies[i+1] + 1;
        }
    }
    
    // Sum up all candies
    return candies.reduce((sum, num) => sum + num, 0);
};

// Test cases
console.log(candy([1,0,2])); // Expected output: 5
console.log(candy([1,2,2])); // Expected output: 4

// Explanation:
// This solution solves the "Candy" problem using a two-pass approach.
// 1. Initialize an array 'candies' with 1 candy for each child.
// 2. Forward pass: Ensure children with higher ratings than their left neighbor get more candies.
// 3. Backward pass: Ensure children with higher ratings than their right neighbor get more candies.
// 4. Sum up all candies and return the result.

// Time complexity: O(n), where n is the number of children.
// Space complexity: O(n) to store the candies array.

// 分发糖果 (Candy)

// 题目描述：
// n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
// 你需要按照以下要求，给这些孩子分发糖果：
// - 每个孩子至少分配到 1 个糖果。
// - 相邻两个孩子评分更高的孩子会获得更多的糖果。
// 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

// 示例 1：
// 输入：ratings = [1,0,2]
// 输出：5
// 解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。

// 示例 2：
// 输入：ratings = [1,2,2]
// 输出：4
// 解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
//      第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
