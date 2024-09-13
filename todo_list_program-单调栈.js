// first
function nextGreaterElements(nums) {
    const stack = [];
    const result = new Array(nums.length).fill(-1);

    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }

    return result;
}
