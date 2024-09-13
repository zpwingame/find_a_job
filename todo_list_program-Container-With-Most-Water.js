/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        // Calculate the area
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const area = width * minHeight;
        
        // Update maxArea if current area is larger
        maxArea = Math.max(maxArea, area);
        
        // Move the pointer of the shorter line inward
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
};

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected output: 49
console.log(maxArea([1,1])); // Expected output: 1

// Explanation:
// This solution uses the two-pointer technique to solve the Container With Most Water problem.
// 1. We initialize two pointers, left and right, at the start and end of the array.
// 2. We calculate the area between these two lines and keep track of the maximum area.
// 3. We move the pointer that points to the shorter line inward, as moving the taller line would only decrease the area.
// 4. We continue this process until the pointers meet.
// 5. The maximum area encountered during this process is our result.

// Time complexity: O(n), where n is the length of the height array.
// Space complexity: O(1), as we only use a constant amount of extra space.

// 盛最多水的容器 (Container With Most Water)

// 题目描述：
// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
// 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 说明：你不能倾斜容器。

// 示例：
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

// 示例 2：
// 输入：height = [1,1]
// 输出：1
