'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function(options, callback) {
	var cmdLine = path.resolve(__dirname, '..', 'bin', 'ResHacker.exe');
	
	var command = [];
	
	if (!options.operation) {
		throw new Error("Missing argument 'operation' (Required)");
	}
	var operation;
	switch(options.operation.toLowerCase()) {
		case "add":
			operation = "add";
			break;
		case "upd":
		case "update":
			operation = "upd";
			break;
		case "extract":
		case "ext":
			operation = "ext";
			break;
		case "delete":
		case "del":
			operation = "del";
			break;
		default:
			throw new Error("Invalid argument 'operation'. Should be one of Add, Update, Extract or Delete");
	}
	command.push("-op:"+operation);
	
	if(!options.exeFile) {
		throw new Error("Missing argument 'exeFile' (Required)");
	}
	command.push("-src:'"+options.exeFile+"'");
	
	if(!options.resourceType) {
		throw new Error("Missing argument 'resourceType' (Required)");
	}
	command.push("-type:"+options.resourceType);
	
	if(!options.resourceName) {
		throw new Error("Missing argument 'resourceName' (Required)");
	}
	command.push("-name:"+options.resourceName);
	
	if(operation !== "del" && operation !== "upd" && !options.lang) {
		throw new Error("Missing argument 'lang' (Required for Add and Extract)");
	}
	if (options.lang) {
		command.push("-lang:"+options.lang);
	}
	
	if(operation !== "del" && !options.resourceFile) {
		throw new Error("Missing argument 'resourceFile' (Required for Add, Update (source file) and Extract (dest file))");
	}
	if (options.resourceFile) {
		command.push("-file:"+options.resourceFile);
	}
	
	if (process.platform !== "win32") {
		command.unshift(cmdLine);
		cmdLine = "wine";
	}

	var child = spawn(cmdLine, command);
	child.stdout.pipe(process.stdout);
	child.stderr.pipe(process.stderr);
	var stderr = '';
	child.on('error', function(err) {
		if (callback) {
			callback(err);
		}
	});
	child.stderr.on('data', function(data) {
		stderr += data;
	});
	child.on('close', function(code) {
		if (code === 0) {
			if (callback) {
				callback(null);
			}
		} else {
			if (callback) {
				callback(stderr);
			}
		}
	});
};