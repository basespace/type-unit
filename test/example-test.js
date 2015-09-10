/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
var path = require("path"), spawn = require("child_process").spawn, assert = require("assert");
describe("TypeUnit example test suite", function () {
    var ls;
    var output = "";
    beforeEach(function () {
        ls = spawn("node", ["../node_modules/mocha/bin/mocha"], {
            cwd: path.join(__dirname, "../examples")
        });
    });
    it("should produce the expected result", function (done) {
        ls.stdout.on('data', function (data) {
            output = output + data;
        });
        ls.on('close', function (code) {
            assertContains("√ Async Fact -- should pass", output);
            assertContains("1) Subtraction -- should fail", output);
            assertContains("√ Async Fact -- should pass", output);
            assertContains("√ Promise Fact -- should pass", output);
            assertContains("2) Promise Fact -- should fail", output);
            assertContains("3) Async Fact -- should fail", output);
            done();
        });
    });
});
function assertContains(needle, haystack) {
    assert.ok(haystack.indexOf(needle) > -1, needle);
}
//# sourceMappingURL=example-test.js.map