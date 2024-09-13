/**
 * @param {number[]} numbers
 * @return {number}
 */
function minArray(numbers) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        if (numbers[mid] > numbers[right]) {
            // The minimum element is in the right half
            left = mid + 1;
        } else if (numbers[mid] < numbers[right]) {
            // The minimum element is in the left half, including mid
            right = mid;
        } else {
            // When numbers[mid] equals numbers[right], we can't determine which half to search
            // So we decrease right by 1
            right--;
        }
    }
    
    return numbers[left];
}

// Test cases
console.log(minArray([3,4,5,1,2])); // Expected output: 1
console.log(minArray([2,2,2,0,1])); // Expected output: 0
console.log(minArray([1,3,5])); // Expected output: 1

// 题目：旋转数组的最小数字
// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
// 给你一个可能存在重复元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。
// 请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为 1。

// 解题思路：
// 1. 使用二分查找的变体来解决这个问题
// 2. 初始化两个指针 left 和 right，分别指向数组的开始和结束
// 3. 当 left < right 时，计算中间索引 mid
// 4. 比较 numbers[mid] 和 numbers[right]：
//    - 如果 numbers[mid] > numbers[right]，最小值在右半部分，更新 left = mid + 1
//    - 如果 numbers[mid] < numbers[right]，最小值在左半部分（包括 mid），更新 right = mid
//    - 如果 numbers[mid] == numbers[right]，无法确定最小值在哪半部分，将 right 减 1
// 5. 循环结束后，left 指向的就是最小值

// 时间复杂度：O(log n)，其中 n 是数组的长度。在最坏情况下（数组中所有元素相等），可能退化到 O(n)。
// 空间复杂度：O(1)，只使用了常数级别的额外空间。

// 注意：这个解法可以处理包含重复元素的情况，这是它与标准二分查找的主要区别。
