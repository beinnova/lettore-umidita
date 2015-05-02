/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */

var SerialPort = require('serialport')
    , Events = require('events')
    , util = require('util')
    , sp = null


/**
 *
 * @constructor SerialReader
 */
function SerialReader(){


    Events.EventEmitter.call(this);

}

util.inherits(SerialReader, Events.EventEmitter);

SerialReader.prototype.getPort = function(){
    return this._port;
}
/**
 * @function connect
 */
SerialReader.prototype.connect = function(port){

    if(undefined === port)
        throw Error("Porta mancante");

    this._port = port;

    //Mi metto in ascolto sulla seriale
    sp = new SerialPort.SerialPort(this._port, {
        baudrate: 9600
        , parser: SerialPort.parsers.readline("\n")
    })

    var self = this;

    /**
     * @listens open
     */
    sp.on("open", function(){

        /**
         * @event serial::connected
         *
         */
       self.emit("serial::connected");

    })

    /**
     * @listens close
     */
    sp.on("close", function(){

        /**
         * @event serial::closed
         *
         */
        self.emit("serial::close");

    })

    /**
     * @listes error
     */
    sp.on("error", function(err){

        /**
         * @event serial::error
         * @type {object}
         *
         */
        self.emit("serial::error", err);

    })


}

/**
 * @function read
 * @event sensor::read
 * @event status::on
 * @event status::off
 */
SerialReader.prototype.read = function(){

    var self = this
        , _data = null;

    sp.on("data", function(data){

        _data = JSON.parse(data);

        for(property in _data){

            if(property != 'status')
                /**
                 * @event sensor::read
                 * @type {object}
                 * @property {string} type - Nome del sensore
                 * @property {number} value - Valore lettura
                 */
                self.emit("sensor::read", {type: property, value: _data[property]})
            else
                if(_data[property])
                    /**
                     * @event status::on
                     */
                    self.emit("status::on");
                else
                    /**
                     * @event status::off
                     */
                    self.emit("status::off");
        }
    })
}

/**
 *
 * @type {SerialReader}
 */
exports.SerialRead = new SerialReader();