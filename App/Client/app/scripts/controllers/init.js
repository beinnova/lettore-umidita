/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */

angular.module('jsNightApp')
.controller('initCtrl', ['$scope','socket', InitCtrl]);

function InitCtrl( $scope, socket){

    $scope.umidityValue = 0;
    var self = this;


    socket.on("sensor::humidity", function(data){
       self.humidityValue = data.value;

    })

    socket.on('led::on', function(data){
        console.log("On");
        self.led = {
            status: true,
            message: "ON"
        };
    })

    socket.on('led::off', function(data){
        self.led = {
            status: false,
            message: "OFF"
        };
    })


}