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
 * @return {number}
 */
function minDepth(root) {
    if (root === null) {
        return 0;
    }
    
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    if (root.left === null) {
        return minDepth(root.right) + 1;
    }
    
    if (root.right === null) {
        return minDepth(root.left) + 1;
    }
    
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}

// Test cases
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// Test case 1: [3,9,20,null,null,15,7]
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);
console.log(minDepth(root1)); // Expected output: 2

// Test case 2: [2,null,3,null,4,null,5,null,6]
const root2 = new TreeNode(2);
root2.right = new TreeNode(3);
root2.right.right = new TreeNode(4);
root2.right.right.right = new TreeNode(5);
root2.right.right.right.right = new TreeNode(6);
console.log(minDepth(root2)); // Expected output: 5

// Test case 3: []
console.log(minDepth(null)); // Expected output: 0

// 二叉树的最小深度
// 二叉树的最小深度（Minimum Depth of Binary Tree）问题解析：

// 1. 问题描述：
// 给定一个二叉树，找出其最小深度。
// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

// 2. 解题思路：
// 我们可以使用递归的方法来解决这个问题：
// - 如果树为空，深度为0
// - 如果树只有根节点，深度为1
// - 如果树的左子树为空，返回右子树的最小深度加1
// - 如果树的右子树为空，返回左子树的最小深度加1
// - 如果左右子树都不为空，返回左右子树的最小深度的较小值加1

// 3. 时间复杂度：
// - 我们访问每个节点一次，因此时间复杂度为O(n)，其中n是节点数

// 4. 空间复杂度：
// - 在最坏情况下（树完全不平衡），递归会调用n次（树的高度），因此需要O(n)的栈空间
// - 在最好情况下（树完全平衡），树的高度为log(n)，因此空间复杂度为O(log(n))

// 5. 注意事项：
// - 需要处理树为空的边界情况
// - 需要特别处理只有一个子树的情况，这是与最大深度问题的主要区别

// 6. 优化方向：
// - 这个递归解法已经是较优解了，因为我们必须访问每个节点至少一次
// - 如果想要避免递归，可以使用迭代方法（如层序遍历）来解决，但时间复杂度仍然是O(n)
