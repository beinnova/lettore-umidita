/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */

var Hapi = require('hapi')
    , Socket = require('socket.io')
    , MQTT = require('mqtt');



var Server = new Hapi.Server();
Server.connection({port: 4000});

var io = Socket(Server.listener);

var MqttClient = MQTT.connect({
    protocolId: 'MQIsdp',
    protocolVersion: 3
})


Server.start(function(){
    console.log("Server started");

    MqttClient.on('connect', function(){
        console.log("Client MQTT Connesso");
    });

    MqttClient.subscribe('read/#');

    MqttClient.on('message', function(topic, message){

        var _topics = topic.split('/')
            , _message = message.toString()
            , _event = '';

        if(_topics[1] === 'status'){

             _event = _message == '0'? 'led::off':'led::on';
        }else{

            _event = 'sensor::'+_topics[1];
        }

        io.emit(_event,{value: _message});

    })


});





