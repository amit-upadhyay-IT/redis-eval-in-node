var redis = require("redis");
var client = redis.createClient();


console.log("111");
client.on("error", function(err) {
    console.log("Error "+err);
})

client.on('connect', function() {
    console.log('connected');
});


var exec = require('child_process').exec;

var os = require('os');

console.time("Some Time");

var cmd = 'redis-cli --eval debug_script.lua 1 score 0 10 , meeting_type:email meeting_status:close';


console.time("Exec Time");

for (i = 0; i < 10; ++i)
{
    exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
        console.timeEnd("Exec Time");
    });
}



/*
    console.time("1");
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
        console.timeEnd("1");
    });
   console.time("2");
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
        console.timeEnd("2");
    });
   console.time("3");
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
        console.timeEnd("Exec Time");
        console.timeEnd("3");
    });
   console.time("4");
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
        console.timeEnd("4");
    });
   console.time("5");
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
        console.timeEnd("5");
    });
   console.time("6");
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
        console.timeEnd("6");
    });
   console.time("7");
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
        console.timeEnd("7");
    });
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
    });
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
    });
   exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
        console.log("something happened \n");
        console.log(stdout);
    });
*/


console.timeEnd("Some Time");


