var redis = require("redis")
var client = redis.createClient();


console.log("111");
client.on("error", function(err) {
    console.log("Error "+err);
})

client.on('connect', function() {
    console.log('connected');
});


console.log('222');

var Scripto = require('redis-scripto');

console.log('333');
var scriptManager = new Scripto(client);

console.log('444');
scriptManager.loadFromDir('./scripts/');
console.log('555');

var keys    = [3, 'score', 0, 10];
var values  = ['meeting_type:email', 'meeting_status:close'];
scriptManager.run('debug_script.lua', keys, values, function(err, result) {
    console.log("something happened : "+ err);
});

