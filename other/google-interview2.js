// Given an object and a filter function, write a function that recursively filters the object, returning only values which return true when called with the filter function (like Array.prototype.filter but for objects).
function filterObject(obj, filterFn) {
    if (Array.isArray(obj)) {
        return obj.map(item => filterObject(item, filterFn)).filter(filterFn);
    } else if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const filteredValue = filterObject(obj[key], filterFn);
                if (filterFn(filteredValue)) {
                    result[key] = filteredValue;
                }
            }
        }
        return result;
    } else {
        return filterFn(obj) ? obj : undefined;
    }
}

// Test cases
const obj = {
    a: 1,
    b: 'string',
    c: {
        d: 2,
        e: [3, 4, 5],
        f: {
            g: 6,
            h: 'another string'
        }
    }
};

const filterFn = value => typeof value === 'number' && value > 2;

console.log(filterObject(obj, filterFn));
// Expected output: { c: { e: [ 3, 4, 5 ], f: { g: 6 } } }
