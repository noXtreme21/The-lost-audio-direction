function Person() {
	this.currentDirection = 'Right';
	this.currentMove = 'standing';
	this.currentPosition = 0.0;
	this.currentEnergy = 100.0;
	this.socketPositionHelper = 0;
	this.hashValue = String(this.currentDirection + this.currentMove + this.currentPosition);

	this.handle = function(user) {
		doAction = this.currentMove + this.currentDirection;
		eval('this.' + doAction + '(' + user + ');');

		$('#statusPlayer' + user + ' .energy').css('width', this.currentEnergy + '%');
		if (this.currentEnergy <= 0) {
			this.currentMove = 'falling';
		}

		if (user == userId) {
			skylinePosition = ((10 * (this.currentPosition / 100)) * -1);
			backgroundPosition = ((50 * (this.currentPosition / 100)) * -1);
			foregroundPosition = ((150 * (this.currentPosition / 100)) * -1);

			$('.skyline').css('background-position', String(skylinePosition) + 'px 0px');
			$('.background').css('background-position', String(backgroundPosition) + 'px 0px');
			$('.foreground').css('background-position', String(foregroundPosition) + 'px 0px');

		this.syncronize(this.currentDirection, this.currentMove, this.currentPosition, this.hashValue, user);

		}
	}

	this.syncronize = function(direction, move, position, hash, user) {
		if (currentMode == 1 && user == userId && String(direction + move + position) != hash) {
			this.hashValue = String(direction + move + position);
			socket.emit('setCoords', {
				'currentDirection': direction,
				'currentMove': move,
				'currentPosition': parseFloat(position + positionHelper),
				'currentUser': user
			});
		}
	}

	this.setData = function(direction, move, position) {
		this.hashValue = String(direction + move + position);
		this.currentDirection = direction;
		this.currentMove = move;

		if (position != null) {
			this.currentPosition = position;
		}
	}

	this.energyDown = function(amount) {
		this.currentEnergy -= amount;
		if (this.currentEnergy < 0) {
			this.currentEnergy = 0;
		}

	}

	this.setKey = function(keyCode) {
		if (this.currentMove.match(/(punching|kicking|hitted|falling)/) == null) {
			switch (keyCode) {
				case 37:
					this.currentDirection = 'Left';
					this.currentMove = 'walking';
					break;
				case 39:
					this.currentDirection = 'Right';
					this.currentMove = 'walking';
					break;
				case 70:
					this.currentMove = 'punching';
					break;
				case 68:
					this.currentMove = 'kicking';
					break;
				case 83:
					this.currentMove = 'blocking';
					break;
				case null:
					this.currentMove = 'standing';
					break;
			}
		}

	}

	this.standingRight = function(user) {
		if (String($('#userId' + user).attr('class')).match(/standingRight_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/standingRight_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		nextFrame = (currentFrame < 8) ? (currentFrame + 1) : 0;

		$('#userId' + user)
			.attr('class', 'person')
			.addClass('standingRight_' + nextFrame);
	}

	this.standingLeft = function(user) {
		if (String($('#userId' + user).attr('class')).match(/standingLeft_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/standingLeft_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		nextFrame = (currentFrame < 8) ? (currentFrame + 1) : 0;

		$('#userId' + user)
			.attr('class', 'person')
			.addClass('standingLeft_' + nextFrame);
	}

	this.walkingRight = function(user) {
		if (String($('#userId' + user).attr('class')).match(/walkingRight_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/walkingRight_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		nextFrame = (currentFrame < 8) ? (currentFrame + 1) : 0;

		this.currentPosition += 8;
		if (this.currentPosition > ($('.world').width() - 75) && user == userId) {
			this.currentPosition = ($('.world').width() - 75);
		} else if (user == userId) {
			currrentEnemeyPosition = $('#userId' + ((userId == 2) ? 1 : 2)).css('left').replace(/px/, '');
			$('#userId' + ((userId == 2) ? 1 : 2)).css('left', String(parseInt(currrentEnemeyPosition) - 4) + 'px');
			positionHelper += 4
		}

		$('#userId' + user)
			.attr('class', 'person')
			.addClass('walkingRight_' + nextFrame)
			.css('left', String(this.currentPosition) + 'px');
	}

	this.walkingLeft = function(user) {
		if (String($('#userId' + user).attr('class')).match(/walkingLeft_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/walkingLeft_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		nextFrame = (currentFrame < 8) ? (currentFrame + 1) : 0;

		this.currentPosition -= 8;
		if (this.currentPosition < 0 && user == userId) {
			this.currentPosition = 0;
		} else if (user == userId) {
			currrentEnemeyPosition = $('#userId' + ((userId == 2) ? 1 : 2)).css('left').replace(/px/, '');
			$('#userId' + ((userId == 2) ? 1 : 2)).css('left', String(parseInt(currrentEnemeyPosition) + 4) + 'px');
			positionHelper -= 4
		}

		$('#userId' + user)
			.attr('class', 'person')
			.addClass('walkingLeft_' + nextFrame)
			.css('left', String(this.currentPosition) + 'px');
	}

	this.punchingRight = function(user) {
		if (String($('#userId' + user).attr('class')).match(/punchingRight_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/punchingRight_([0-9])/)[1]);
		} else {
			currentFrame = -1
		}

		if (currentFrame < 5) {
			if (currentFrame == 2 && checkCollision() == true) {
				if (user == 2) {
					PersonUserId1.setData('Left', 'hitted', null);
					PersonUserId1.energyDown(2);
				} else {
					PersonUserId2.setData('Left', 'hitted', null);
					PersonUserId2.energyDown(2);
				}
			}

			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('punchingRight_' + nextFrame);
		} else {
			this.currentMove = 'standing';
		}
	}

	this.punchingLeft = function(user) {
		if (String($('#userId' + user).attr('class')).match(/punchingLeft_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/punchingLeft_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 5) {
			if (currentFrame == 2 && checkCollision() == true) {
				if (user == 2) {
					PersonUserId1.setData('Right', 'hitted', null);
					PersonUserId1.energyDown(2);
				} else {
					PersonUserId2.setData('Right', 'hitted', null);
					PersonUserId2.energyDown(2);
				}
			}

			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('punchingLeft_' + nextFrame);
		} else {
			this.currentMove = 'standing';
		}
	}

	this.kickingRight = function(user) {
		if (String($('#userId' + user).attr('class')).match(/kickingRight_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/kickingRight_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 7) {
			if (currentFrame == 4 && checkCollision() == true) {
				if (user == 2) {
					PersonUserId1.setData('Left', 'hitted', null);
					PersonUserId1.energyDown(4);
				} else {
					PersonUserId2.setData('Left', 'hitted', null);
					PersonUserId2.energyDown(4);
				}
			}

			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('kickingRight_' + nextFrame);
		} else {
			this.currentMove = 'standing';
		}
	}

	this.kickingLeft = function(user) {
		if (String($('#userId' + user).attr('class')).match(/kickingLeft_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/kickingLeft_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 7) {
			if (currentFrame == 4 && checkCollision() == true) {
				if (user == 2) {
					PersonUserId1.setData('Right', 'hitted', null);
					PersonUserId1.energyDown(4);
				} else {
					PersonUserId2.setData('Right', 'hitted', null);
					PersonUserId2.energyDown(4);
				}
			}

			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('kickingLeft_' + nextFrame);
		} else {
			this.currentMove = 'standing';
		}
	}

	this.hittedRight = function(user) {
		if (String($('#userId' + user).attr('class')).match(/hittedRight_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/hittedRight_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 2) {
			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('hittedRight_' + nextFrame);
			if (currentFrame == -1) {
				$('#userId' + user)
					.append('<div class="bloodFxLeft"></div>');
			}
		} else {
			this.currentMove = 'standing';
		}
	}

	this.hittedLeft = function(user) {
		if (String($('#userId' + user).attr('class')).match(/hittedLeft_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/hittedLeft_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 2) {
			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('hittedLeft_' + nextFrame);
			if (currentFrame == -1) {
				$('#userId' + user)
					.append('<div class="bloodFxRight"></div>');
			}
		} else {
			this.currentMove = 'standing';
		}
	}



	this.blockingRight = function(user) {
		if (String($('#userId' + user).attr('class')).match(/blockingRight_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/blockingRight_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 2) {
			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('blockingRight_' + nextFrame);
		}
	}

	this.blockingLeft = function(user) {
		if (String($('#userId' + user).attr('class')).match(/blockingLeft_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/blockingLeft_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 2) {
			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('blockingLeft_' + nextFrame);
		}
	}

	this.fallingRight = function(user) {
		if (String($('#userId' + user).attr('class')).match(/fallingRight_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/fallingRight_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 5) {
			if (currentFrame == -1) {
				audio_die.play();
			}

			if (currentFrame == 4) {
				if (user == userId) {
					$('#message').text('GAME OVER!');
				} else {
					$('#message').text('YOU WIN!');
				}

				$('.restartLayer').fadeIn('slow');
			}

			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('fallingRight_' + nextFrame);
		}
	}

	this.fallingLeft = function(user) {
		if (String($('#userId' + user).attr('class')).match(/fallingLeft_([0-9])/) != null) {
			currentFrame = parseInt(String($('#userId' + user).attr('class')).match(/fallingLeft_([0-9])/)[1]);
		} else {
			currentFrame = -1;
		}

		if (currentFrame < 5) {
			if (currentFrame == -1) {
				audio_die.play();
			}

			if (currentFrame == 4) {
				if (user == userId) {
					$('#message').text('GAME OVER!');
				} else {
					$('#message').text('YOU WIN!');
				}

				$('.restartLayer').fadeIn('slow');
			}

			nextFrame = (currentFrame + 1);
			$('#userId' + user)
				.attr('class', 'person')
				.addClass('fallingLeft_' + nextFrame);
		}
	}
}
