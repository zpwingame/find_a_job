// Implement a rate limiter attribute/decoration/annotation on top of an API endpoint. Caps to N requests per minute with a rolling window
class RateLimiter {
    constructor(limit, windowInSeconds) {
        this.limit = limit;
        this.windowInSeconds = windowInSeconds;
        this.requests = new Map();
    }

    isAllowed(clientId) {
        const currentTime = Date.now();
        const windowStart = currentTime - (this.windowInSeconds * 1000);

        if (!this.requests.has(clientId)) {
            this.requests.set(clientId, []);
        }

        const clientRequests = this.requests.get(clientId);
        
        // Remove requests outside the current window
        while (clientRequests.length > 0 && clientRequests[0] <= windowStart) {
            clientRequests.shift();
        }

        if (clientRequests.length < this.limit) {
            clientRequests.push(currentTime);
            return true;
        }

        return false;
    }
}

function rateLimiter(limit, windowInSeconds) {
    const limiter = new RateLimiter(limit, windowInSeconds);

    return function(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args) {
            const clientId = args[0].clientId || 'default';
            
            if (limiter.isAllowed(clientId)) {
                return originalMethod.apply(this, args);
            } else {
                throw new Error('Rate limit exceeded');
            }
        };

        return descriptor;
    };
}

class API {
    @rateLimiter(5, 60) // 5 requests per minute
    handleRequest(request) {
        // API logic here
        console.log('Request handled');
    }
}

// Usage example
const api = new API();

// Simulate requests
for (let i = 0; i < 7; i++) {
    try {
        api.handleRequest({ clientId: 'user1' });
    } catch (error) {
        console.log(error.message);
    }
}
