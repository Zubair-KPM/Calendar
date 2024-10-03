const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const eventModal = document.getElementById('eventModal');
const closeModal = document.querySelector('.close-btn');
const eventTitle = document.getElementById('event-title');
const eventDescription = document.getElementById('event-description');
const liveTime = document.getElementById('live-time');
const monthsList = document.getElementById('months-list');

const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

// Event data
const events = {
    '2024-10-03': { title: 'National Holiday', description: 'Celebration of an important event.' },
    '2024-10-15': { title: 'Meeting', description: 'Team meeting at 3:00 PM.' }
};

// Close modal on click
closeModal.addEventListener('click', () => {
    eventModal.style.display = 'none';
});

// Variables to track the current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Function to show live date and time
function updateLiveTime() {
    const now = new Date();
    liveTime.textContent = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

// Update live time every second
setInterval(updateLiveTime, 1000);

// Generate the calendar dynamically
function generateCalendar(month, year) {
    const today = new Date();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentDate = today.getDate();
    const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

    // Set the month-year header
    monthYear.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Clear previous calendar content
    calendarBody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            const cellText = document.createTextNode(date <= daysInMonth && (i > 0 || j >= firstDay) ? date : '');

            if (date <= daysInMonth && (i > 0 || j >= firstDay)) {
                cell.appendChild(cellText);
                const eventKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;

                // Highlight the current date if in the current month and year
                if (isCurrentMonth && date === currentDate) {
                    cell.classList.add('today');
                }

                // Add event days
                if (events[eventKey]) {
                    cell.classList.add('event-day');
                    cell.addEventListener('click', () => showEvent(eventKey));
                }

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);

        if (date > daysInMonth) {
            break;
        }
    }

    // Show remaining months
    showRemainingMonths(month);
}

// Function to display remaining months of the year
function showRemainingMonths(currentMonth) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Clear previous remaining months
    monthsList.innerHTML = '';

    // Add remaining months after the current month
    for (let i = currentMonth + 1; i < 12; i++) {
        const monthItem = document.createElement('li');
        monthItem.textContent = monthNames[i];
        monthsList.appendChild(monthItem);
    }
}

// Show event modal
function showEvent(date) {
    const event = events[date];
    eventTitle.textContent = event.title;
    eventDescription.textContent = event.description;
    eventModal.style.display = 'block';
}

// Handle next month navigation
nextMonthBtn.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Handle previous month navigation
prevMonthBtn.addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
});

// Generate the calendar for the current month and year on load
generateCalendar(currentMonth, currentYear);
