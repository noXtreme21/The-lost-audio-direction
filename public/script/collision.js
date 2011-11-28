function checkCollision() {
	player1X = parseInt($('#userId1').css('left').replace(/px/, ''));
	player2X = parseInt($('#userId2').css('left').replace(/px/, ''));
	if (player1X > player2X) {
		difference = player1X - player2X
	} else {
		difference = player2X - player1X;
	}

	if (difference <= 90 && $('#userId' + ((userId == 2) ? '1' : '2')).attr('class').match(/(falling|blocking){1,}/) == null) {
		eval('audio_punch_' + Math.floor(Math.random() * 4) + '.play()');
		return true;
	} else if ($('#userId' + ((userId == 2) ? '1' : '2')).attr('class').match(/(blocking){1,}/) != null) {
		eval('audio_punch_' + Math.floor(Math.random() * 4) + '.play()');
		return false;
	} else {
		eval('audio_punch_failed.play()');
		return false;
	}
}

