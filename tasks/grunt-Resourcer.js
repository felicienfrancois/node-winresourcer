'use strict';
module.exports = function(grunt) {

	grunt.registerMultiTask('resourcer', 'Edit windows executable resources', function() {
		var resourcer = require("../lib/Resourcer.js");
		var done = this.async();
		resourcer(this.data, function(error) {
			done(!error);
		});
	});

};
