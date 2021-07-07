import * as path from 'path';
//import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import CxScan from "@checkmarxdev/ast-cli-javascript-wrapper/dist/main/CxScan";
import assert = require("assert");
import {MockTestRunner} from "azure-pipelines-task-lib/mock-test";
//import assert = require("assert");
//import CxScan from "@checkmarxdev/ast-cli-javascript-wrapper/dist/main/CxScan";

function runQueuedCase(tr: MockTestRunner) {
    const temp = tr.stdout.split('\n');
    if(isJsonString(temp[temp.length-2])) {
        const val: CxScan = JSON.parse(temp[temp.length - 2]);
        console.log(val);
        assert.strictEqual(val.Status, "Queued");
    }
    //assert.strictEqual(tr.succeeded, true, 'should have succeeded');

}

describe('Task runner test', function () {

    it('should be success no wait mode', function(done: Mocha.Done) {
        this.timeout(300000);
        let tp = path.join(__dirname, 'success_nowait.js');
       // let val:CxScan;
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
        tr.run();
        console.log(tr.succeeded);
        runQueuedCase(tr);
        done();
    });

    it('should be success wait mode', async function (done: Mocha.Done) {
        this.timeout(300000);
        let tp = path.join(__dirname, 'success_waitmode.js');
        // let val:CxScan;
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
        tr.run();
        runQueuedCase(tr);
        done();

    });
});

function isJsonString(s: string) {
    try {
        let stringObject = s.split('\n')[0];
        JSON.parse(stringObject);
    } catch (e) {
        return false;
    }
    return true;
}