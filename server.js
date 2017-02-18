var http = require('http'),
      fs = require('fs'),
     allImage = [],
     imgEncode = [];
     
http.createServer(function(request, response){
    fs.readdir("./image", function(err, items) {
                    allImage= items;
                    console.log(allImage);
                    console.log("Get Image");
                    });
    for(i=0;i<allImage.length;i++){
        fs.readFile("./image/"+allImage[i], function (err, data) {
            if (err) ;
            imgEncode.push('"data:picture'+i+'/jpg;base64,'+new Buffer(data).toString('base64')+'"');
            console.log('encoeded');
            });
        }
        if(request.method=='GET'){
            response.write('<script>var img=['+imgEncode+'];</script>');
            imgEncode = [];
            console.log("get request");
        }

        fs.readFile('./index.html', function(err, html) {
            console.log("write back");
            response.write(html);
            response.end();
        });  

}).listen(8081);
console.log("server initialized");