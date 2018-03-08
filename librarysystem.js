(function () {
  // Where are going to be store the libraries
  var libraryStorage = {};

  // Store libraries in one property 'librarySystem' on the window element
  function librarySystem ( libraryName, dependencies, callback ) {
    // The library is going to be store
    if ( arguments.length > 1 ) {
      libraryStorage[libraryName] = { callback, dependencies }
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



//=================================
// Tests
//================================

//-------------------------------
// Case 1

librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'

//-------------------------------
// Case 2

librarySystem('dependency', [], function() {
  return 'loaded dependency';
});

librarySystem('library', ['dependency'], function(dependency) {
  return 'library with ' + dependency;
});

librarySystem('library'); // 'apps with loaded dependency'

//-------------------------------
// Case 3

librarySystem('workResume', ['teacher', 'institution'], function(teacher, institution) {
  return teacher + ' works at ' + institution;
});

librarySystem('teacher', [], function() {
  return 'Gordon';
});

librarySystem('institution', [], function() {
  return 'Watch and Code';
});

librarySystem('workResume'); // 'Gordon works at Watch and Code'


