

(function () {
	// Where are going to be store the libraries
	var libraryStorage = {};

	// Store libraries in one property 'librarySystem' on the window element
	// Arguments:
		// libraryName: type: string.  Name or alias of the library 
		// dependencies: type: Array or function
			// If only two areguments are sent and 'dependencies' is a function, 
			// it is going to be store.
			// If dependencies is an array, it will be interpreted as dependencies 
		// callback: type: function to be store 
	function librarySystem (libraryName, dependencies, callback) {

		// The library is going to be store
		if (arguments.length > 1) {
			//In the case  'dependencies' is a callback to be store
			if (typeof dependencies === 'function') {
				libraryStorage[libraryName] = {
					callback: dependencies,
					dependencies: []
				}
			// The second argument is an array of dependencies and the callback is a callback
			} else {
				libraryStorage[libraryName] = {
					callback: callback,
					dependencies: dependencies
				}
			}
		// The library is going to be call
		} else {

			// If there aren't dependencies then make the callback
			if (libraryStorage[libraryName].dependencies.length === 0)  {
				return libraryStorage[libraryName].callback();

			// If there are dependencies, run the dependencies an pass them as arguments
			} else {
				dependencies = libraryStorage[libraryName].dependencies;
				var args = dependencies.map(function mapper(library) {
					return libraryStorage[library].callback();
				});
				return libraryStorage[libraryName].callback.apply(this, args);	
			}
			
		}
	}
	window.librarySystem = librarySystem;

})();