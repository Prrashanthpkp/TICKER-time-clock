let is24Hour = true; // Default format 24hr
let selectedTimezone = 'Asia/Kolkata'; // Default timezone

// Function to update clock
function updateClock() {
    const now = new Date();

    // Convert to selected timezone
    let time;
    if (selectedTimezone === 'local') {
        time = now;
    } else {
        // Using Intl API for timezone conversion
        time = new Date(now.toLocaleString('en-US', { timeZone: selectedTimezone }));
    }

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = '';

    if (!is24Hour) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 becomes 12
    }

    const displayHours = String(hours).padStart(2, '0');
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

    document.getElementById('clock').textContent =
        `${displayHours}:${displayMinutes}:${displaySeconds} ${!is24Hour ? ampm : ''}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: selectedTimezone };
    document.getElementById('date').textContent = time.toLocaleDateString(undefined, options);
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// Theme toggle
const themeToggle = document.getElementById('toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    // Change emoji depending on theme
    if (document.body.classList.contains('dark')) {
        themeToggle.textContent = '🌕'; // Light mode emoji
    } else {
        themeToggle.textContent = '☀️'; // Dark mode emoji
    }
});

// 12/24 Hour toggle
const formatToggle = document.getElementById('format-toggle');
formatToggle.addEventListener('click', () => {
    is24Hour = !is24Hour;
    updateClock();
});

// Custom dropdown logic
const dropdown = document.getElementById('dropdown');
const selected = dropdown.querySelector('.selected');
const optionsContainer = dropdown.querySelector('.options');
const optionsList = optionsContainer.querySelectorAll('li');

selected.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

optionsList.forEach(option => {
    option.addEventListener('click', () => {
        // Update selected display
        selected.textContent = option.textContent;
        // Update active class
        optionsList.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        // Update timezone logic
        selectedTimezone = option.dataset.value;
        document.getElementById('tz').value = selectedTimezone;
        dropdown.classList.remove('open');
        updateClock();
    });
});

// Close dropdown if clicking outside
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

