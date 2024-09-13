/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function mirrorTree(root) {
    if (root === null) {
        return null;
    }
    
    // Swap the left and right children
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    // Recursively mirror the left and right subtrees
    mirrorTree(root.left);
    mirrorTree(root.right);
    
    return root;
}

// Test cases
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// Helper function to create a binary tree from an array
function createBinaryTree(arr) {
    if (arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        if (arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

// Helper function to convert binary tree to array representation
function treeToArray(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    while (result[result.length - 1] === null) {
        result.pop();
    }
    return result;
}

// Test case 1
let root1 = createBinaryTree([4,2,7,1,3,6,9]);
console.log("Original tree:", treeToArray(root1));
let mirrored1 = mirrorTree(root1);
console.log("Mirrored tree:", treeToArray(mirrored1));

// Test case 2
let root2 = createBinaryTree([2,1,3]);
console.log("Original tree:", treeToArray(root2));
let mirrored2 = mirrorTree(root2);
console.log("Mirrored tree:", treeToArray(mirrored2));

// Test case 3
let root3 = createBinaryTree([]);
console.log("Original tree:", treeToArray(root3));
let mirrored3 = mirrorTree(root3);
console.log("Mirrored tree:", treeToArray(mirrored3));

// 题目：二叉树的镜像
// 请完成一个函数，输入一个二叉树，该函数输出它的镜像。

// 解题思路：
// 1. 使用递归方法解决这个问题
// 2. 如果树为空（root === null），直接返回 null
// 3. 否则，交换当前节点的左右子树
// 4. 递归地对左子树和右子树进行镜像操作
// 5. 返回根节点

// 时间复杂度：O(n)，其中 n 是树中的节点数。我们遍历树中的每个节点一次。
// 空间复杂度：O(h)，其中 h 是树的高度。这是由于递归调用栈的开销，
// 最坏情况下（树呈现链状）空间复杂度为 O(n)。

// 注意：这个解法会修改原二叉树的结构。如果需要保持原二叉树不变，
// 可以在镜像过程中创建新的节点。
