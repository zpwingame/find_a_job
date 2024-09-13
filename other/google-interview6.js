// Implement a simple photo ordering tool with vanilla JS and no libraries.
// Create a container for the photo ordering tool
const container = document.createElement('div');
container.id = 'photo-ordering-tool';
document.body.appendChild(container);

// Create an array to store photo objects
let photos = [];

// Function to add a new photo
function addPhoto(url, title) {
    const photo = { url, title, order: photos.length + 1 };
    photos.push(photo);
    renderPhotos();
}

// Function to render photos
function renderPhotos() {
    container.innerHTML = '';
    photos.sort((a, b) => a.order - b.order);
    
    photos.forEach((photo, index) => {
        const photoElement = document.createElement('div');
        photoElement.className = 'photo';
        photoElement.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}">
            <p>${photo.title}</p>
            <button class="move-up" ${index === 0 ? 'disabled' : ''}>↑</button>
            <button class="move-down" ${index === photos.length - 1 ? 'disabled' : ''}>↓</button>
        `;
        
        photoElement.querySelector('.move-up').addEventListener('click', () => movePhoto(index, -1));
        photoElement.querySelector('.move-down').addEventListener('click', () => movePhoto(index, 1));
        
        container.appendChild(photoElement);
    });
}

// Function to move a photo up or down
function movePhoto(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < photos.length) {
        [photos[index].order, photos[newIndex].order] = [photos[newIndex].order, photos[index].order];
        renderPhotos();
    }
}

// Add some sample photos
addPhoto('https://example.com/photo1.jpg', 'Beach Sunset');
addPhoto('https://example.com/photo2.jpg', 'Mountain View');
addPhoto('https://example.com/photo3.jpg', 'City Skyline');

// Add CSS styles
const styles = `
    #photo-ordering-tool {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
        margin: 20px auto;
    }
    .photo {
        border: 1px solid #ccc;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .photo img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    .photo button {
        cursor: pointer;
    }
    .photo button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);
