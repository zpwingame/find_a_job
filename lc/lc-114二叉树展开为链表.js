
// 给你二叉树的根结点root，请你将它展开为一个单链表: 展开后的单链表应该同样使用TreeNode，其中right子指针指向链表中下一个结点， 而左子指针始终为null。
// 展开后的单链表应该与二叉树先序遍历顺序相同。
/**
 * Definition for a binary tree node.
//  * function TreeNode(val, left, right) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.left = (left===undefined ? null : left)
//  *     this.right = (right===undefined ? null : right)
//  * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    if (!root) return;
    
    let current = root;
    while (current) {
        if (current.left) {
            let rightmost = current.left;
            while (rightmost.right) {
                rightmost = rightmost.right;
            }
            rightmost.right = current.right;
            current.right = current.left;
            current.left = null;
        }
        current = current.right;
    }
};

// Test cases
function createBinaryTree(arr) {
    if (!arr.length) return null;
    let root = new TreeNode(arr[0]);
    let queue = [root];
    for (let i = 1; i < arr.length; i += 2) {
        let current = queue.shift();
        if (arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        if (i + 1 < arr.length && arr[i + 1] !== null) {
            current.right = new TreeNode(arr[i + 1]);
            queue.push(current.right);
        }
    }
    return root;
}

function printFlattenedTree(root) {
    let result = [];
    while (root) {
        result.push(root.val);
        root = root.right;
    }
    console.log(result.join(' -> '));
}

// Test case 1
let root1 = createBinaryTree([1,2,5,3,4,null,6]);
console.log("Input:");
printFlattenedTree(root1);
flatten(root1);
console.log("Output:");
printFlattenedTree(root1);

// Test case 2
let root2 = createBinaryTree([]);
console.log("\nInput:");
printFlattenedTree(root2);
flatten(root2);
console.log("Output:");
printFlattenedTree(root2);

// Test case 3
let root3 = createBinaryTree([0]);
console.log("\nInput:");
printFlattenedTree(root3);
flatten(root3);
console.log("Output:");
printFlattenedTree(root3);
