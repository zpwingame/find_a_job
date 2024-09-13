// 今天是教师节，就写一道和大家平时上学时候学的类似的一道数学题吧。同时也祝 福所有的教师节日快乐。
// 根据逆波兰表示法，求表达式的值。有效的算符包括 +、-、*、/ 。每个运算对象可以 是整数，也可以是另一个逆波兰表达式。
// 说明:
// 整数除法只保留整数部分。 给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情 况。
// 示例 1:
// 输入:tokens = ["2","1","+","3","*"]
// 输出:9
// 解释:该算式转化为常见的中缀算术表达式为:((2 + 1) * 3) = 9
// 示例 2:
// 输入:tokens = ["4","13","5","/","+"]
// 输出:6
// 解释:该算式转化为常见的中缀算术表达式为:(4 + (13 / 5)) = 6
// 示例 3:
// 输入:tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"] 输出:22
// 解释:
// 该算式转化为常见的中缀算术表达式为:
// ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// -
// “
// = ((10 * (6 / (12 * -11))) + 17) + 5 = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5 = 22
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)  // Use Math.trunc to keep only the integer part
    };

    for (let token of tokens) {
        if (token in operators) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        } else {
            stack.push(Number(token));
        }
    }

    return stack[0];
};

// Test cases
console.log(evalRPN(["2","1","+","3","*"]));  // Output: 9
console.log(evalRPN(["4","13","5","/","+"]));  // Output: 6
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]));  // Output: 22
