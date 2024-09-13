// 给定四个整数和四种基本数学运算符（+、-、×、/）。允许任意方式对数字进行分组并使用任何运算符，判断是否可以用这四个数字得到24。必须按照给定的顺序处理这些数字。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var judgePoint24 = function(nums) {
    const EPSILON = 1e-6;
    const TARGET = 24;
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => b !== 0 ? a / b : NaN;
    
    function dfs(nums) {
        if (nums.length === 1) {
            return Math.abs(nums[0] - TARGET) < EPSILON;
        }
        
        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; j < nums.length; j++) {
                if (i !== j) {
                    const nextNums = [];
                    for (let k = 0; k < nums.length; k++) {
                        if (k !== i && k !== j) {
                            nextNums.push(nums[k]);
                        }
                    }
                    
                    for (let op of [add, sub, mul, div]) {
                        nextNums.push(op(nums[i], nums[j]));
                        if (dfs(nextNums)) {
                            return true;
                        }
                        nextNums.pop();
                    }
                }
            }
        }
        
        return false;
    }
    
    return dfs(nums);
};

// 测试
console.log(judgePoint24([4, 1, 8, 7])); // 输出: true
console.log(judgePoint24([1, 2, 1, 2])); // 输出: false
