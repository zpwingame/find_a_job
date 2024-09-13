/**
 * @param {number} capacity
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /** 
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        // Remove the node from its current position
        const node = this.cache.get(key);
        this.removeNode(node);
        
        // Move it to the front of the list
        this.addToFront(node);
        
        return node.value;
    }

    /** 
     * @param {number} key 
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing key
            const node = this.cache.get(key);
            this.removeNode(node);
            node.value = value;
            this.addToFront(node);
        } else {
            // Add new key
            if (this.cache.size >= this.capacity) {
                // Remove the least recently used item
                const lru = this.tail.prev;
                this.removeNode(lru);
                this.cache.delete(lru.key);
            }
            const newNode = new Node(key, value);
            this.addToFront(newNode);
            this.cache.set(key, newNode);
        }
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

// Test cases
const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
console.log(lRUCache.get(1));    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
console.log(lRUCache.get(2));    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
console.log(lRUCache.get(1));    // return -1 (not found)
console.log(lRUCache.get(3));    // return 3
console.log(lRUCache.get(4));    // return 4

// LRU Cache (Least Recently Used Cache) 问题解析：

// 1. 问题描述：
// 设计并实现一个LRU（最近最少使用）缓存机制。它应该支持以下操作：获取数据 get 和 写入数据 put 。
// get(key) - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
// put(key, value) - 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。
// 当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

// 2. 解题思路：
// 使用哈希表和双向链表的组合。哈希表提供 O(1) 的查找，双向链表提供 O(1) 的插入和删除。
// - 使用 Map 作为哈希表，存储 key 到 Node 的映射
// - 使用双向链表保存数据的使用顺序，最近使用的在前面，最久未使用的在后面

// 3. 时间复杂度：
// get 和 put 操作都是 O(1)

// 4. 空间复杂度：
// O(capacity)，因为缓存的大小是固定的

// 5. 注意事项：
// - 需要在 get 和 put 操作时更新节点在链表中的位置
// - 当缓存满时，需要删除最久未使用的节点（链表尾部的节点）
// - 使用伪头部和伪尾部简化边界情况的处理

// 6. 优化方向：
// - 可以考虑使用更高效的数据结构，如 LinkedHashMap（在某些语言中可用）
// - 对于大规模应用，可以考虑分布式缓存系统
