/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */

var Hapi = require('hapi')
    , Socket = require('socket.io')
    , SerialRead = require('./lib').SerialRead
    , sockets = new Array();


var Server = new Hapi.Server();
Server.connection({port: 4000});

var io = Socket(Server.listener);
SerialRead.connect("/dev/ttyACM0");

SerialRead.on("serial::close", function(){
    console.error("Seriale chiusa!");
})

SerialRead.on("serial::error", function(err){
    console.error(err);
})

SerialRead.on("sensor::read", function(data){


   io.emit("sensor::"+data.type, {value: data.value});

})


SerialRead.on("status::on", function(){
    io.emit("led::green::on")
})

SerialRead.on("status::off", function(){
    io.emit("led::red::on");
})

io.on('connection', function (socket) {

    socket.push(socket);



});

Server.start(function(){
    console.log("Server started");
    SerialRead.read();


    SerialRead.on("serial::connected", function(){
        console.log("In ascolto su seriale " + SerialRead.getPort());
    })
});





