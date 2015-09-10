import typeunit = require("../../dist/index");
import Promise = require("bluebird");
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
	
	@Fact("Async Fact -- should pass")
	asyncFactSuccess(done) {
		setTimeout(() => {
			assert.ok(true);
			done();
		}, 250);
	}
	
	@Fact("Promise Fact -- should pass")
	promiseFactSuccess() {
		return new Promise<boolean>((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 1);
		}).then(() => {
			assert.ok(true);
		},
		() => {
			assert.ok(false);
		});
	}
	
	@Fact("Promise Fact -- should fail")
	promiseFactFail() {
		var p = new Promise<boolean>((resolve, reject) => {
			setTimeout(() => {
				reject(true);
			}, 1);
		}).then(() => {
			assert.ok(true);
		},
		() => {
			assert.ok(false);
		});
		
		return p;
	}
	
	@Fact("Async Fact -- should fail")
	asyncFactFail(done) {
		setTimeout(() => {
			assert.ok(false);
			done();
		}, 250);
	}
}