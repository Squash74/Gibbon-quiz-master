// Quiz Data - Loaded from external JSON file
let quizData = null;
let quizDataLoaded = false;
let quizDataError = null;

// Load quiz data from external JSON file
async function loadQuizData() {
    try {
        const response = await fetch('quizzes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        quizData = await response.json();
        quizDataLoaded = true;
        hideLoadingState();
        return quizData;
    } catch (error) {
        console.error('Failed to load quiz data:', error);
        quizDataError = error;
        showLoadError();
        throw error;
    }
}

function showLoadingState() {
    const themeButtons = document.querySelector('.theme-buttons');
    if (themeButtons) {
        themeButtons.classList.add('loading');
    }
}

function hideLoadingState() {
    const themeButtons = document.querySelector('.theme-buttons');
    if (themeButtons) {
        themeButtons.classList.remove('loading');
    }
}

function showLoadError() {
    const themeSelection = document.getElementById('themeSelection');
    if (themeSelection) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'load-error';
        errorDiv.innerHTML = `
            <p>Failed to load quiz data. Please refresh the page.</p>
            <button onclick="location.reload()" class="btn btn-primary">Retry</button>
        `;
        themeSelection.appendChild(errorDiv);
    }
}

// ============================================
// LOCAL STORAGE MANAGER
// ============================================
const STORAGE_KEY = 'gibbonQuizProgress';

function getStoredProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        highScores: {},          // { theme: { score, total, percentage } }
        completedThemes: [],     // themes played at least once
        lastPlayedTheme: null,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0
    };
}

function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function updateHighScore(theme, score, total) {
    const progress = getStoredProgress();
    const percentage = Math.round((score / total) * 100);

    // Update high score if better or first time
    if (!progress.highScores[theme] || percentage > progress.highScores[theme].percentage) {
        progress.highScores[theme] = { score, total, percentage };
    }

    // Mark theme as completed
    if (!progress.completedThemes.includes(theme)) {
        progress.completedThemes.push(theme);
    }

    // Update last played theme
    progress.lastPlayedTheme = theme;

    // Update total stats
    progress.totalQuestionsAnswered += total;
    progress.totalCorrectAnswers += score;

    saveProgress(progress);
    return progress;
}

function getOverallAccuracy() {
    const progress = getStoredProgress();
    if (progress.totalQuestionsAnswered === 0) return 0;
    return Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100);
}

function clearAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
    updateStatsDisplay();
    updateThemeButtons();
}

// ============================================
// DARK MODE MANAGER
// ============================================
const THEME_STORAGE_KEY = 'gibbonQuizTheme';

function getPreferredTheme() {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
        return stored;
    }
    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function initializeTheme() {
    const theme = getPreferredTheme();
    setTheme(theme);

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Add click handler for theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// ============================================
// QUIZ STATE
// ============================================
let currentTheme = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let answerRevealed = false;

// DOM Elements
const container = document.querySelector('.container');
const themeSelection = document.getElementById('themeSelection');
const quizContainer = document.getElementById('quizContainer');
const gameOver = document.getElementById('gameOver');
const questionText = document.getElementById('questionText');
const answerSection = document.getElementById('answerSection');
const answerText = document.getElementById('answerText');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const scoringButtons = document.getElementById('scoringButtons');
const correctBtn = document.getElementById('correctBtn');
const incorrectBtn = document.getElementById('incorrectBtn');
const nextBtn = document.getElementById('nextBtn');
const newGameBtn = document.getElementById('newGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const currentThemeEl = document.getElementById('currentTheme');
const questionNumber = document.getElementById('questionNumber');
const totalQuestions = document.getElementById('totalQuestions');
const scoreEl = document.getElementById('score');
const finalScore = document.getElementById('finalScore');
const finalTotal = document.getElementById('finalTotal');
const percentage = document.getElementById('percentage');
const runningPercentEl = document.getElementById('runningPercent');

// Theme Selection
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentTheme = btn.dataset.theme;
        startQuiz();
    });
});

// Start Quiz
function startQuiz() {
    // Reset state
    score = 0;
    currentQuestionIndex = 0;
    answerRevealed = false;
    
    // Get and shuffle questions for the theme
    questions = [...quizData[currentTheme]];
    shuffleArray(questions);
    
    // Update UI
    container.classList.add('quiz-active');
    themeSelection.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    gameOver.classList.add('hidden');
    
    currentThemeEl.textContent = capitalizeFirstLetter(currentTheme);
    totalQuestions.textContent = questions.length;
    scoreEl.textContent = score;
    runningPercentEl.textContent = '0';

    displayQuestion();
}

// Display Current Question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answerText.textContent = question.answer;
    
    // Update question number
    questionNumber.textContent = currentQuestionIndex + 1;
    
    // Reset UI state
    answerSection.classList.add('hidden');
    showAnswerBtn.classList.remove('hidden');
    scoringButtons.classList.add('hidden');
    nextBtn.classList.add('hidden');
    answerRevealed = false;
}

// Show Answer
showAnswerBtn.addEventListener('click', () => {
    answerSection.classList.remove('hidden');
    showAnswerBtn.classList.add('hidden');
    scoringButtons.classList.remove('hidden');
    answerRevealed = true;
});

