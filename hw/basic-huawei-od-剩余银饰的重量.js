// 题目描述
// 有 N 块二手市场收集的银饰，每块银饰的重量都是正整数，收集到的银饰会被熔化用于打造新的饰品。

// 每一回合，从中选出三块最重的银饰，然后一起熔掉。

// 假设银饰的重量分别为 x 、y和z，且 x ≤ y ≤ z。那么熔掉的可能结果如下：

// 如果 x == y == z，那么三块银饰都会被完全熔掉；
// 如果 x == y 且 y != z，会剩余重量为 z - y 的银块无法被熔掉；
// 如果 x != y 且 y == z，会剩余重量为 y - x 的银块无法被熔掉；
// 如果 x != y 且 y != z，会剩余重量为 z - y 与 y - x 差值 的银块无法被熔掉。
// 最后，

// 如果剩余两块，返回较大的重量（若两块重量相同，返回任意一块皆可）
// 如果只剩下一块，返回该块的重量
// 如果没有剩下，就返回 0
// 输入描述
// 输入数据为两行：

// 第一行为银饰数组长度 n，1 ≤ n ≤ 40，
// 第二行为n块银饰的重量，重量的取值范围为[1，2000]，重量之间使用空格隔开
// 输出描述
// 如果剩余两块，返回较大的重量（若两块重量相同，返回任意一块皆可）；

// 如果只剩下一块，返回该块的重量；

// 如果没有剩下，就返回 0。

function remainingSilver(n, weights) {
    // Convert weights to a max heap
    let heap = new MaxHeap(weights);

    while (heap.size() >= 3) {
        let z = heap.pop();
        let y = heap.pop();
        let x = heap.pop();

        if (x === y && y === z) {
            continue;
        } else if (x === y) {
            heap.push(z - y);
        } else if (y === z) {
            heap.push(y - x);
        } else {
            heap.push(z - y);
            heap.push(y - x);
        }
    }

    if (heap.size() === 2) {
        return Math.max(heap.pop(), heap.pop());
    } else if (heap.size() === 1) {
        return heap.pop();
    } else {
        return 0;
    }
}

class MaxHeap {
    constructor(array) {
        this.heap = [];
        array.forEach(item => this.push(item));
    }

    push(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return max;
    }

    size() {
        return this.heap.length;
    }

    bubbleUp(index) {
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element <= parent) break;
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild > element) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild > element) ||
                    (swap !== null && rightChild > leftChild)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

// Test function
function runTests() {
    const testCases = [
        { n: 5, weights: [3, 5, 2, 6, 4], expected: 1 },
        { n: 6, weights: [1, 1, 1, 1, 1, 1], expected: 0 },
        { n: 3, weights: [10, 10, 10], expected: 0 },
        { n: 4, weights: [5, 5, 5, 5], expected: 5 },
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: n = ${testCase.n}, weights = [${testCase.weights.join(', ')}]`);
        const result = remainingSilver(testCase.n, testCase.weights);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// Run the tests
runTests();
