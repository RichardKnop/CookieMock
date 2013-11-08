"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        qunit: {
            unit: 'test.html'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', 'qunit:unit');

};