var positionHelper = 0;

$(document).ready(function() {
	if (currentMode == 1) {
		PersonUserId1 = new Person(1);
		PersonUserId1.setData('Right', 'standing', 200.00);
		window.setInterval('PersonUserId1.handle(1)', 40);

		PersonUserId2 = new Person(2);
		PersonUserId2.setData('Left', 'standing', 500.00);
		window.setInterval('PersonUserId2.handle(2)', 40);

		window.setInterval('bloodFx()', 75);

		if (currentMode == 1 && userId == 1) {
			$(document).keydown(function(event) {
				PersonUserId1.setKey(event.keyCode);
				if ($.inArray(event.keyCode, Array(16, 17, 18, 82, 91, 116))) {
					return false;
				}
			});

			$(document).keyup(function(event) {
				PersonUserId1.setKey(null);
			});
		} else if (currentMode == 1 && userId == 2) {
			$(document).keydown(function(event) {
				PersonUserId2.setKey(event.keyCode);
				if ($.inArray(event.keyCode, Array(16, 17, 18, 82, 91, 116))) {
					return false;
				}
			});

			$(document).keyup(function(event) {
				if ($.inArray(event.keyCode, Array(37, 38, 39, 40, 83) != null)) {
					PersonUserId2.setKey(null);
				}
			});
		}

		socket.on('getCoords', function (data) {
			if (data.currentUser == 1) {
				PersonUserId1.setData(
					data.currentDirection,
					data.currentMove,
					(parseFloat(data.currentPosition) - positionHelper)
				);
			} else if (data.currentUser == 2) {
				PersonUserId2.setData(
					data.currentDirection,
					data.currentMove,
					(parseFloat(data.currentPosition) - positionHelper)
				);
			}
		});
	}
});

function bloodFx() {

	if (String($('.bloodFxLeft, .bloodFxRight').attr('class')).match(/step_([0-9])/) != null) {
		currentFrame = parseInt(String($('.bloodFxLeft, .bloodFxRight').attr('class')).match(/step_([0-9])/)[1]);
	} else {
		currentFrame = -1;
	}

	if (currentFrame < 8) {
		nextFrame = (currentFrame + 1);
		$('.bloodFxLeft, .bloodFxRight')
			.removeClass('step_' + currentFrame)
			.addClass('step_' + nextFrame);
	} else {
		$('.bloodFxLeft, .bloodFxRight').remove();
	}
}

function initializeSession() {

}
