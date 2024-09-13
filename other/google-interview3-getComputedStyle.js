// Implement a function getElementsByStyle(property, value) that returns all elements in the DOM that match that style.
// E.g. getElementsByStyle("color", "#fff") will return all elements in the DOM with white text.
function getElementsByStyle(property, value) {
    const allElements = document.getElementsByTagName('*');
    const matchingElements = [];

    for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        const computedStyle = window.getComputedStyle(element);
        
        if (computedStyle[property] === value) {
            matchingElements.push(element);
        }
    }

    return matchingElements;
}

// Example usage:
// const whiteTextElements = getElementsByStyle("color", "#fff");
// console.log(whiteTextElements);

// Note: This function should be called after the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', function() {
//     const whiteTextElements = getElementsByStyle("color", "#fff");
//     console.log(whiteTextElements);
// });
