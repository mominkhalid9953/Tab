
(function() {
	function updateClock() {
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();

		// Add leading zero if necessary
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		var timeString = hours + ':' + minutes;
		var fullTimeString = hours + ':' + minutes + ':' + seconds;

		var clockElement = document.getElementById('clock');
		clockElement.innerHTML = timeString;

		// Update to show full time string on hover
		clockElement.onmouseenter = function () {
			clockElement.innerHTML = fullTimeString;
		};
		clockElement.onmouseleave = function () {
			clockElement.innerHTML = timeString;
		};
	}

	function initClock() {
	  setInterval(updateClock, 1000);
	  updateClock();
	}

	function editName() {
	  var greetingElement = document.getElementById('greeting');
	  var userNameElement = document.getElementById('userName');
	  var nameInput = document.getElementById('nameInput');

	  var storedName = localStorage.getItem('userName');
	  var currentName = storedName || "Your Name";

	  greetingElement.style.display = 'none';
	  userNameElement.style.display = 'none';
	  nameInput.style.display = 'inline-block';
	  nameInput.value = currentName;
	  nameInput.focus();
	}

	function saveName() {
	  var greetingElement = document.getElementById('greeting');
	  var userNameElement = document.getElementById('userName');
	  var nameInput = document.getElementById('nameInput');

	  var newName = nameInput.value || "Your Name";

	  userNameElement.innerText = newName;
	  greetingElement.style.display = 'inline';
	  userNameElement.style.display = 'inline';
	  nameInput.style.display = 'none';

	// Store the user's name in local storage
	try {
		localStorage.setItem('userName', newName);
	} catch (e) {
		console.error('LocalStorage is not available:', e);
	}
	}

	function loadNameAndQuote() {
		var storedName = localStorage.getItem('userName');
		var userNameElement = document.getElementById('userName');
		userNameElement.innerText = storedName || "Your Name";

		fetch('https://api.quotable.io/random')
		.then(response => response.json())
		.then(data => {
			var quoteElement = document.getElementById('quote');
			quoteElement.innerText = `"${data.content}" - ${data.author}`;
		})
		.catch(error => console.error('Error fetching quote:', error));
	}

	// Initialize everything on window load
	window.onload = function () {
		loadNameAndQuote();
		initClock();
	};
  })();


document.addEventListener('DOMContentLoaded', function() {
	let isRunning = false;
	let timerDuration = 25 * 60;
	let timerId = null;

	const display = document.getElementById('timer-display');
	const startButton = document.getElementById('start-timer');
	const pauseButton = document.getElementById('pause-timer');
	const resetButton = document.getElementById('reset-timer');

	function updateDisplay(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		display.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	}

	function startTimer() {
		if (!isRunning) {
			isRunning = true;
			timerId = setInterval(() => {
				if (timerDuration > 0) {
					timerDuration--;
					updateDisplay(timerDuration);
				} else {
					clearInterval(timerId);
					alert("Time's up!");
					resetTimer();
				}
			}, 1000);
		}
	}

	function pauseTimer() {
		clearInterval(timerId);
		isRunning = false;
	}

	function resetTimer() {
		pauseTimer();
		timerDuration = 25 * 60; // Reset to 25 minutes
		updateDisplay(timerDuration);
	}

	startButton.addEventListener('click', startTimer);
	pauseButton.addEventListener('click', pauseTimer);
	resetButton.addEventListener('click', resetTimer);

	// Initialize display
	updateDisplay(timerDuration);
});

