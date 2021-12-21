import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');
import process from "process";


let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
tmr.setInput("tenantName", process.env.TENANT!);
tmr.setInput("CheckmarxService", "cxauth");
tmr.registerMockExport('getEndpointUrl', () => { return  process.env.BASE_URI!; });
tmr.registerMockExport('getEndpointAuthorizationParameter', (endpoint, key) => {
    if (key === 'username') return process.env.CLIENT_ID!
    if (key === 'password') return process.env.CLIENT_SECRET!

    return "";
});
tmr.setInput("projectName", 'Test_Wrong_Preset');
tmr.setInput("branchName", 'dummy_branch');
tmr.setInput("additionalParams", '--sast-preset-name fake');
tmr.run();