/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 05/05/15.
 */

var MQTT = require('mqtt')
, SerialPort = require('serialport');


var serialport = new SerialPort.SerialPort("/dev/ttyACM0",{
    baudrate: 9600
    , parser: SerialPort.parsers.readline("\n")

});

var MqttClient = MQTT.connect(null, {
    protocolId: 'MQIsdp',
    protocolVersion: 3
});



serialport.on('open', function(){
    console.log("In ascolto su seriale!");
})

serialport.on('close', function(){
    console.log("Connesisone chiusa!")
})

serialport.on('data', function(data){

    var _data = JSON.parse(data);

    for(sensor in _data){
        var _topic = 'read/' + sensor;
        MqttClient.publish(_topic, _data[sensor]);
    }



})

MqttClient.on('connect', function(){
    console.log("Connesso al Bocker!");
})

