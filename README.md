# type-unit

**TypeUnit** enables you to write TypeScript tests in the style of <a href="https://xunit.github.io/">xUnit</a>.
It's a simple library that sprinkles syntactic sugar atop your test framework of choice.
TypeUnit works by way of plugins, which provide the functionality for actually running the test suite. An example is `type-unit-mocha`.

### Changelog

Version 1.0.0:
* Version 1.0.0 introduces a plugin system, and the first plugin is `type-unit-mocha`. Consequently, `type-unit` itself is no longer reliant on mocha.
* The `suite`, `fact`, and `theory` decorator names are now lowercase by default (of course, you can alias them upon import if needed: `import {fact as Fact} from "type-unit"`).
* Updated example to use preferred ES6-style import syntax.

### Building
* Clone this repository.
* Run `npm i`.
* Run `npm run build`.
* To execute the tests, install mocha globally (`npm i -g mocha`), then run `npm run test`.

### Writing a test suite.

* In your test project, install a TypeUnit plugin (`npm i type-unit-mocha --save`).
* Create a typeunit.config.js file:
```
var mochawrapper = require("type-unit-mocha");
module.exports = {
    plugin: mochawrapper
};
```
* Configure your TypeScript project to allow decorators. As of TypeScript 1.5.*, you must set the `experimentalDecorators` compiler option to `true`.
* A class comprises a `@suite` of tests, and an individual test function is a `@fact`. A test to run with a series of different parameters is a `@theory`. 
* How you execute your test runner will depend on the plugin used. In the case of `type-unit-mocha`, ensure that `mocha` is installed globally (`npm i -g mocha`), then run `mocha` from the same directory as the `typeunit.config.js` file.

#### Examples

```
import {fact, theory, suite} from "type-unit";
import * as assert from "assert";

@suite("Arithmetic")
class MathTests {

    @fact("Should be able to add")
    addition() {
        assert.equal(1 + 1, 2);
    }

    @theory([
      [2, 1, 2],
      [2, 2, 4],
      [2, 3, 8]
      ], "Should be able to exponentiate")
    exponentiation(base: number, exponent: number, expectedValue: number) {
       assert.equal(Math.pow(base, exponent), expectedValue);
    }
}
```

### To do
The following features are on the roadmap

* Support for decorators that correspond to mocha's `beforeEach()` and `afterEach()` and to xUnit Fixtures.
* Support for alternative test frameworks like **jasmine-node** or **vows**.
 
### Contributing
* Contributions welcome. New features should be tested by adding unit tests file (`tests` folder). Tests can be executed by running `mocha` from the root TypeUnit directory, or `npm run test`.
