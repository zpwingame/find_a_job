// 题目描述
// 1、输入一个英文句子，句子中包含若干个单词，每个单词间有一个空格；

// 2、需要将句子中的每个单词按照要求加密输出。

// 要求：

// 1）单词中包括元音字符（‘aeuio’、‘AEUIO’，大小写都算），则将元音字符替换成‘*’

// 2）单词中不包括元音字符，将单词首尾字符进行对换

// 输入描述
// 输入只有一行，包含一个长度都不超过100的字符串，表示英文句子。

// 输出描述
// 输出只有一行，即按要求输出加密处理后的英文句子
function encryptSentence(sentence) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    
    return sentence.split(' ').map(word => {
        if (word.split('').some(char => vowels.has(char))) {
            return word.replace(/[aeiouAEIOU]/g, '*');
        } else {
            return word.length > 1 ? 
                word[word.length - 1] + word.slice(1, -1) + word[0] : 
                word;
        }
    }).join(' ');
}

// Test function
function runTests() {
    const testCases = [
        { input: "hello world", expected: "h*ll* w*rld" },
        { input: "cpp java python", expected: "ppc j*v* pyth*n" },
        { input: "bcd fgh", expected: "dcb hgf" },
        { input: "a b c d e", expected: "* b c d *" }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: "${testCase.input}"`);
        const result = encryptSentence(testCase.input);
        console.log(`Output: "${result}"`);
        console.log(`Expected: "${testCase.expected}"`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// Run the tests
runTests();
