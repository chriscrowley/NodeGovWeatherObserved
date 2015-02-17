var exports = module.exports = {};

var fs = require('fs');

var CR = "\r\n";

function uniq_loop_in(a)
{
  var seen = {};
  var out = [];
  var len = a.length;
  for(var i = 0; i < len; i++)
  {
    var item = a[i];
    if(seen[item] !== 1)
    {
      seen[item] = 1;
      out.push(item);
    }
  }
  return out;
}


function arrayToFile(a, filePath)
{
  try
  {
    var data = a.join(CR);
    fs.writeFileSync(filePath, data);
  }
  catch(e)
  {
    console.log("Error arrayToFile\n Exception:" + e);
    throw e;
  }
}

module.exports = 
{
  removeDuplicates: function (filePath)
  {
    var array = fs.readFileSync(filePath).toString().split(CR);
    var uniquearray = uniq_loop_in(array);
    if (array.length >= uniquearray.length)
      arrayToFile(uniquearray, filePath);
    if (array.length != uniquearray.length)
      console.log("DUPLICATES REMOVED - Before: " + array.length + " - " + "After: " + uniquearray.length);
  }
};
