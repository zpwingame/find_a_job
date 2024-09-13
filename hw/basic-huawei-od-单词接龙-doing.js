// 题目描述
// 单词接龙的规则是：

// 可用于接龙的单词首字母必须要前一个单词的尾字母相同；
// 当存在多个首字母相同的单词时，取长度最长的单词，如果长度也相等，则取字典序最小的单词；已经参与接龙的单词不能重复使用。
// 现给定一组全部由小写字母组成单词数组，并指定其中的一个单词作为起始单词，进行单词接龙，
// 请输出最长的单词串，单词串是单词拼接而成，中间没有空格。
// 输入描述
// 输入的第一行为一个非负整数，表示起始单词在数组中的索引K，0 <= K < N ；
// 输入的第二行为一个非负整数，表示单词的个数N；
// 接下来的N行，分别表示单词数组中的单词。
// 备注：

// 单词个数N的取值范围为[1, 20]；
// 单个单词的长度的取值范围为[1, 30]；
// 输出描述
// 输出一个字符串，表示最终拼接的单词串。
function wordChain(startIndex, words) {
    // Sort words by length (descending) and then alphabetically
    words.sort((a, b) => b.length - a.length || a.localeCompare(b));

    let result = words[startIndex];
    let used = new Set([startIndex]);

    while (true) {
        let lastChar = result[result.length - 1];
        let found = false;

        for (let i = 0; i < words.length; i++) {
            if (!used.has(i) && words[i][0] === lastChar) {
                result += words[i];
                used.add(i);
                found = true;
                break;
            }
        }

        if (!found) break;
    }

    return result;
}

// Test function
function runTests() {
    const testCases = [
        {
            startIndex: 0,
            words: ['word', 'dd', 'da', 'dc', 'dword', 'dwordx'],
            expected: 'worddwordxdc'
        },
        {
            startIndex: 1,
            words: ['abc', 'cba', 'cab', 'bca', 'acb'],
            expected: 'cbabc'
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Start Index: ${testCase.startIndex}`);
        console.log(`Words: [${testCase.words.join(', ')}]`);
        const result = wordChain(testCase.startIndex, testCase.words);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// Run the tests
runTests();
