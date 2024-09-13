/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
    if (root === null) {
        return false;
    }
    
    // If it's a leaf node and its value equals the remaining sum
    if (root.left === null && root.right === null && root.val === targetSum) {
        return true;
    }
    
    // Recursively check left and right subtrees
    return hasPathSum(root.left, targetSum - root.val) || 
           hasPathSum(root.right, targetSum - root.val);
}

// Test cases
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// Test case 1: [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
const root1 = new TreeNode(5);
root1.left = new TreeNode(4);
root1.right = new TreeNode(8);
root1.left.left = new TreeNode(11);
root1.left.left.left = new TreeNode(7);
root1.left.left.right = new TreeNode(2);
root1.right.left = new TreeNode(13);
root1.right.right = new TreeNode(4);
root1.right.right.right = new TreeNode(1);
console.log(hasPathSum(root1, 22)); // Expected output: true

// Test case 2: [1,2,3], targetSum = 5
const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);
console.log(hasPathSum(root2, 5)); // Expected output: false

// Test case 3: [], targetSum = 0
console.log(hasPathSum(null, 0)); // Expected output: false

// 路径总和
// 路径总和（Path Sum）问题解析：

// 1. 问题描述：
// 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

// 2. 解题思路：
// 我们可以使用递归的方法来解决这个问题：
// - 如果树为空，返回false
// - 如果当前节点是叶子节点，检查其值是否等于剩余的目标和
// - 对于非叶子节点，递归检查其左右子树，目标和减去当前节点的值

// 3. 时间复杂度：
// - 我们在最坏情况下需要访问所有节点，因此时间复杂度为O(n)，其中n是节点数

// 4. 空间复杂度：
// - 在最坏情况下（树完全不平衡），递归调用会发生n次（树的高度），因此空间复杂度为O(n)
// - 在最好情况下（树完全平衡），树的高度为log(n)，因此空间复杂度为O(log n)

// 5. 注意事项：
// - 需要处理树为空的边界情况
// - 路径必须是从根节点到叶子节点，中间路径不算

// 6. 优化方向：
// - 这个递归解法已经是较优解了，因为我们必须检查每个可能的路径
// - 如果想要避免递归，可以使用迭代方法（如使用栈）来解决，但时间复杂度仍然是O(n)
