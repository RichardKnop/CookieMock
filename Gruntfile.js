"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        qunit: {
            unit: 'test.html'
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask('test', 'qunit:unit');

};