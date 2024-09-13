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
 * @return {number[][]}
 */
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
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
console.log(levelOrder(root1)); // Expected output: [[3],[9,20],[15,7]]

// Test case 2: [1]
const root2 = new TreeNode(1);
console.log(levelOrder(root2)); // Expected output: [[1]]

// Test case 3: []
console.log(levelOrder(null)); // Expected output: []

// 二叉树的层序遍历
// 二叉树的层序遍历（Binary Tree Level Order Traversal）问题解析：

// 1. 问题描述：
// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

// 2. 解题思路：
// 我们可以使用广度优先搜索（BFS）来解决这个问题：
// - 使用队列来存储每一层的节点
// - 对于每一层，我们先记录队列的长度（即当前层的节点数）
// - 然后将这些节点的值加入结果数组，并将它们的子节点加入队列
// - 重复这个过程直到队列为空

// 3. 时间复杂度：
// - 我们需要访问每个节点一次，因此时间复杂度为O(n)，其中n是节点数

// 4. 空间复杂度：
// - 在最坏情况下（完全二叉树的最底层），队列会同时存储n/2个节点，因此空间复杂度为O(n)

// 5. 注意事项：
// - 需要处理树为空的边界情况
// - 注意区分每一层的节点

// 6. 优化方向：
// - 这个BFS解法已经是较优解了，因为我们必须访问每个节点来完成层序遍历
// - 如果想要节省空间，可以考虑使用DFS（深度优先搜索）来模拟BFS，但实现会更复杂
