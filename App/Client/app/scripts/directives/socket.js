/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */


angular.module('socket.directives', [])
.factory("socket", ["socketFactory", Socket]);

function Socket(socketFactory){
    return socketFactory({
        ioSocket: io.connect('http://localhost:4000')
    });
}
