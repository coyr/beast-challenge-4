(function () {
  const libraryStorage = {};

  function librarySystem(libraryName, dependencyArray, callback) {
    // If the length is greater than one, we are storing a library for later.
    // We don't run the callback function, yet.
    if (arguments.length > 1) {
      return (libraryStorage[libraryName] = {
        dependencyArray,
        callback,
      });
    }
    // Here we are retrieving a library for use.
    // If the return value of the callback has been stored in the storedLibrary property, return it.
    // This stops us from running the callback twice.
    if (libraryStorage[libraryName].storedLibrary) {
      return libraryStorage[libraryName].storedLibrary;
    }
    // If there is no storedLibrary property, the callback function hasn't been called yet.
    // We need to load the dependencies.
    const dependencies = libraryStorage[libraryName].dependencyArray;
    // Before we can use the dependencies, we have to make sure that
    // All the dependencies have a storedLibrary property.
    // We can use recursion for this.
    // If this seems confusing, just think of the movie Inception... and use the debugger.
    dependencies.forEach((dependency) => {
      librarySystem(dependency);
    });
    // Now that all the librarys have a storedLibrary property,
    // we can put the libraries in an array.
    const librarys = dependencies.map(dependency => libraryStorage[dependency].storedLibrary);

    // We'll store the return value of the callback function as a storedLibrary and return it.
    libraryStorage[libraryName].storedLibrary = libraryStorage[libraryName].callback(...librarys);
    return libraryStorage[libraryName].storedLibrary;
  }
  window.librarySystem = librarySystem;
}());