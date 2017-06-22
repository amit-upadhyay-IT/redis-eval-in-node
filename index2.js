'use strict'
var redis = require('redis')
var client = redis.createClient()
var fs = require('fs')

client.eval(fs.readFileSync('./debug_script.lua'), 4, 1, 'score', 0, 10, 'meeting_type:email', 'meeting_status:open', function(err, res) {
  console.log(res);
});
