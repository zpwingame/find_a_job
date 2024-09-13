// You are given an array of CPU tasks, each represented by letters A to Z, and a cooling time, n. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least n intervals due to cooling time.

// ​Return the minimum number of intervals required to complete all tasks.

 

// Example 1:

// Input: tasks = ["A","A","A","B","B","B"], n = 2

// Output: 8

// Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.

// After completing task A, you must wait two cycles before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th cycle, you can do A again as 2 intervals have passed.

// Example 2:

// Input: tasks = ["A","C","A","B","D","B"], n = 1

// Output: 6

// Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.

// With a cooling interval of 1, you can repeat a task after just one other task.

// Example 3:

// Input: tasks = ["A","A","A", "B","B","B"], n = 3

// Output: 10

// Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.

// There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.

/*
给定一个 CPU 任务数组，每个任务由字母 A 到 Z 表示，以及一个冷却时间 n。每个周期或间隔允许完成一个任务。任务可以以任何顺序完成，但有一个限制：相同的任务之间必须至少间隔 n 个间隔，因为需要冷却时间。

返回完成所有任务所需的最小间隔数。

示例 1：

输入：tasks = ["A","A","A","B","B","B"], n = 2

输出：8

解释：一个可能的序列是：A -> B -> 空闲 -> A -> B -> 空闲 -> A -> B。
完成任务 A 后，你必须等待两个周期才能再次执行 A。对任务 B 也是如此。在第 3 个间隔，既不能执行 A 也不能执行 B，所以你空闲。到第 4 个周期，你可以再次执行 A，因为已经过去了 2 个间隔。

示例 2：

输入：tasks = ["A","C","A","B","D","B"], n = 1

输出：6

解释：一个可能的序列是：A -> B -> C -> D -> A -> B。
冷却间隔为 1，你可以在执行一个其他任务后立即重复一个任务。

示例 3：

输入：tasks = ["A","A","A", "B","B","B"], n = 3

输出：10

解释：一个可能的序列是：A -> B -> 空闲 -> 空闲 -> A -> B -> 空闲 -> 空闲 -> A -> B。
只有两种类型的任务，A 和 B，它们需要被 3 个间隔分开。这导致在这些任务的重复之间需要空闲两次。
*/

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    // 统计每个任务的频率
    const freq = new Array(26).fill(0);
    for (let task of tasks) {
        freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
    }
    
    // 找出最大频率
    const maxFreq = Math.max(...freq);
    
    // 计算具有最大频率的任务数量
    let maxCount = 0;
    for (let f of freq) {
        if (f === maxFreq) {
            maxCount++;
        }
    }
    
    // 计算最小间隔数
    return Math.max((maxFreq - 1) * (n + 1) + maxCount, tasks.length);
};

// 测试用例
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 输出：8
console.log(leastInterval(["A","C","A","B","D","B"], 1)); // 输出：6
console.log(leastInterval(["A","A","A","B","B","B"], 3)); // 输出：10
