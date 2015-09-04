import typeunit = require("../../dist/typeunit");
import assert = require("assert");

var Suite = typeunit.Suite,
	Fact = typeunit.Fact,
	Theory = typeunit.Theory;

require("mocha");

@Suite("Math tests")
class MathTests {
	@Fact("Addition -- should pass")
	addition() {
		assert.equal(1 + 1, 2, "One plus one equals two");
	}
	
	@Fact("Subtraction -- should fail")
	subtraction() {
		assert.equal(0, 1 / 0, "One divided by zero is not a number");
	}
}