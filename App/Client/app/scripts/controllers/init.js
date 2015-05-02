/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */

angular.module('jsNightApp')
.controller('initCtrl', ['$scope','socket', InitCtrl]);

function InitCtrl( $scope, socket){

    $scope.umidityValue = 0
    var self = this;

    socket.on("sensor::umidity", function(data){
       self.umidityValue = data.value;

    })


}