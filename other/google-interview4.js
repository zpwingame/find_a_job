// Promisify a function.
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// Example usage:
// const readFilePromise = promisify(fs.readFile);
// readFilePromise('file.txt', 'utf8')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
