var http = require('http');  
var fs = require('fs');  
var Gpio = require('onoff').Gpio,  
    led = new Gpio(18, 'out' );  
  
  
http.createServer(function (request, response) {  
    if (request.method == 'GET') {  
        // GET 요청이 들어오면 웹페이지를 웹브라우저에 전송한다.  
        fs.readFile('index.html', function (error, data) {  
            response.writeHead(200, { 'Content-Type': 'text/html' });  
            response.end(data);  
        });  
    } else if (request.method == 'POST') {  
        // POST 요청이 들어오면 전송받은 데이터를 비교하여 LED를 제어한다.  
        request.on('data', function (data) {  
        if ( data == "radio=ON" ) led.writeSync(1);  
        else led.writeSync(0);  
  
        });  
    }  
}).listen(9999, function () {  
    console.log('Server Running at http://127.0.0.1:9999');  
});
