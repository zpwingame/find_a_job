/**
 * 一种字符串压缩表示的解压
 * @param {string} compressedStr - 压缩后的字符串
 * @returns {string} - 解压后的字符串
 */
function decompressString(compressedStr) {
    let result = '';
    let i = 0;

    while (i < compressedStr.length) {
        if (compressedStr[i] === '{') {
            let j = i + 1;
            let num = '';
            while (compressedStr[j] !== '|') {
                num += compressedStr[j];
                j++;
            }
            let repeatCount = parseInt(num);
            
            let subStr = '';
            j++; // Skip '|'
            let braceCount = 1;
            while (braceCount > 0) {
                if (compressedStr[j] === '{') braceCount++;
                if (compressedStr[j] === '}') braceCount--;
                if (braceCount > 0) subStr += compressedStr[j];
                j++;
            }
            
            result += decompressString(subStr).repeat(repeatCount);
            i = j;
        } else {
            result += compressedStr[i];
            i++;
        }
    }

    return result;
}

// Test cases
console.log(decompressString("3{a}2{bc}")); // "aaabcbc"
console.log(decompressString("3{a2{c}}")); // "accaccacc"
console.log(decompressString("2{abc}3{cd}ef")); // "abcabccdcdcdef"
console.log(decompressString("abc3{cd}xyz")); // "abccdcdcdxyz"
