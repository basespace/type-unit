import typeunit = require("../../dist/index");
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
		assert.equal(1 - 1, 2, "One minus one does not equal two");
	}
	
	@Fact("Async Fact -- should pass", true)
	asyncFactSuccess(done) {
		setTimeout(() => {
			assert.ok(true);
			done();
		}, 250);
	}
	
	@Fact("Async Fact -- should fail", true)
	asyncFactFail(done) {
		setTimeout(() => {
			assert.ok(false);
			done();
		}, 250);
	}
}