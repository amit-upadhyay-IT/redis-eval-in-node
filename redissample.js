var redis = require('redis');
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error "+err);
});

client.on("connect", function (){
    console.log("Connected");
});

module.exports = function(myConfig) {

    var redisTran = client.multi();

    var set_value_hashset = function setValueHashSet(data)
    {
        client.hmset(["test_hashset:1", "name", data.name, "age", data.age, "points", data.points], function(err, res){
            console.log("hashset created successfully");
        });
    }

    var add_values_hashset = function addValuesInHash(key_val)
    {
        client.hset("test_hashset:1", key_val.key, key_val.value, function(err, data){
            var message = err || "hashset updated successfully";
            console.log(message);
        });
    }

    var update_values_hashset = function updateValuesInHash(key_val)
    {
        client.hset("test_hashset:1", key_val.key, key_val.value, function(err, data){
            var message = err || "hashset updated successfully";
            console.log(message);
        });
    }

    var delete_hashset_entry = function deleteHashSetEntry(entry_field)
    {
        client.hdel("test_hashset:1", entry_field, function(err) {
            var message = err || "entry successfully deleted";
             console.log(message);
        });
    }

}

