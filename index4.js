'use strict'
var os = require('os');

var Promise = require("bluebird");

var fs = Promise.promisifyAll(require('fs'));
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

    fs.readFileAsync('./debug_script.lua')
    .then(
        function(data)
        {
        client.evalAsync(data, 4, 1, 'score', 0, 10, 'meeting_type:email', 'meeting_status:open')
        .then(
        function(data){
            console.log(data);
            console.log(cnt);
            console.timeEnd("The time");
        }
        );

        }
        );
}

