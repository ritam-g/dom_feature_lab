// Function to open and close full-page features
function openFeatures() {
    const allElems = document.querySelectorAll('.elem');
    const fullElemPage = document.querySelectorAll('.fullElem');
    const fullElemPageBackBtn = document.querySelectorAll('.fullElem .back');

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block';
        });
    });

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none';
        });
    });
}

openFeatures();


// --- To Do List Feature ---
function todoList() {
    let currentTask = JSON.parse(localStorage.getItem('currentTask')) || [];

    const allTaskContainer = document.querySelector('.allTask');
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskDetailsInput = document.getElementById('task-details-input');
    const taskCheckbox = document.getElementById('check');

    function renderTask() {
        let sum = '';
        currentTask.forEach(function (elem, idx) {
            sum += `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>IMPORTANT</span></h5>
                        <button id=${idx}>Mark as Completed</button>
                    </div>`;
        });

        allTaskContainer.innerHTML = sum;
        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        // Add event listeners to the new buttons
        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Optional: Show detail alert before deleting
                // alert(`Task: ${currentTask[btn.id].task}\nDetails: ${currentTask[btn.id].details}`);
                currentTask.splice(parseInt(btn.id), 1);
                renderTask();
            });
        });
    }
    
    // Initial render
    renderTask();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (taskInput.value.trim() === '') return;

        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckbox.checked,
        });
        renderTask();

        // Reset form inputs
        taskCheckbox.checked = false;
        taskInput.value = '';
        taskDetailsInput.value = '';
    });
}

todoList();


// --- Daily Planner Feature ---
function dailyPlanner() {
    const dayPlanner = document.querySelector('.day-planner');
    const dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};
    
    // Planner from 6:00 to 23:00 (18 hours)
    const hours = Array.from({ length: 18 }, (_, idx) => `${String(6 + idx).padStart(2, '0')}:00 - ${String(7 + idx).padStart(2, '0')}:00`);
    
    let wholeDaySum = '';
    hours.forEach(function (elem, idx) {
        const savedData = dayPlanData[idx] || '';

        wholeDaySum += `<div class="day-planner-time">
                            <p>${elem}</p>
                            <input id=${idx} type="text" placeholder="What are you planning?" value="${savedData}">
                        </div>`;
    });

    dayPlanner.innerHTML = wholeDaySum;

    const dayPlannerInput = document.querySelectorAll('.day-planner input');

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            // Save data to the object on input change
            dayPlanData[elem.id] = elem.value;
            // Update Local Storage
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
        });
    });
}

dailyPlanner();


// --- Motivational Quote Feature ---
function motivationalQuote() {
    const motivationQuoteContent = document.getElementById('quote-content');
    const motivationAuthor = document.getElementById('quote-author');

    async function fetchQuote() {
        try {
            let response = await fetch('https://api.quotable.io/random');
            let data = await response.json();

            motivationQuoteContent.innerHTML = data.content;
            motivationAuthor.innerHTML = data.author;
        } catch (error) {
            console.error("Error fetching quote:", error);
            motivationQuoteContent.innerHTML = "Productivity is being able to do things you were never able to do before.";
            motivationAuthor.innerHTML = "Frank Kafka";
        }
    }

    fetchQuote();
}

motivationalQuote();


