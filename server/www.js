#!/usr/bin/env node 
'use strict' 
var app = require(`./app`); 
var http = require('http'); 
/** * Get port from environment and store in Express. */ 
var port = process.env.PORT || '3000'; 
app.set('port', port); /** * Create HTTP server. */ 
var server = http.createServer(app); 
/** * Listen on provided port, on all network interfaces. */ 
server.listen(port, '127.0.0.1');