(function() {
	// Clock functionality
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
		clockElement.onmouseenter = function() {
			clockElement.innerHTML = fullTimeString;
		};
		clockElement.onmouseleave = function() {
			clockElement.innerHTML = timeString;
		};
	}

	function initClock() {
		setInterval(updateClock, 1000);
		updateClock();
	}

	// Name edit functionality
	function editName() {
		var nameInput = document.getElementById('nameInput');
		var userNameElement = document.getElementById('userName');

		userNameElement.style.display = 'none';
		nameInput.style.display = 'inline-block';
		nameInput.value = userNameElement.innerText;
		nameInput.focus();
	}

	function saveName() {
		var nameInput = document.getElementById('nameInput');
		var userNameElement = document.getElementById('userName');

		var newName = nameInput.value.trim() || "Your Name";
		userNameElement.innerText = newName;
		userNameElement.style.display = 'inline';
		nameInput.style.display = 'none';

		try {
			localStorage.setItem('userName', newName);
		} catch (e) {
			console.error('LocalStorage is not available:', e);
		}
	}

	// Quote fetching functionality
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

	// Pomodoro timer functionality
	let isRunning = false;
	let timerDuration = 25 * 60;
	let timerId = null;

	function updateDisplay(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		const display = document.getElementById('timer-display');
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

	// Initialize everything on window load
	window.onload = function() {
		loadNameAndQuote();
		initClock();
		document.getElementById('userName').ondblclick = editName;
		document.getElementById('nameInput').onblur = saveName;

		// Set up Pomodoro timer controls
		document.getElementById('start-timer').addEventListener('click', startTimer);
		document.getElementById('pause-timer').addEventListener('click', pauseTimer);
		document.getElementById('reset-timer').addEventListener('click', resetTimer);
		updateDisplay(timerDuration);
	};
})();