// --- Pomodoro Timer Feature (Fixed to 1-second interval) ---
function pomodoroTimer() {
    const timerDisplay = document.querySelector('.pomo-timer h1');
    const startBtn = document.querySelector('.pomo-timer .start-timer');
    const pauseBtn = document.querySelector('.pomo-timer .pause-timer');
    const resetBtn = document.querySelector('.pomo-timer .reset-timer');
    const sessionDisplay = document.querySelector('.pomodoro-fullpage .session');
    
    let isWorkSession = true;
    let totalSeconds = 25 * 60; // Start with 25 minutes
    let timerInterval = null;

    function updateTimerDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function countdown() {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
            timerInterval = setTimeout(countdown, 1000); // 1-second interval
        } else {
            clearInterval(timerInterval);
            isWorkSession = !isWorkSession; // Toggle session type
            
            if (isWorkSession) {
                // Break is over, start new work session
                totalSeconds = 25 * 60;
                sessionDisplay.innerHTML = 'Work Session';
                sessionDisplay.style.backgroundColor = 'var(--green)';
            } else {
                // Work is over, start break
                totalSeconds = 5 * 60;
                sessionDisplay.innerHTML = 'Take a Break';
                sessionDisplay.style.backgroundColor = 'var(--blue)';
            }
            updateTimerDisplay();
            // Optionally auto-start next session
            // startTimer();
        }
    }

    function startTimer() {
        if (timerInterval) return; // Prevent multiple intervals
        startBtn.style.backgroundColor = 'var(--tri2)';
        startBtn.style.color = 'var(--pri)';
        countdown();
    }

    function pauseTimer() {
        clearTimeout(timerInterval);
        timerInterval = null;
        startBtn.style.backgroundColor = 'var(--green)';
        startBtn.style.color = 'var(--sec)';
    }

    function resetTimer() {
        pauseTimer();
        isWorkSession = true;
        totalSeconds = 25 * 60;
        sessionDisplay.innerHTML = 'Work Session';
        sessionDisplay.style.backgroundColor = 'var(--green)';
        updateTimerDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

pomodoroTimer();


// --- Weather and Time/Date Feature ---
function weatherFunctionality() {
    // API key removed for security purposes. Use a valid key to make this work.
    const apiKey = 'YOUR_WEATHER_API_KEY'; // Replace with a real key
    const city = 'Bhopal'; // Customizable city

    const header1Time = document.getElementById('current-time');
    const header1Date = document.getElementById('current-date');
    const header2Temp = document.getElementById('weather-temp');
    const header2Condition = document.getElementById('weather-condition');
    const precipitationElem = document.querySelector('.header2 .precipitation');
    const humidityElem = document.querySelector('.header2 .humidity');
    const windElem = document.querySelector('.header2 .wind');
    const weatherIcon = document.getElementById('weather-icon');

    function getWeatherIcon(conditionText) {
        const text = conditionText.toLowerCase();
        if (text.includes('sun') || text.includes('clear')) return 'ri-sun-fill';
        if (text.includes('rain') || text.includes('drizzle')) return 'ri-showers-line';
        if (text.includes('cloud') || text.includes('overcast')) return 'ri-cloudy-line';
        if (text.includes('snow') || text.includes('sleet')) return 'ri-snowy-line';
        if (text.includes('storm') || text.includes('thunder')) return 'ri-thunderstorm-line';
        return 'ri-question-fill'; // Default icon
    }

    async function weatherAPICall() {
        if (!apiKey || apiKey === 'YOUR_WEATHER_API_KEY') {
            console.error("Please provide a valid API key for weather functionality.");
            return;
        }
        
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            const data = await response.json();

            header2Temp.innerHTML = `${data.current.temp_c}°C`;
            header2Condition.innerHTML = `${data.current.condition.text}`;
            windElem.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
            humidityElem.innerHTML = `Humidity: ${data.current.humidity}%`;
            precipitationElem.innerHTML = `Precipitation: ${data.current.precip_mm} mm`; // Use actual precipitation data
            
            // Update icon
            weatherIcon.className = getWeatherIcon(data.current.condition.text);

        } catch (error) {
            console.error("Failed to fetch weather data:", error);
            // Fallback data
            header2Temp.innerHTML = `20°C`;
            header2Condition.innerHTML = `Light rain`;
            weatherIcon.className = getWeatherIcon('Light rain');
        }
    }

    weatherAPICall(); // Call once on load

    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const date = new Date();
        const dayOfWeek = totalDaysOfWeek[date.getDay()];
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const tarik = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        header1Date.innerHTML = `${tarik} ${month}, ${year}`;
        header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
    }

    // Update time/date every second
    setInterval(timeDate, 1000);
}

weatherFunctionality();


// --- Daily Goals Feature (New) ---
function dailyGoals() {
    let currentGoals = JSON.parse(localStorage.getItem('currentGoals')) || [];
    const goalForm = document.getElementById('goal-form');
    const goalInput = document.getElementById('goal-input');
    const allGoalsContainer = document.querySelector('.allGoals');

    function renderGoals() {
        let sum = '';
        currentGoals.forEach(function (goal, idx) {
            const completedClass = goal.completed ? 'completed' : '';
            sum += `<div class="goal-item ${completedClass}">
                        <p>${goal.text}</p>
                        <div class="goal-actions">
                            <button class="complete-btn" id="c-${idx}">${goal.completed ? 'Undo' : 'Complete'}</button>
                            <button class="delete-btn" id="d-${idx}">Delete</button>
                        </div>
                    </div>`;
        });

        allGoalsContainer.innerHTML = sum;
        localStorage.setItem('currentGoals', JSON.stringify(currentGoals));

        // Add event listeners
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(btn.id.split('-')[1]);
                currentGoals[idx].completed = !currentGoals[idx].completed;
                renderGoals();
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(btn.id.split('-')[1]);
                currentGoals.splice(idx, 1);
                renderGoals();
            });
        });
    }

    renderGoals();

    goalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (goalInput.value.trim() === '') return;

        currentGoals.push({
            text: goalInput.value.trim(),
            completed: false
        });

        goalInput.value = '';
        renderGoals();
    });
}

dailyGoals();


// --- Theme Changer Feature ---
function changeTheme() {
    const themeButton = document.querySelector('.theme');
    const rootElement = document.documentElement;
    
    // Default theme 0 (dark blue/slate/white)
    const themes = [
        // Theme 1: Original Brown/Yellowish
        { pri: '#F8F4E1', sec: '#381c0a', tri1: '#FEBA17', tri2: '#74512D' },
        // Theme 2: User's second set (Darker/Blue-Black)
        { pri: '#F1EFEC', sec: '#030303', tri1: '#D4C9BE', tri2: '#123458' },
        // Theme 3: Current Default (Clean/Modern)
        { pri: '#F1EFEC', sec: '#030303', tri1: '#2196F3', tri2: '#34495E' }
    ];

    let currentThemeIndex = parseInt(localStorage.getItem('themeIndex')) || 2; // Default to 2 (Modern)

    function applyTheme(index) {
        const theme = themes[index];
        rootElement.style.setProperty('--pri', theme.pri);
        rootElement.style.setProperty('--sec', theme.sec);
        rootElement.style.setProperty('--tri1', theme.tri1);
        rootElement.style.setProperty('--tri2', theme.tri2);
        localStorage.setItem('themeIndex', index);
        currentThemeIndex = index;
    }
    
    // Apply initial theme on load
    applyTheme(currentThemeIndex);

    themeButton.addEventListener('click', function () {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(currentThemeIndex);
    });
}

changeTheme();