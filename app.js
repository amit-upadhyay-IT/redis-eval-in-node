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
