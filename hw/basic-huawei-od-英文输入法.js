// 题目描述
// 主管期望你来实现英文输入法单词联想功能。

// 需求如下：

// 依据用户输入的单词前缀，从已输入的英文语句中联想出用户想输入的单词，按字典序输出联想到的单词序列，
// 如果联想不到，请输出用户输入的单词前缀。
// 注意：

// 英文单词联想时，区分大小写
// 缩略形式如”don’t”，判定为两个单词，”don”和”t”
// 输出的单词序列，不能有重复单词，且只能是英文单词，不能有标点符号
// 输入描述
// 输入为两行。

// 首行输入一段由英文单词word和标点符号组成的语句str；

// 接下来一行为一个英文单词前缀pre。

// 0 < word.length() <= 20
// 0 < str.length <= 10000
// 0 < pre <= 20
// 输出描述
// 输出符合要求的单词序列或单词前缀，存在多个时，单词之间以单个空格分割

// 用例
// 输入	I love you
// He
// 输出	He
// 说明	
// 从用户已输入英文语句”I love you”中提炼出“I”、“love”、“you”三个单词，接下来用户输入“He”，

// 从已输入信息中无法联想到任何符合要求的单词，因此输出用户输入的单词前缀。

// 输入	
// The furthest distance in the world, Is not between life and death, But when I stand in front of you, Yet you don't know that I love you.

// f

// 输出	front furthest
// 说明	从用户已输入英文语句”The furthestdistance in the world, Is not between life and death, But when I stand in frontof you, Yet you dont know that I love you.”中提炼出的单词，符合“f”作为前缀的，有“furthest”和“front”，按字典序排序并在单词间添加空格后输出，结果为“front furthest”。
// 题目解析
// 简单的逻辑题，应该是主要考察数组去重，数组字典排序，过滤等知识
/**
 * 英文输入法单词联想功能
 * @param {string} str - 输入的英文语句
 * @param {string} pre - 输入的单词前缀
 * @returns {string} - 联想到的单词序列或单词前缀
 */
function wordAssociation(str, pre) {
    // 将输入的语句分割成单词，并去除标点符号
    const words = str.match(/[a-zA-Z']+/g) || [];
    
    // 过滤出以前缀开头的单词，并处理缩略形式
    let filteredWords = words.flatMap(word => {
        if (word.includes("'")) {
            return word.split("'");
        }
        return word;
    }).filter(word => word.startsWith(pre));
    console.log(words.flatMap(word => {
        if (word.includes("'")) {
            return word.split("'");
        }
        return word;
    }))
    // filteredWords = filteredWords.filter(word => word.startsWith(pre));

    
    // 去重并按字典序排序
    const uniqueSortedWords = [...new Set(filteredWords)].sort();
    
    // 如果没有匹配的单词，返回前缀
    if (uniqueSortedWords.length === 0) {
        return pre;
    }
    
    // 返回结果字符串
    return uniqueSortedWords.join(' ');
}

// 测试用例
// console.log(wordAssociation("I love you", "He")); // 输出: He
console.log(wordAssociation("The furthest distance in the world, Is not between life and death, But when I stand in front of you, Yet you don't know that I love you.", "f")); // 输出: front furthest

// 读取输入并执行函数
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let inputStr = '';
// let inputPre = '';

// rl.on('line', (input) => {
//     if (!inputStr) {
//         inputStr = input;
//     } else {
//         inputPre = input;
//         console.log(wordAssociation(inputStr, inputPre));
//         rl.close();
//     }
// });
