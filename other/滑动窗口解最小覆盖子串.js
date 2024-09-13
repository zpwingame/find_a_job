// 给你一个字符串s、一个字符串t。返回s中涵盖t所有字符的最小子串。如果s中不存在涵 盖t所有字符的子串，则返回空字符串""。
// 注意:如果s中存在这样的子串，我们保证它是唯一的答案。 示例 1:
// 输入:s = "ADOBECODEBANC", t = "ABC" 输出:"BANC"
// 示例 2:
// 提示:
// 1 <= s.length, t.length <= 10^5 s 和 t 由英文字母组成
// 输入:s = "ADOBECODEBANC", t = "ABC" 输出:"BANC"
// 输入:s = "a", t = "a" 输出:"a"
function ss(s, t) {
    let start = 0;
    let minStr = s;
    for(var i =0; i< s.length; i++) {
        for(j=i+1; j< s.length; j++) {
            console.log('i,j', i,j)
            let str =  s.slice(i, j+1);
            console.log("🚀 ~ ss ~ str:", str);
            let count = 0
            for(item of t) {
                if(str.indexOf(item) >= 0) {
                    count++
                }
            }

            if(count === t.length) {
                if(j-i < minStr.length) {
                    minStr  = str
                }
            }
            count = 0;
        }
    }
    return minStr
}
console.log(ss('ADOBECODEBANC', "ABC"))
function minWindow(s, t) {
    // 创建一个 Map 来存储 t 中每个字符的出现次数
    const needMap = new Map();
    for (let char of t) {
        needMap.set(char, (needMap.get(char) || 0) + 1);
    }

    let left = 0, right = 0;
    let valid = 0; // 当前窗口中满足 needMap 条件的字符个数
    let start = 0, minLen = Infinity;

    // 创建一个 Map 来记录窗口中的字符及其出现次数
    const windowMap = new Map();

    while (right < s.length) {
        // 扩大窗口
        const c = s[right];
        right++;

        // 更新窗口数据
        if (needMap.has(c)) {
            windowMap.set(c, (windowMap.get(c) || 0) + 1);
            if (windowMap.get(c) === needMap.get(c)) {
                valid++;
            }
        }

        // 当窗口包含所有 t 中的字符时，尝试收缩窗口
        while (valid === needMap.size) {
            // 更新最小覆盖子串
            if (right - left < minLen) {
                start = left;
                minLen = right - left;
            }

            // 缩小窗口
            const d = s[left];
            left++;

            // 更新窗口数据
            if (needMap.has(d)) {
                if (windowMap.get(d) === needMap.get(d)) {
                    valid--;
                }
                windowMap.set(d, windowMap.get(d) - 1);
            }
        }
    }

    return minLen === Infinity ? "" : s.substr(start, minLen);
}

// 测试
console.log(minWindow('ADOBECODEBANC', "ABC")); // 输出: "BANC"
console.log(minWindow('a', "a")); // 输出: "a"
console.log(minWindow('a', "aa")); // 输出: ""
