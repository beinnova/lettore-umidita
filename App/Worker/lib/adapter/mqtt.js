/**
 * Created by Giorgio Cerruti
 * email : giorgio.cerruti@beinnova.it
 * Web Site : http://www.beinnova.it
 * On : 04/05/15.
 */

var MQTT = require('mqtt')
    , util = require('util')
    , Events = require('events');


function mqttAdapter(){

    this.client = null;
    Events.EventEmitter.call(this);



}

util.inherits(mqttAdapter, Events.EventEmitter);


mqttAdapter.prototype.connect = function(server){

    var self = this;
    this.client = MQTT.connect(server || '');

    this.client.on('connect', function(){
        /**
         * @event serial::connected
         *
         */
        self.emit("serial::connected");
    })
}

mqttAdapter.prototype.read = function(){

    var self = this;
    this.client.on('message', function(topic, data){

        var _topics = topic.split('/');

        if(_topics[1] === status)
            if(data.toString() === "0")
                self.emit("led::red::on")
            else
                self.emit("led::green::on")
        else
            self.client.emit("sensor::"+_topics[1], {value: data.toString()});

    })
}

module.exports = exports = new mqttAdapter();