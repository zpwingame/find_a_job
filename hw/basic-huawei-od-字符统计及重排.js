// 给出一个仅包含字母的字符串，不包含空格，统计字符串中各个字母（区分大小写）出现的次数，

// 并按照字母出现次数从大到小的顺序。输出各个字母及其出现次数。

// 如果次数相同，按照自然顺序进行排序，且小写字母在大写字母之前。

// 输入描述
// 输入一行，为一个仅包含字母的字符串。

// 输出描述
// 按照字母出现次数从大到小的顺序输出各个字母和字母次数，用英文分号分隔，注意末尾的分号；

// 字母和次数间用英文冒号分隔。
function countAndSortCharacters(str) {
    // Create a map to store character counts
    const charCount = new Map();

    // Count occurrences of each character
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Convert map to array of [char, count] pairs and sort
    const sortedChars = Array.from(charCount.entries()).sort((a, b) => {
        if (a[1] !== b[1]) {
            return b[1] - a[1]; // Sort by count descending
        } else {
            // If counts are equal, sort by natural order
            // Lowercase letters come before uppercase
            return a[0].localeCompare(b[0], undefined, { caseFirst: 'lower' });
        }
    });

    // Format the output
    return sortedChars.map(([char, count]) => `${char}:${count}`).join(';') + ';';
}

// Test the function
function runTest(input) {
    console.log(`Input: ${input}`);
    console.log(`Output: ${countAndSortCharacters(input)}`);
    console.log('---');
}

// Test cases
runTest('xyxyXX');
runTest('abababb');
runTest('helloworld');
