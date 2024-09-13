// Design Google calendar.
// Google Calendar Design

// Class to represent an Event
class Event {
    constructor(id, title, startTime, endTime, attendees = []) {
        this.id = id;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.attendees = attendees;
    }
}

// Class to represent a User
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
    }

    removeEvent(eventId) {
        this.events = this.events.filter(event => event.id !== eventId);
    }
}

// Main Calendar class
class GoogleCalendar {
    constructor() {
        this.users = new Map();
        this.events = new Map();
    }

    addUser(user) {
        this.users.set(user.id, user);
    }

    createEvent(userId, eventDetails) {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const event = new Event(
            Date.now(), // Using timestamp as a simple ID
            eventDetails.title,
            eventDetails.startTime,
            eventDetails.endTime,
            eventDetails.attendees
        );

        this.events.set(event.id, event);
        user.addEvent(event);

        // Add event to attendees' calendars
        event.attendees.forEach(attendeeId => {
            const attendee = this.users.get(attendeeId);
            if (attendee) {
                attendee.addEvent(event);
            }
        });

        return event;
    }

    deleteEvent(userId, eventId) {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const event = this.events.get(eventId);
        if (!event) {
            throw new Error("Event not found");
        }

        user.removeEvent(eventId);
        this.events.delete(eventId);

        // Remove event from attendees' calendars
        event.attendees.forEach(attendeeId => {
            const attendee = this.users.get(attendeeId);
            if (attendee) {
                attendee.removeEvent(eventId);
            }
        });
    }

    getUserEvents(userId, startDate, endDate) {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error("User not found");
        }

        return user.events.filter(event => 
            event.startTime >= startDate && event.endTime <= endDate
        );
    }

    updateEvent(userId, eventId, updatedDetails) {
        const event = this.events.get(eventId);
        if (!event) {
            throw new Error("Event not found");
        }

        Object.assign(event, updatedDetails);
    }
}

// Usage example
const calendar = new GoogleCalendar();

const user1 = new User(1, "Alice", "alice@example.com");
const user2 = new User(2, "Bob", "bob@example.com");

calendar.addUser(user1);
calendar.addUser(user2);

const eventDetails = {
    title: "Team Meeting",
    startTime: new Date("2023-06-15T10:00:00"),
    endTime: new Date("2023-06-15T11:00:00"),
    attendees: [2] // Bob's user ID
};

const createdEvent = calendar.createEvent(1, eventDetails); // Alice creates the event

console.log(calendar.getUserEvents(1, new Date("2023-06-15T00:00:00"), new Date("2023-06-15T23:59:59")));
console.log(calendar.getUserEvents(2, new Date("2023-06-15T00:00:00"), new Date("2023-06-15T23:59:59")));
