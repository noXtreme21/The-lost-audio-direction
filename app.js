var express  = require('express');
var application = module.exports = express.createServer();
var socketio = require('socket.io').listen(application);

var currentCoords = 0.0;

// Configuration
application.configure(function(){
	application.set('views', __dirname + '/views');
	application.set('view engine', 'jade');
	application.use(express.bodyParser());
	application.use(express.methodOverride());
	application.use(application.router);
	application.use(express.static(__dirname + '/public'));
	application.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Express
application.get(/^\/(|user\/([12]{1,}){1,})$/, function(req, res){
	if (req.params[0] == '') {
		currentMode = 0;
	} else {
		currentMode = 1;
	}

	if (typeof req.params[1] != 'undefined') {
		userId = req.params[1];
	} else {
		userId = 0;
	}

	if (currentMode == 0) {
		res.render('view', {
			title: 'codename: game jam'
		});
	} else {
		res.render('index', {
			title: 'codename: game jam'
		});
	}
});

// Socket IO
socketio.sockets.on('connection', function (socket) {
  	socket.on('setCoords', function(data) {
  		currentCoords = data.data;
		socket.broadcast.emit('getCoords', {
			'currentDirection': data.currentDirection,
			'currentMove': data.currentMove,
			'currentPosition': data.currentPosition,
			'currentUser': data.currentUser
		});
	});
});

// Run application
application.listen(process.env.C9_PORT || 3002);
console.log("Express server listening on port %d in %s mode", application.address().port, application.settings.env);
