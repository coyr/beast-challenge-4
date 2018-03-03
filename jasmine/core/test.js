
// librarySystem tests

describe("Store a libraries in the librarySystem", function() {

    it("Should store a library", function() {

        librarySystem('app', function() {
          return 'app';
        });
        expect(librarySystem('app')).toBe('app');
    });

    it("Should receive also an array as second parameter and keep working", function() {

        librarySystem('dependency', [], function() {
          return 'loaded dependency';
        });

        expect(librarySystem('dependency')).toBe('loaded dependency');
    });

    it("Define a function with dependencies and use it in the args", function() {

        librarySystem('dependency2', [], function() {
          return 'loaded dependency';
        });

        librarySystem('app2', ['dependency2'], function(dependency2) {
          return 'app with ' + dependency2;
        });

        expect(librarySystem('app2')).toBe('app with loaded dependency');
    });

    it("Store reference to two or more libraries", function() {

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

        librarySystem('workBlurb2', ['name2', 'company2'], function(name2, company2) {
          return name2 + ' works at ' + company2;
        });

        librarySystem('name2', [], function() {
          return 'Gordon';
        });

        librarySystem('company2', [], function() {
          return 'Watch and Code';
        });

        expect(librarySystem('workBlurb2')).toBe('Gordon works at Watch and Code');
    });

});
