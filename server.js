var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Gpio = require('onoff').Gpio,
    led = new Gpio(18, 'out' );
var fs = require('fs');
var Gpio = require('onoff').Gpio,
    led2 = new Gpio(23, 'out' );
var Gpio = require('onoff').Gpio,
    led3 = new Gpio(24, 'out' );
var Gpio = require('onoff').Gpio,
    led4 = new Gpio(25, 'out' );
var exec = require('child_process').exec,
    child;
var Gpio = require('onoff').Gpio,
    buzz = new Gpio(12, 'out' );




app.get("/",function(req, res){
  res.sendfile("index.html");
});

var count=1;
var personcnt=0;
var connectedSB = "현재접속자수 ";
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);
	personcnt++;
	
  var name = "사용자" + count++;
buzz.writeSync(1);
                setTimeout(function(){buzz.writeSync(0)},300);
led2.writeSync(1);
                setTimeout(function(){led2.writeSync(0)},300);
  io.to(socket.id).emit('change name',name);

  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
	personcnt--;
	buzz.writeSync(1);
                setTimeout(function(){buzz.writeSync(0)},300);
led3.writeSync(1);
                setTimeout(function(){led3.writeSync(0)},300);

  });


  socket.on('send message', function(name,text){
    var msg = name + ' : ' + text;
    console.log(msg);
        if(text=="led1on")
        {
                led.writeSync(1);
        }
	 if(text=="led1off")
        {
                led.writeSync(0);
        }
 if(text=="led2on")
        {
                led2.writeSync(1);
        }
 if(text=="led2off")
        {
                led2.writeSync(0);
        }

if(text=="led3on")
        {
                led3.writeSync(1);
        }
if(text=="led3off")
        {
                led3.writeSync(0);
        }
if(text=="led4on")
        {
                led4.writeSync(1);
        }
if(text=="led4off")
        {
                led4.writeSync(0);
        }
if(text=="우찬")
        {
		 buzz.writeSync(1);
		setTimeout(function(){buzz.writeSync(0)},300);
		
		buzz.writeSync(1);
                setTimeout(function(){buzz.writeSync(0)},300);

                led.writeSync(1);
		setTimeout(function(){led.writeSync(0)},1000);
//		exec("", function (error, stdout, stderr) {
//    console.log('stdout: ' + stdout);
//    console.log('stderr: ' + stderr);
//    if (error !== null) {
//        console.log('exec error: ' + error);
//    }
// });
        }

if(text=="kill")
        {	
		buzz.writeSync(1);
                setTimeout(function(){buzz.writeSync(0)},1000);

                led.writeSync(1);
                setTimeout(function(){led.writeSync(0)},1000);
//		exec("", function (error, stdout, stderr) {
//    console.log('stdout: ' + stdout);
//    console.log('stderr: ' + stderr);
//    if (error !== null) {
//        console.log('exec error: ' + error);
//    }
// });

        }
if(text=="fool")
        {
		buzz.writeSync(1);
                setTimeout(function(){buzz.writeSync(0)},1000);

                led.writeSync(1);
                setTimeout(function(){led.writeSync(0)},1000);
//		exec("", function (error, stdout, stderr) {
//    console.log('stdout: ' + stdout);
//    console.log('stderr: ' + stderr);
//    if (error !== null) {
//        console.log('exec error: ' + error);
//    }
// });

        }

if(text=="raspivid")
        {
                exec("", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});

        }


if(text=="buzzon")
        {
                buzz.writeSync(1);
        }
if(text=="buzzoff")
        {
                buzz.writeSync(0);
        }

if(text=="thread1")
        {
		for(;;){
                led.writeSync(1);
                setTimeout(function(){led.writeSync(0)},1000);
		}

        }







    io.emit('receive message', msg);
  });
});

http.listen('3000', function(){
  console.log("server on!");
});

