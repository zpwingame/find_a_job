// Implement a StoreData class that add key/value pairs and listen to value changes for keys. Source
class StoreData {
    constructor() {
        this.data = new Map();
        this.listeners = new Map();
    }

    // Add or update a key-value pair
    set(key, value) {
        const oldValue = this.data.get(key);
        this.data.set(key, value);

        // Notify listeners if the value has changed
        if (oldValue !== value && this.listeners.has(key)) {
            this.listeners.get(key).forEach(listener => listener(value, oldValue));
        }
    }

    // Get the value for a key
    get(key) {
        return this.data.get(key);
    }

    // Add a listener for a specific key
    addListener(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);
    }

    // Remove a listener for a specific key
    removeListener(key, callback) {
        if (this.listeners.has(key)) {
            this.listeners.get(key).delete(callback);
            if (this.listeners.get(key).size === 0) {
                this.listeners.delete(key);
            }
        }
    }
}

// Example usage:
const store = new StoreData();

// Add a listener for the 'name' key
store.addListener('name', (newValue, oldValue) => {
    console.log(`Name changed from ${oldValue} to ${newValue}`);
});

// Set values
store.set('name', 'Alice'); // Outputs: Name changed from undefined to Alice
store.set('age', 30);

// Update value
store.set('name', 'Bob'); // Outputs: Name changed from Alice to Bob

// Get value
console.log(store.get('name')); // Outputs: Bob
console.log(store.get('age')); // Outputs: 30
