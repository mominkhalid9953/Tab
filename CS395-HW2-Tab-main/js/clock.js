function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Add leading zero if necessary
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    var timeString = hours + ':' + minutes;

    var clockElement = document.getElementById('clock');
    clockElement.innerHTML = timeString;

    // Add event listener to show seconds on hover
    clockElement.addEventListener('mouseenter', function () {
        clockElement.innerHTML = hours + ':' + minutes + ':' + seconds;
    });
}

setInterval(updateClock, 2000);

// Editable name functionality
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
    localStorage.setItem('userName', newName);
}

// Load the stored name on page load
window.onload = function () {
    var storedName = localStorage.getItem('userName');
    var userNameElement = document.getElementById('userName');
    userNameElement.innerText = storedName || "Your Name";

	//Fetch a random quote and display it
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            var quoteElement = document.getElementById('quote');
            quoteElement.innerText = data.content + ' - ' + data.author;
        })
        .catch(error => console.error('Error fetching quote:', error));
};
