// Vue 响应式系统的核心算法实现

// Dep 类：依赖收集器
class Dep {
    constructor() {
        this.subscribers = new Set();
    }

    depend() {
        if (activeUpdate) {
            this.subscribers.add(activeUpdate);
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub());
    }
}

// 全局变量，用于存储当前正在执行的更新函数
let activeUpdate = null;

// Observer 类：将对象转换为响应式
class Observer {
    constructor(value) {
        this.value = value;
        if (Array.isArray(value)) {
            // 如果是数组，我们需要重写数组方法
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });
    }

    observeArray(arr) {
        arr.forEach(item => observe(item));
    }
}

// 将对象转换为响应式的函数
function observe(value) {
    if (typeof value !== 'object' || value === null) {
        return;
    }
    return new Observer(value);
}

// 定义响应式属性
function defineReactive(obj, key, val) {
    const dep = new Dep();
    let childOb = observe(val);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.depend();
            return val;
        },
        set(newVal) {
            if (newVal === val) return;
            val = newVal;
            childOb = observe(newVal);
            dep.notify();
        }
    });
}

// Watcher 类：订阅者，执行更新函数
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm;
        this.getter = typeof expOrFn === 'function' ? expOrFn : () => vm[expOrFn];
        this.cb = cb;
        this.value = this.get();
    }

    get() {
        activeUpdate = this.update.bind(this);
        const value = this.getter.call(this.vm);
        activeUpdate = null;
        return value;
    }

    update() {
        const oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue);
    }
}

// 使用示例
const data = { count: 0 };
observe(data);

new Watcher(data, 'count', (newVal, oldVal) => {
    console.log(`count changed from ${oldVal} to ${newVal}`);
});

data.count++; // 输出: count changed from 0 to 1
