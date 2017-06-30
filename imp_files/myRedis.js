
var myGlobaMods =require("../globalmods");
var loggerSys=myGlobaMods.loggerSys;
var blueBird=myGlobaMods.blueBird;

 
 module.exports =   function(myConfig){

     var redisLib ={}
     var fs = require('fs')
 
var redisClient = myGlobaMods.redis.createClient(myConfig.redisdb);
redisClient.auth( myConfig.redisdb.password);
var redisTran=redisClient.multi();
 redisClient.on("error", function (err) 
    {
            loggerSys.error(err);
    }
    );

    redisLib.SetHash = async function(data)
    {
        try
        {
                var x=[1,2,3,4,5,6];
                redisTran.saddAsync("DemoSet",x);
                return true;
                // var retVal =await redisTran.execAsync();
                // console.log('done adding keys');
        }
        catch(ex)
        {
            return false;
            console.log(ex);
        }

    }

    redisLib.execute_lua_script = async function executeLuaScript()
    {
        try
        {
            var resp = await redisTran.evalAsync(fs.readFileSync('./debug_script.lua'), 4, 1, 'score', 0, 10, 'meeting_type:email', 'meeting_status:open');
            console.log('asdfasdf');
            console.log(resp);
            console.log('asdfasdf');
            return resp;
        }catch (ex)
        {
            throw ex;
        }

        // exec(cmd, function(error, stdout, stderr) {
        // // command output is in stdout
        //     console.log("something happened \n");
        //     console.log(stdout);
        //     return stdout;
        // });
    } 


    redisLib.set_value_hashset = async function setValueHashSet(data)
    {
        try
        {
        var return_Val =   await redisTran.hmsetAsync(["test_hashset:1", "name", data.name, "age", data.age, "points", data.points]);
        return return_Val;
        }
        catch (ex)
        {
            throw ex;
        }
    }

    redisLib.add_values_hashset = async function addValuesInHash(key_val)
    {
        var return_val = await redisTrans.hsetAsync("test_hashset:1", key_val.key, key_val.value);
        return return_val;
    }

    redisLib.update_values_hashset = async function updateValuesInHash(key_val)
    {
        var return_val = await redisTrans.hsetAsync("test_hashset:1", key_val.key, key_val.value);
        return return_val;
    }

    redisLib.delete_hashset_entry = async function deleteHashSetEntry(entry_field)
    {
        var return_val = await redisTrans.hdelAsync("test_hashset:1", entry_field);
        return return_val;
    }
         
    redisLib.execRedisCmds = async function execRedisCmds(data)
                {
                  var return_Val =  await redisTran.execAsync();
                    return return_Val;
                }
    return redisLib;
 
};