// Alternative: Click question card to show answer
document.querySelector('.question-card').addEventListener('click', () => {
    if (!answerRevealed && !showAnswerBtn.classList.contains('hidden')) {
        answerSection.classList.remove('hidden');
        showAnswerBtn.classList.add('hidden');
        scoringButtons.classList.remove('hidden');
        answerRevealed = true;
    }
});

// Update running percentage
function updateRunningPercent() {
    const answered = currentQuestionIndex + 1;
    const percent = Math.round((score / answered) * 100);
    runningPercentEl.textContent = percent;
}

// Correct Answer
correctBtn.addEventListener('click', () => {
    score++;
    scoreEl.textContent = score;
    updateRunningPercent();
    scoringButtons.classList.add('hidden');
    nextBtn.classList.remove('hidden');
});

// Incorrect Answer
incorrectBtn.addEventListener('click', () => {
    updateRunningPercent();
    scoringButtons.classList.add('hidden');
    nextBtn.classList.remove('hidden');
});

// Next Question
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
});

// End Quiz
function endQuiz() {
    quizContainer.classList.add('hidden');
    gameOver.classList.remove('hidden');

    finalScore.textContent = score;
    finalTotal.textContent = questions.length;

    const percentScore = Math.round((score / questions.length) * 100);
    percentage.textContent = `${percentScore}%`;

    // Save progress to localStorage
    const progress = updateHighScore(currentTheme, score, questions.length);

    // Check if new high score
    const isNewHighScore = progress.highScores[currentTheme].score === score &&
                           progress.highScores[currentTheme].percentage === percentScore;

    // Show high score indicator if applicable
    const highScoreIndicator = document.getElementById('highScoreIndicator');
    if (highScoreIndicator) {
        if (isNewHighScore && progress.completedThemes.filter(t => t === currentTheme).length <= 1) {
            highScoreIndicator.classList.add('hidden');
        } else if (isNewHighScore) {
            highScoreIndicator.classList.remove('hidden');
        } else {
            highScoreIndicator.classList.add('hidden');
        }
    }
}

// New Game
newGameBtn.addEventListener('click', () => {
    container.classList.remove('quiz-active');
    quizContainer.classList.add('hidden');
    themeSelection.classList.remove('hidden');
    updateStatsDisplay();
    updateThemeButtons();
});

// Play Again
playAgainBtn.addEventListener('click', () => {
    container.classList.remove('quiz-active');
    gameOver.classList.add('hidden');
    themeSelection.classList.remove('hidden');
    updateStatsDisplay();
    updateThemeButtons();
});

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function capitalizeFirstLetter(string) {
    // Handle special theme names
    const themeNames = {
        'southafrica': 'South Africa',
        'international': 'International',
        'music': 'Music',
        'science': 'Science & Nature',
        'history': 'History',
        'food': 'Food & Drink',
        'tvshows': 'TV Shows',
        'artculture': 'Art & Culture',
        'wildlife': 'Wildlife',
        'african': 'African'
    };
    return themeNames[string] || string.charAt(0).toUpperCase() + string.slice(1);
}

// ============================================
// STATS DISPLAY FUNCTIONS
// ============================================
function updateStatsDisplay() {
    const progress = getStoredProgress();
    const statsPanel = document.getElementById('statsPanel');

    if (!statsPanel) return;

    const totalThemes = Object.keys(quizData).length;
    const completedCount = progress.completedThemes.length;
    const accuracy = getOverallAccuracy();

    document.getElementById('statsTotalAnswered').textContent = progress.totalQuestionsAnswered;
    document.getElementById('statsAccuracy').textContent = accuracy + '%';
    document.getElementById('statsCompleted').textContent = `${completedCount}/${totalThemes}`;

    // Show/hide stats panel based on whether there's any data
    if (progress.totalQuestionsAnswered > 0) {
        statsPanel.classList.remove('hidden');
    } else {
        statsPanel.classList.add('hidden');
    }
}

function updateThemeButtons() {
    const progress = getStoredProgress();

    document.querySelectorAll('.theme-btn').forEach(btn => {
        const theme = btn.dataset.theme;
        const highScore = progress.highScores[theme];
        const isCompleted = progress.completedThemes.includes(theme);
        const isLastPlayed = progress.lastPlayedTheme === theme;

        // Remove existing badges
        const existingBadge = btn.querySelector('.theme-badge');
        if (existingBadge) existingBadge.remove();

        // Add completion indicator and high score
        if (isCompleted && highScore) {
            const badge = document.createElement('span');
            badge.className = 'theme-badge';
            badge.textContent = `${highScore.percentage}%`;
            btn.appendChild(badge);
            btn.classList.add('completed');
        } else {
            btn.classList.remove('completed');
        }

        // Highlight last played theme
        if (isLastPlayed) {
            btn.classList.add('last-played');
        } else {
            btn.classList.remove('last-played');
        }
    });
}

// Initialize on page load
async function initializeApp() {
    initializeTheme();

    // Show loading state while fetching quiz data
    showLoadingState();

    // Load quiz data from JSON file
    try {
        await loadQuizData();
    } catch (error) {
        console.error('Failed to initialize quiz data:', error);
        // Error is already handled in loadQuizData
    }

    updateStatsDisplay();
    updateThemeButtons();

    // Clear stats button handler
    const clearStatsBtn = document.getElementById('clearStatsBtn');
    if (clearStatsBtn) {
        clearStatsBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
                clearAllProgress();
            }
        });
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
