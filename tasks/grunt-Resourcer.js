'use strict';
module.exports = function(grunt) {

	grunt.registerMultiTask('resourcer', 'Edit windows executable resources', function() {
		var resHacker = require("../lib/Resourcer.js");
		var done = this.async();
		resHacker(this.data, function(error) {
			done(!error);
		});
	});

};
