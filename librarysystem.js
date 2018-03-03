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
	function librarySystem ( libraryName, dependencies, callback ) {

		// The library is going to be store
		if ( arguments.length > 1 ) {
			//In the case  'dependencies' is a callback to be store
			if ( typeof dependencies === 'function') {
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

			// If there aren't dependencies then make the callback and store it
			if ( libraryStorage[libraryName].dependencies.length === 0 )  {
				// Run the callback only once 
				if ( !libraryStorage[libraryName].ranCallback === false ) {
					return libraryStorage[libraryName].ranCallback;
				} else {
					return libraryStorage[libraryName].ranCallback = libraryStorage[libraryName].callback();
				}

			// If there are dependencies, run the dependencies an pass them as arguments
			} else {
				var args = libraryStorage[libraryName].dependencies.map(function mapper(library) {
						if ( !libraryStorage[library].ranCallback === false ) {
							return libraryStorage[library].ranCallback;
						} else {
							return libraryStorage[library].ranCallback = libraryStorage[library].callback();
						}
					});

				if ( !libraryStorage[libraryName].ranCallback === false ) {
					return libraryStorage[libraryName].ranCallback;
				} else {
					return libraryStorage[libraryName].ranCallback = libraryStorage[libraryName].callback.apply(this, args);
				}
			}
		}
	}
	window.librarySystem = librarySystem;

})();