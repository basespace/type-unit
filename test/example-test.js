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
            assert.ok(output.indexOf("√ Addition -- should pass") > -1);
            assert.ok(output.indexOf("1) Subtraction -- should fail") > -1);
            assert.ok(output.indexOf("1 passing") > -1);
            assert.ok(output.indexOf("1 failing") > -1);
            done();
        });
    });
});
//# sourceMappingURL=example-test.js.map