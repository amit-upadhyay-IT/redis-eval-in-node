var os = require('os');

console.time("Details");

console.log(os.type());

console.log(os.platform());

console.log(os.arch());


for(var i = 0; i < 10000000; ++i)
{
    ;
}

console.timeEnd("Details");
