var express = require('express');
var port = 5000;
var os = require('os');
var ip = require('public-ip');
app = express();
http = require('http');
httpServer = http.Server(app);

ip.v4().then(function(ip){
  app.get('/api', function(req,res){
    var somedata = os.networkInterfaces()
    var versionNum = os.release().split('.')[0]
    if(os.platform() === 'win32' && os.arch() === 'x64'){
      var theOS = 'Win64'
    }
    else{
      var theOS = os.platform
    }
    res.end(JSON.stringify({
      "ipaddress": ip,
      "software": os.type() + ' ' + versionNum +'; '+  os.arch() +' ' + theOS,
      "language": req.headers["accept-language"].split(',')[0]
    }))
  })
})
app.listen(process.env.PORT || port);
