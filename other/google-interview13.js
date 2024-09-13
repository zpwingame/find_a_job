// Implement an autocomplete
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Autocomplete {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this._findAllWords(node, prefix);
    }

    _findAllWords(node, prefix) {
        let results = [];
        if (node.isEndOfWord) {
            results.push(prefix);
        }
        for (let char in node.children) {
            results = results.concat(this._findAllWords(node.children[char], prefix + char));
        }
        return results;
    }
}

// Usage example:
const autocomplete = new Autocomplete();
autocomplete.insert("hello");
autocomplete.insert("help");
autocomplete.insert("world");
autocomplete.insert("wonder");

console.log(autocomplete.search("he")); // ["hello", "help"]
console.log(autocomplete.search("w")); // ["world", "wonder"]
console.log(autocomplete.search("wo")); // ["world", "wonder"]
console.log(autocomplete.search("won")); // ["wonder"]
console.log(autocomplete.search("x")); // []
