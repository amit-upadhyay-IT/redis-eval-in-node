'use strict'
var fs = require('fs')
var os = require('os');

var Promise = require("bluebird");

var redis = Promise.promisifyAll(require("redis"));
var client = redis.createClient()

console.time("The time");

for (var i = 0;  i < 20; ++i)
{

    var z = i;
testfunc(i);


}

function testfunc(cnt)
{

    client.evalAsync(fs.readFileSync('./debug_script.lua'), 4, 1, 'score', 0, 10, 'meeting_type:email', 'meeting_status:open')
.then(
function(data){
    console.log(data);
    console.log(cnt);
    console.timeEnd("The time");
}
);
}
