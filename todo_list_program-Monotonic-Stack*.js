/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex;
            // console.log('result=======', result);

        }
        stack.push(i);
        console.log('i=======', i, stack);
    }

    return result;
}

// Test cases
console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // Expected output: [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30,40,50,60])); // Expected output: [1,1,1,0]
console.log(dailyTemperatures([30,60,90])); // Expected output: [1,1,0]

// 单调栈（Monotonic Stack）问题解析：

// 1. 问题描述：
// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，
// 下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。

// 2. 解题思路：
// 使用单调栈来解决这个问题。我们维护一个单调递减的栈，栈中存储的是温度的索引。
// 遍历数组，对于每个温度：
// - 如果栈不为空且当前温度高于栈顶索引对应的温度，就可以得到栈顶元素的结果
// - 将当前索引入栈

// 3. 时间复杂度：
// O(n)，其中 n 是温度数组的长度。每个元素最多被压入和弹出栈一次。

// 4. 空间复杂度：
// O(n)，用于存储结果数组和栈。

// 5. 注意事项：
// - 栈中存储的是索引而不是温度值
// - 需要从数组末尾向前遍历，或者使用逆序的单调栈

// 6. 优化方向：
// - 可以考虑使用数组来模拟栈，可能会有更好的性能
// - 对于特定的输入模式，可以考虑其他的数据结构，如优先队列
