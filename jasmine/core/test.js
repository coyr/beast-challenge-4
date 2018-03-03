
// librarySystem tests

describe("Store a libraries in the librarySystem", function() {

    it("Should store a library", function() {
        librarySystem('librarySystemClearAll');

        librarySystem('app', function() {
          return 'app';
        });
        expect(librarySystem('app')).toBe('app');
    });

    it("Should receive also an array as second parameter and keep working", function() {

        librarySystem('librarySystemClearAll');

        librarySystem('dependency', [], function() {
          return 'loaded dependency';
        });

        expect(librarySystem('dependency')).toBe('loaded dependency');
    });

    it("Define a function with dependencies and use it in the args", function() {

        librarySystem('librarySystemClearAll');

        librarySystem('dependency', [], function() {
          return 'loaded dependency';
        });

        librarySystem('app', ['dependency'], function(dependency) {
          return 'app with ' + dependency;
        });

        expect(librarySystem('app')).toBe('app with loaded dependency');
    });

    it("Store reference to two or more libraries", function() {

        librarySystem('librarySystemClearAll');

        librarySystem('name', [], function() {
          return 'Gordon';
        });

        librarySystem('company', [], function() {
          return 'Watch and Code';
        });

        librarySystem('workBlurb', ['name', 'company'], function(name, company) {
          return name + ' works at ' + company;
        });

        expect(librarySystem('workBlurb')).toBe('Gordon works at Watch and Code');
    });

    it("Store reference dependencies in any order", function() {

        librarySystem('librarySystemClearAll');

        librarySystem('workBlurb', ['name', 'company'], function(name, company) {
          return name + ' works at ' + company;
        });

        librarySystem('name', [], function() {
          return 'Gordon';
        });

        librarySystem('company', [], function() {
          return 'Watch and Code';
        });

        expect(librarySystem('workBlurb')).toBe('Gordon works at Watch and Code');
    });

});
