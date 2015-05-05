/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */

var Hapi = require('hapi')
    , Socket = require('socket.io')
    //, SerialRead = require('./lib').SerialRead
    , ReadAdapter = require('./../Worker/lib/adapter/mqtt')
    , sockets = new Array();


var Server = new Hapi.Server();
Server.connection({port: 4000});

var io = Socket(Server.listener);
//SerialRead.connect("/dev/ttyACM0");
ReadAdapter.connect();
ReadAdapter.on("serial::close", function(){
    console.error("Seriale chiusa!");
})

ReadAdapter.on("serial::error", function(err){
    console.error(err);
})

ReadAdapter.on("sensor::read", function(data){


   io.emit("sensor::"+data.type, {value: data.value});

})


ReadAdapter.on("status::on", function(){
    io.emit("led::green::on")
})

ReadAdapter.on("status::off", function(){
    io.emit("led::red::on");
})

io.on('connection', function (socket) {

    console.log("Connected");



});

Server.start(function(){
    console.log("Server started");
    ReadAdapter.read();


    ReadAdapter.on("serial::connected", function(){
        console.log("In ascolto su seriale " + ReadAdapter.getPort());
    })
});





