'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
	function Stopwatch(display) {
		_classCallCheck(this, Stopwatch);

		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
	}

	_createClass(Stopwatch, [{
		key: 'reset',
		value: function reset() {
			this.times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			};
		}
	}, {
		key: 'print',
		value: function print() {
			this.display.innerText = this.format(this.times);
		}
	}, {
		key: 'format',
		value: function format(times) {
			return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: 'start',
		value: function start() {
			var _this = this;

			if (!this.running) {
				this.running = true;
				this.watch = setInterval(function () {
					return _this.step();
				}, 10);
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.running) return;
			this.calculate();
			this.print();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			this.times.miliseconds += 1;
			if (this.times.miliseconds >= 100) {
				this.times.seconds += 1;
				this.times.miliseconds = 0;
			}
			if (this.times.seconds >= 60) {
				this.times.minutes += 1;
				this.times.seconds = 0;
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.running = false;
			clearInterval(this.watch);
		}
	}, {
		key: 'resetWatch',
		value: function resetWatch() {
			this.reset();
			this.print();
		}
	}, {
		key: 'save',
		value: function save() {
			var resultsList = document.getElementById('ul');
			var resultsItem = document.createElement('li');
			var result = this.format(this.times);

			resultsItem.innerHTML = result;
			resultsItem.setAttribute('id', 'item');
			resultsList.appendChild(resultsItem);
		}
	}, {
		key: 'clear',
		value: function clear() {
			var resultsList = document.getElementById('ul');
			if (resultsList.lastChild) {
				resultsList.innerHTML = '';
			}
		}
	}]);

	return Stopwatch;
}();

function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
	return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
	return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
	return stopwatch.resetWatch();
});

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function () {
	return stopwatch.save();
});

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function () {
	return stopwatch.clear();
});