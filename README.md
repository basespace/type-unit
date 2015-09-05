# type-unit

**TypeUnit** enables TypeScript unit testing in the style of <a href="https://xunit.github.io/">xUnit</a>.

### Usage

* Install TypeUnit: `npm install type-unit`.
* Configure your TypeScript project to allow decorators. As of TypeScript 1.5.*, you must set the `experimentalDecorators` compiler option to `true`.
* A class comprises a `@Suite` of tests, and an individual test function is a `@Fact`. A test to run with a series of different parameters is a `@Theory`. 
* Execute your tests by running `mocha`.

#### Examples

```
import typeunit = require("type-unit");
var Fact = typeunit.Fact,
    Theory = typeunit.Theory,
    Suite = typeunit.Suite;
    
@Suite("Math")
class MathTests {
	  
    @Fact("Addition")
    addition() {
	    assert.equal(1 + 1, 2);
    }
    
    @Theory("Exponentiation", [
  	  [2, 1, 2],
  	  [2, 2, 4],
  	  [2, 3, 8]
	  ])
  	exponentiation(base: number, exponent: number, expectedValue: number) {
  	   assert.equal(Math.pow(base, exponent), expectedValue);
  	}
  	
}
```

### Testing framework

TypeUnit uses mocha. The decorators correspond to mocha functions:

* `@Suite()` => `describe()`
* `@Fact()` => `it()`
* `@Theory()` => series of `it()` blocks.

### To do

* Decorators that correspond to mocha's `beforeEach()` and `afterEach()` and to xUnit Fixtures.
* Support for alternative underyling test frameworks like **jasmine-node**.
 
### Contributing

* Contributions welcome. New features should be tested by adding unit tests file (`tests` folder). Tests can be executed by running `mocha` from the root TypeUnit directory, or `npm run test`.
