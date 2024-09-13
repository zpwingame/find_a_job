// Vue $nextTick implementation

let callbacks = [];
let pending = false;

function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}

function nextTick(cb, ctx) {
    let _resolve;
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                console.error(e);
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });

    if (!pending) {
        pending = true;
        Promise.resolve().then(flushCallbacks);
    }

    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}

// Example usage:
// nextTick(() => {
//     console.log('This will run after the next DOM update');
// });

// Or with Promise:
// nextTick().then(() => {
//     console.log('This will also run after the next DOM update');
// });
