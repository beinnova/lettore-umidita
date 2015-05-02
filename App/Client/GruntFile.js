/**
 * Created by Giorgio Cerruti
 * WebSite: http://beinnova.it
 * Email: info@beinnova.it
 * Date: 02/05/15.
 */

module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Configure Grunt
    grunt.initConfig({

        // grunt-contrib-connect will serve the files of the project
        // on specified port and hostname
        connect: {
            all: {
                options:{
                    port: 9000,
                    hostname: "0.0.0.0",
                    // Prevents Grunt to close just after the task (starting the server) completes
                    // This will be removed later as `watch` will take care of that
                    keepalive: true,
                    base: './app',
                    middleware: function (connect) {
                        return [

                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            )

                        ];
                    }
                }
            }
        }
    });

    // Creates the `server` task
    grunt.registerTask('server',[
        'connect'
    ]);
};
