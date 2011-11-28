var block = 0;
var volume = 0;

	var selector, to;

function init() {

	var backgroundMedia = soundManager.createSound({
		id: 'backgroundMedia',
		url: '/media/hiphop.mp3',
		volume: 0,
		multiShot: true,
		autoLoad: true,
		usePeakData: true,
		whileplaying: function() {
			peak = Math.round(((this.peakData.left + this.peakData.right) / 2) * 255);
			peakColor = peak.toString(16);
			peakColor = '#' + peakColor + peakColor + peakColor;
			$('.world').css('background-color', peakColor);

			if (parseInt($('#statusPlayer2 .energy').css('width').replace(/px/, '')) <= parseInt($('#statusPlayer1 .energy').css('width').replace(/px/, ''))) {
				audio1Vol = 100;
			} else {
				audio1Vol = 0;
			}
		}
	});

	var backgroundMediaRock = soundManager.createSound({
		id: 'backgroundMediaRock',
		url: '/media/highway.mp3',
		volume: 0,
		multiShot: true,
		autoLoad: true,
		usePeakData: true,
		whileplaying: function() {
			peak = Math.round(((this.peakData.left + this.peakData.right) / 2) * 255);
			peakColor = peak.toString(16);
			peakColor = '#' + peakColor + '0000';
			$('.world').css('background-color', peakColor);

			if (parseInt($('#statusPlayer2 .energy').css('width').replace(/px/, '')) > parseInt($('#statusPlayer1 .energy').css('width').replace(/px/, ''))) {
				audio2Vol = 100;
			} else {
				audio2Vol = 0;
			}
		}
	});


	audio_punch_0 = soundManager.createSound({
		id: 'audio_punch_0',
		url: '/media/effects/punch_0.mp3',
		volume: 100,
		multiShot: true,
		autoLoad: true
	});
	audio_punch_1 = soundManager.createSound({
		id: 'audio_punch_1',
		url: '/media/effects/punch_1.mp3',
		volume: 100,
		multiShot: true,
		autoLoad: true
	});
	audio_punch_2 = soundManager.createSound({
		id: 'audio_punch_2',
		url: '/media/effects/punch_2.mp3',
		volume: 100,
		multiShot: true,
		autoLoad: true
	});
	audio_punch_3 = soundManager.createSound({
		id: 'audio_punch_3',
		url: '/media/effects/punch_3.mp3',
		volume: 100,
		multiShot: true,
		autoLoad: true
	});
	audio_punch_failed = soundManager.createSound({
		id: 'audio_punch_failed',
		url: '/media/effects/punch_failed.mp3',
		volume: 100,
		multiShot: true,
		autoLoad: true
	});
	audio_die = soundManager.createSound({
		id: 'audio_die',
		url: '/media/effects/die.mp3',
		volume: 100,
		multiShot: true,
		autoLoad: true
	});

	if (currentMode == 1 && userId == 1) {
		backgroundMedia.play();
		backgroundMediaRock.play();
	}

}

var audio1 = 'backgroundMedia';
var audio1Cur = 0;
var audio1Vol = 100;

var audio2 = 'backgroundMediaRock';
var audio2Cur = 0;
var audio2Vol = 0;

window.setInterval(function() {
	if (audio1Cur < audio1Vol) {
		audio1Cur += 5;
		soundManager.setVolume(audio1, audio1Cur);
	} else if (audio1Cur > audio1Vol) {
		audio1Cur -= 5;
		soundManager.setVolume(audio1, audio1Cur++);
	}

	if (audio2Cur < audio2Vol) {
		audio2Cur += 5;
		soundManager.setVolume(audio2, audio2Cur);
	} else if (audio2Cur > audio2Vol) {
		audio2Cur -= 5;
		soundManager.setVolume(audio2, audio2Cur);
	}

}, 100);

	soundManager.preferFlash = true;
	soundManager.flashVersion = 9;
	soundManager.url = '/swf/';
	soundManager.useHighPerformance = true;
	soundManager.debugMode = false;
	soundManager.defaultOptions.multiShot = true;
	soundManager.usePeakData = true;

soundManager.onload = function() {
	if (currentMode == 1) {
	  init();
	}
}
