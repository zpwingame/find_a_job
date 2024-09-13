// Vue3 Reactive System using Proxy

// Reactive function to create a reactive object
function reactive(target) {
    return new Proxy(target, {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            track(target, key);
            return result;
        },
        set(target, key, value, receiver) {
            const oldValue = target[key];
            const result = Reflect.set(target, key, value, receiver);
            if (oldValue !== value) {
                trigger(target, key);
            }
            return result;
        },
        deleteProperty(target, key) {
            const hadKey = Object.prototype.hasOwnProperty.call(target, key);
            const result = Reflect.deleteProperty(target, key);
            if (hadKey) {
                trigger(target, key);
            }
            return result;
        }
    });
}

// WeakMap to store dependencies
const targetMap = new WeakMap();

// Track function to collect dependencies
function track(target, key) {
    if (activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        dep.add(activeEffect);
    }
}

// Trigger function to notify subscribers
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => effect());
    }
}

// Global variable to track current active effect
let activeEffect = null;

// Effect function to create reactive effects
function effect(fn) {
    const run = () => {
        activeEffect = run;
        fn();
        activeEffect = null;
    };
    run();
    return run;
}

// Example usage
const state = reactive({ count: 0 });

effect(() => {
    console.log('Count is:', state.count);
});

// This will trigger the effect
state.count++;
