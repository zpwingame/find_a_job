
// 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。 整数除法仅保留整数部分。
// 示例 1:
// 示例 2:
// 示例 3:
// 输入:s = "3+2*2" 输出:7
// 输入:s = " 3/2 " 输出:1
// 输入:s = " 3+5 / 2 " 输出:5
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    s = s.replace(/\s/g, ''); // Remove all whitespace
    const stack = [];
    let currentNumber = 0;
    let operation = '+';
    
    for (let i = 0; i <= s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            currentNumber = currentNumber * 10 + parseInt(char);
        }
        
        if ((!char || '+-*/'.includes(char)) && i < s.length + 1) {
            if (operation === '+') {
                stack.push(currentNumber);
            } else if (operation === '-') {
                stack.push(-currentNumber);
            } else if (operation === '*') {
                stack.push(stack.pop() * currentNumber);
            } else if (operation === '/') {
                stack.push(Math.trunc(stack.pop() / currentNumber));
            }
            
            operation = char;
            currentNumber = 0;
        }
    }
    
    return stack.reduce((sum, num) => sum + num, 0);
};

// Test cases
console.log(calculate("3+2*2")); // Output: 7
console.log(calculate(" 3/2 ")); // Output: 1
console.log(calculate(" 3+5 / 2 ")); // Output: 5
