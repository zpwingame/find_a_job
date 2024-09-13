// 题目描述
// 给定一段“密文”字符串 s，其中字符都是经过“密码本”映射的，现需要将“密文”解密并输出。

// 映射的规则（'a' ~ 'i'）分别用（'1' ~ '9'）表示；（'j' ~ 'z'）分别用（"10*" ~ "26*"）表示。

// 约束：映射始终唯一。

// 输入描述
// “密文”字符串

// 输出描述
// 明文字符串

// 备注
// 翻译后的文本长度在100以内

// 输入	20*19*20*
// 输出	tst

// function decryptPassword(s) {
//     let result = '';
//     let i = 0;
    
//     while (i < s.length) {
//         if (s[i] >= '1' && s[i] <= '9') {
//             // For 'a' to 'i'
//             result += String.fromCharCode('a'.charCodeAt(0) + parseInt(s[i]) - 1);
//             i++;
//         } else {
//             console.log('else', s[i])
//             // For 'j' to 'z'
//             let code = s.slice(i, i + 2);
//             console.log('code', code)
//             result += String.fromCharCode('a'.charCodeAt(0) + parseInt(code) - 1);
//             i += 3; // Skip the '*' as well
//         }
//     }
    
//     return result;
// }

function test(s) {
    // console.log(s);
    for (let i = 26; i >= 1; i--) {
        const key = i + (i > 9 ? "*" : "");
        const val = String.fromCharCode(97 + i - 1);

        s = s.replaceAll(key, val);
    }
    return s

}

// Test cases
console.log(test('20*19*20*')); // Expected output: tst
console.log(test('1234567890*')); // Expected output: abcdefghij
console.log(test('26*25*24*23*22*')); // Expected output: zyxwv
