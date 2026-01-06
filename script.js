// Quiz Data - Lazy loaded per category for better performance
const quizCache = {}; // Cache loaded categories
const usedQuestionsCache = {}; // Track used questions per theme to prevent repetition

const AVAILABLE_THEMES = [
    'christmas', 'movies', 'places', 'people', 'sport',
    'southafrica', 'international', 'music', 'science',
    'history', 'food', 'tvshows', 'artculture', 'wildlife', 'african'
];

// Load a specific category's quiz data
async function loadCategoryData(category) {
    // Return from cache if already loaded
    if (quizCache[category]) {
        return quizCache[category];
    }

    try {
        const response = await fetch(`quizzes/${category}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        quizCache[category] = data;
        return data;
    } catch (error) {
        console.error(`Failed to load ${category} quiz data:`, error);
        throw error;
    }
}

// Load questions from all categories for mix mode
async function loadMixedCategoryData() {
    const allQuestions = [];

    // Load all categories in parallel
    const loadPromises = AVAILABLE_THEMES.map(async (theme) => {
        try {
            const data = await loadCategoryData(theme);
            // Add category info to each question
            return data.map(q => ({ ...q, category: theme }));
        } catch (error) {
            console.error(`Failed to load ${theme} for mix:`, error);
            return [];
        }
    });

    const results = await Promise.all(loadPromises);
    results.forEach(questions => allQuestions.push(...questions));

    return allQuestions;
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
// TIMER MANAGER
// ============================================
const TIMER_STORAGE_KEY = 'gibbonQuizTimerEnabled';
const TIMER_DURATION = 30; // seconds per question
let timerEnabled = false;
let timerInterval = null;
let timeRemaining = TIMER_DURATION;

function getTimerPreference() {
    return localStorage.getItem(TIMER_STORAGE_KEY) === 'true';
}

function setTimerPreference(enabled) {
    localStorage.setItem(TIMER_STORAGE_KEY, enabled.toString());
    timerEnabled = enabled;
}

function initializeTimerToggle() {
    const timerToggle = document.getElementById('timerToggle');
    if (timerToggle) {
        // Load saved preference
        timerEnabled = getTimerPreference();
        timerToggle.checked = timerEnabled;

        // Listen for changes
        timerToggle.addEventListener('change', (e) => {
            setTimerPreference(e.target.checked);
        });
    }
}

function startTimer() {
    if (!timerEnabled) return;

    const timerDisplay = document.getElementById('timerDisplay');
    const timerValue = document.getElementById('timerValue');

    if (timerDisplay) {
        timerDisplay.classList.remove('hidden');
    }

    timeRemaining = TIMER_DURATION;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const timerValue = document.getElementById('timerValue');
    if (timerValue) {
        timerValue.textContent = timeRemaining;

        // Remove existing classes
        timerValue.classList.remove('warning', 'danger');

        // Add warning/danger classes based on time
        if (timeRemaining <= 5) {
            timerValue.classList.add('danger');
        } else if (timeRemaining <= 10) {
            timerValue.classList.add('warning');
        }
    }
}

function handleTimeout() {
    stopTimer();
    resetStreak(); // Timeout counts as incorrect

    // Auto-reveal answer and mark as incorrect
    const answerSection = document.getElementById('answerSection');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const scoringButtons = document.getElementById('scoringButtons');
    const nextBtn = document.getElementById('nextBtn');

    if (answerSection) answerSection.classList.remove('hidden');
    if (showAnswerBtn) showAnswerBtn.classList.add('hidden');
    if (scoringButtons) scoringButtons.classList.add('hidden');
    if (nextBtn) {
        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        nextBtn.textContent = isLastQuestion ? 'See Results' : 'Next Question';
        nextBtn.classList.remove('hidden');
    }

    answerRevealed = true;

    // Show timeout message
    const timerValue = document.getElementById('timerValue');
    if (timerValue) {
        timerValue.textContent = "Time's up!";
    }
}

function hideTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        timerDisplay.classList.add('hidden');
    }
}

// ============================================
// SHUFFLE MANAGER
// ============================================
const SHUFFLE_STORAGE_KEY = 'gibbonQuizShuffleEnabled';
let shuffleEnabled = true; // Default to shuffled

function getShufflePreference() {
    const stored = localStorage.getItem(SHUFFLE_STORAGE_KEY);
    // Default to true if not set
    return stored === null ? true : stored === 'true';
}

function setShufflePreference(enabled) {
    localStorage.setItem(SHUFFLE_STORAGE_KEY, enabled.toString());
    shuffleEnabled = enabled;
}

function initializeShuffleToggle() {
    const shuffleToggle = document.getElementById('shuffleToggle');
    if (shuffleToggle) {
        // Load saved preference
        shuffleEnabled = getShufflePreference();
        shuffleToggle.checked = shuffleEnabled;

        // Listen for changes
        shuffleToggle.addEventListener('change', (e) => {
            setShufflePreference(e.target.checked);
        });
    }
}

// ============================================
// PARTY MODE MANAGER
// ============================================
let partyModeEnabled = false;
let players = []; // Array of { name: string, score: number, correct: number }
let currentPlayerIndex = 0;

function initializePartyModeToggle() {
    const partyModeToggle = document.getElementById('partyModeToggle');
    const playerSetup = document.getElementById('playerSetup');

    if (partyModeToggle && playerSetup) {
        partyModeToggle.addEventListener('change', (e) => {
            partyModeEnabled = e.target.checked;
            if (partyModeEnabled) {
                playerSetup.classList.remove('hidden');
            } else {
                playerSetup.classList.add('hidden');
            }
        });
    }
}

function getPlayerNames() {
    const names = [];
    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`player${i}Name`);
        if (input && input.value.trim()) {
            names.push(input.value.trim());
        }
    }
    return names;
}

function initializePlayers() {
    const names = getPlayerNames();

    // Need at least 2 players for party mode
    if (names.length < 2) {
        // Use default names if not enough provided
        if (names.length === 0) {
            names.push('Player 1', 'Player 2');
        } else if (names.length === 1) {
            names.push('Player 2');
        }
    }

    players = names.map(name => ({
        name: name,
        score: 0,
        correct: 0
    }));

    currentPlayerIndex = 0;
}

function getCurrentPlayer() {
    return players[currentPlayerIndex];
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const currentPlayerDisplay = document.getElementById('currentPlayerDisplay');
    const currentPlayerName = document.getElementById('currentPlayerName');

    if (partyModeEnabled && currentPlayerDisplay && currentPlayerName) {
        currentPlayerDisplay.classList.remove('hidden');
        currentPlayerName.textContent = getCurrentPlayer().name;
    } else if (currentPlayerDisplay) {
        currentPlayerDisplay.classList.add('hidden');
    }
}

function addScoreToCurrentPlayer(points, isCorrect) {
    if (partyModeEnabled && players.length > 0) {
        const player = getCurrentPlayer();
        player.score += points;
        if (isCorrect) {
            player.correct++;
        }
    }
}

function getPartyResults() {
    // Sort players by score (descending)
    return [...players].sort((a, b) => b.score - a.score);
}

function showPartyGameOver() {
    const partyGameOver = document.getElementById('partyGameOver');
    const partyScores = document.getElementById('partyScores');
    const winnerName = document.getElementById('winnerName');
    const winnerAnnouncement = document.getElementById('winnerAnnouncement');

    if (!partyGameOver || !partyScores) return;

    const results = getPartyResults();

    // Check for tie
    const topScore = results[0].score;
    const winners = results.filter(p => p.score === topScore);

    if (winnerAnnouncement && winnerName) {
        if (winners.length > 1) {
            winnerName.textContent = winners.map(w => w.name).join(' & ');
            winnerAnnouncement.querySelector('.winner-label').textContent = "IT'S A TIE!";
        } else {
            winnerName.textContent = results[0].name;
            winnerAnnouncement.querySelector('.winner-label').textContent = 'WINS!';
        }
    }

    // Build scoreboard
    partyScores.innerHTML = results.map((player, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
        const percentage = questions.length > 0 ? Math.round((player.correct / Math.ceil(questions.length / players.length)) * 100) : 0;
        return `
            <div class="party-score-row ${index === 0 ? 'winner' : ''}">
                <span class="party-rank">${medal || (index + 1)}</span>
                <span class="party-player-name">${player.name}</span>
                <span class="party-player-score">${player.score} pts</span>
                <span class="party-player-correct">(${player.correct} correct)</span>
            </div>
        `;
    }).join('');

    partyGameOver.classList.remove('hidden');
}

function getPartyShareText() {
    const results = getPartyResults();
    const themeName = capitalizeFirstLetter(currentTheme);

    let scoreText = results.map((p, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
        return `${medal} ${p.name}: ${p.score} pts`;
    }).join('\n');

    return `🎉 Party Quiz Results! 🎉

Theme: ${themeName}
${scoreText}

Play at: https://squash74.github.io/Gibbon-quiz-master/`;
}

// ============================================
// HINT SYSTEM
// ============================================
const HINTS_PER_QUIZ = 3;
const HINT_COST = 1; // Total cost for using hints (charged on first use)
let hintsRemaining = HINTS_PER_QUIZ;
let hintsUsed = 0;
let hintCostPaid = false; // Track if the 1-point cost has been paid
let currentQuestionHints = []; // Hints for current question
let currentHintIndex = 0; // Which hint we're on for this question

function generateHints(answer) {
    const hints = [];
    const words = answer.split(' ');

    // Hint 1: Number of words + first letter
    if (words.length === 1) {
        hints.push(`${answer.length} letters, starts with "${answer[0].toUpperCase()}"`);
    } else {
        hints.push(`${words.length} words, starts with "${answer[0].toUpperCase()}"`);
    }

    // Hint 2: First letter of each word (for multi-word) or more letters revealed
    if (words.length > 1) {
        const initials = words.map(w => w[0].toUpperCase()).join('.');
        hints.push(`Initials: ${initials}`);
    } else {
        // Show first 2-3 letters for single word
        const revealCount = Math.min(3, Math.ceil(answer.length / 3));
        const revealed = answer.substring(0, revealCount);
        hints.push(`Starts with "${revealed}..."`);
    }

    // Hint 3: Partial reveal with blanks - ensure we never reveal too much
    let partialReveal = '';
    const nonSpaceChars = answer.replace(/\s/g, '').length;
    // Reveal at most 40% of characters (excluding spaces), minimum 2 hidden
    const maxRevealed = Math.max(2, Math.floor(nonSpaceChars * 0.4));
    let revealedCount = 0;

    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === ' ') {
            partialReveal += '  ';
        } else if (i === 0) {
            // Always show first letter
            partialReveal += answer[i];
            revealedCount++;
        } else if (revealedCount < maxRevealed && Math.random() < 0.2) {
            // Lower probability (20%) and respect max limit
            partialReveal += answer[i];
            revealedCount++;
        } else {
            partialReveal += '_';
        }
    }
    hints.push(partialReveal);

    return hints;
}

function resetHintsForQuiz() {
    hintsRemaining = HINTS_PER_QUIZ;
    hintsUsed = 0;
    hintCostPaid = false;
}

function resetHintsForQuestion() {
    currentHintIndex = 0;
    currentQuestionHints = [];
    hideHintDisplay();
    updateHintButton();
}

function useHint() {
    if (hintsRemaining <= 0 || answerRevealed) return;

    // Confirm cost on first hint use
    if (!hintCostPaid) {
        if (!confirm('Use hints? This will cost 1 point for up to 3 hints.')) {
            return;
        }
    }

    const question = questions[currentQuestionIndex];

    // Generate hints on first use for this question
    if (currentQuestionHints.length === 0) {
        currentQuestionHints = generateHints(question.answer);
    }

    // Show next hint
    if (currentHintIndex < currentQuestionHints.length) {
        showHintDisplay(currentQuestionHints[currentHintIndex]);
        currentHintIndex++;
        hintsRemaining--;
        hintsUsed++;

        // Deduct point only on first hint use (1 point for all 3 hints)
        if (!hintCostPaid) {
            score = Math.max(0, score - HINT_COST);
            scoreEl.textContent = score;
            hintCostPaid = true;
        }

        updateHintButton();
    }
}

function showHintDisplay(hintText) {
    const hintDisplay = document.getElementById('hintDisplay');
    const hintText_el = document.getElementById('hintText');

    if (hintDisplay && hintText_el) {
        hintText_el.textContent = hintText;
        hintDisplay.classList.remove('hidden');
    }
}

function hideHintDisplay() {
    const hintDisplay = document.getElementById('hintDisplay');
    if (hintDisplay) {
        hintDisplay.classList.add('hidden');
    }
}

function updateHintButton() {
    const hintBtn = document.getElementById('hintBtn');
    const hintCount = document.getElementById('hintCount');

    if (hintBtn) {
        if (hintsRemaining <= 0 || answerRevealed) {
            hintBtn.disabled = true;
            hintBtn.classList.add('disabled');
        } else {
            hintBtn.disabled = false;
            hintBtn.classList.remove('disabled');
        }
    }

    if (hintCount) {
        hintCount.textContent = hintsRemaining;
    }
}

// ============================================
// STREAK SYSTEM
// ============================================
let currentStreak = 0;
let maxStreak = 0;
let totalBonusPoints = 0;

function updateStreakDisplay() {
    const streakValue = document.getElementById('streakValue');
    const streakDisplay = document.getElementById('streakDisplay');
    const bonusIndicator = document.getElementById('bonusIndicator');

    if (streakValue) {
        streakValue.textContent = currentStreak;
    }

    if (streakDisplay) {
        // Remove all milestone classes
        streakDisplay.classList.remove('streak-5', 'streak-10', 'streak-15');

        // Add appropriate milestone class
        if (currentStreak >= 15) {
            streakDisplay.classList.add('streak-15');
        } else if (currentStreak >= 10) {
            streakDisplay.classList.add('streak-10');
        } else if (currentStreak >= 5) {
            streakDisplay.classList.add('streak-5');
        }

        // Show/hide based on streak
        if (currentStreak >= 2) {
            streakDisplay.classList.remove('hidden');
        } else {
            streakDisplay.classList.add('hidden');
        }
    }

    // Update bonus indicator
    if (bonusIndicator) {
        const bonus = calculateStreakBonus(currentStreak);
        if (bonus > 0) {
            bonusIndicator.textContent = `+${bonus}`;
            bonusIndicator.classList.remove('hidden');
        } else {
            bonusIndicator.classList.add('hidden');
        }
    }
}

function incrementStreak() {
    currentStreak++;
    if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
    }
    updateStreakDisplay();

    // Show milestone celebration
    if (currentStreak === 5 || currentStreak === 10 || currentStreak === 15) {
        showStreakMilestone(currentStreak);
    }
}

function resetStreak() {
    currentStreak = 0;
    updateStreakDisplay();
}

function showStreakMilestone(milestone) {
    const streakDisplay = document.getElementById('streakDisplay');
    if (streakDisplay) {
        streakDisplay.classList.add('milestone-celebration');
        setTimeout(() => {
            streakDisplay.classList.remove('milestone-celebration');
        }, 600);
    }

    // Confetti for reaching 15 streak
    if (milestone === 15) {
        showConfetti();
    }
}

function calculateStreakBonus(streak) {
    if (streak >= 15) return 3;  // 15+ streak: +3 bonus (4 total)
    if (streak >= 10) return 2;  // 10-14 streak: +2 bonus (3 total)
    if (streak >= 5) return 1;   // 5-9 streak: +1 bonus (2 total)
    return 0;                    // 0-4 streak: no bonus (1 total)
}

function showBonusPopup(bonus) {
    // Create and show bonus notification
    const popup = document.createElement('div');
    popup.className = 'bonus-popup';
    popup.textContent = `+${bonus} bonus!`;

    const scoreItem = document.querySelector('.score-item:has(#score)') ||
                      document.querySelector('.score-board');
    if (scoreItem) {
        scoreItem.style.position = 'relative';
        scoreItem.appendChild(popup);

        // Remove after animation
        setTimeout(() => {
            popup.remove();
        }, 1000);
    }
}

// ============================================
// CONFETTI SYSTEM
// ============================================
function createConfetti() {
    const colors = ['#fbbf24', '#f97316', '#ef4444', '#a855f7', '#3b82f6', '#10b981'];
    const confettiCount = 50;
    const container = document.querySelector('.page-wrapper') || document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 2;
        const size = 8 + Math.random() * 8;
        const rotation = Math.random() * 360;

        confetti.style.cssText = `
            left: ${left}%;
            background-color: ${color};
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            transform: rotate(${rotation}deg);
        `;

        container.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, (delay + duration) * 1000);
    }
}

function showConfetti() {
    createConfetti();
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Only handle keys when quiz is active
        if (quizContainer.classList.contains('hidden')) {
            return;
        }

        switch (e.key) {
            case ' ':  // Spacebar - reveal answer
                e.preventDefault();
                if (!answerRevealed && !showAnswerBtn.classList.contains('hidden')) {
                    showAnswerBtn.click();
                }
                break;

            case 'Enter':  // Enter - next question
                e.preventDefault();
                if (!nextBtn.classList.contains('hidden')) {
                    nextBtn.click();
                }
                break;

            case 'c':  // C key - mark correct
            case 'C':
                if (!scoringButtons.classList.contains('hidden')) {
                    correctBtn.click();
                }
                break;

            case 'x':  // X key - mark incorrect
            case 'X':
                if (!scoringButtons.classList.contains('hidden')) {
                    incorrectBtn.click();
                }
                break;

            case '1':  // 1 key - mark correct (alternative)
                if (!scoringButtons.classList.contains('hidden')) {
                    correctBtn.click();
                }
                break;

            case '2':  // 2 key - mark incorrect (alternative)
                if (!scoringButtons.classList.contains('hidden')) {
                    incorrectBtn.click();
                }
                break;

            case 'h':  // H key - use hint
            case 'H':
                const hintBtn = document.getElementById('hintBtn');
                if (hintBtn && !hintBtn.disabled) {
                    hintBtn.click();
                }
                break;
        }
    });
}

function initializeHintButton() {
    const hintBtn = document.getElementById('hintBtn');
    if (hintBtn) {
        hintBtn.addEventListener('click', useHint);
    }
}

// ============================================
// SHARE RESULTS
// ============================================
function getShareText() {
    const percentScore = Math.round((correctAnswers / questions.length) * 100);
    const themeName = capitalizeFirstLetter(currentTheme);

    let streakText = '';
    if (maxStreak >= 3) {
        streakText = `\nBest Streak: ${maxStreak} in a row!`;
    }

    let bonusText = '';
    if (totalBonusPoints > 0) {
        bonusText = `\nTotal Points: ${score} (includes ${totalBonusPoints} bonus!)`;
    }

    let hintsText = '';
    if (hintsUsed > 0) {
        hintsText = `\nHints Used: ${hintsUsed}`;
    }

    return `🎉 Quiz time 🎉

Theme: ${themeName}
Score: ${correctAnswers}/${questions.length} (${percentScore}%)${bonusText}${streakText}${hintsText}

Play at: https://squash74.github.io/Gibbon-quiz-master/`;
}

async function shareResults() {
    const shareText = getShareText();
    const shareBtn = document.getElementById('shareBtn');

    try {
        await navigator.clipboard.writeText(shareText);

        // Show feedback
        if (shareBtn) {
            const originalText = shareBtn.textContent;
            shareBtn.textContent = '✓ Copied!';
            shareBtn.classList.add('copied');
            setTimeout(() => {
                shareBtn.textContent = originalText;
                shareBtn.classList.remove('copied');
            }, 2000);
        }
    } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback: show the text in an alert
        alert('Copy this to share:\n\n' + shareText);
    }
}

// ============================================
// QUESTION COUNT SELECTOR
// ============================================
const QUESTION_COUNT_KEY = 'gibbonQuizQuestionCount';
let selectedQuestionCount = 15; // Default

function getQuestionCountPreference() {
    const stored = localStorage.getItem(QUESTION_COUNT_KEY);
    return stored ? parseInt(stored, 10) : 15;
}

function setQuestionCountPreference(count) {
    localStorage.setItem(QUESTION_COUNT_KEY, count.toString());
    selectedQuestionCount = count;
}

function initializeQuestionCountSelector() {
    selectedQuestionCount = getQuestionCountPreference();

    const buttons = document.querySelectorAll('.count-btn');
    buttons.forEach(btn => {
        const count = parseInt(btn.dataset.count, 10);

        // Set active state based on stored preference
        if (count === selectedQuestionCount) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            setQuestionCountPreference(count);
        });
    });
}

// ============================================
// QUIZ STATE
// ============================================
let currentTheme = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
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
const homeBtn = document.getElementById('homeBtn');
const currentThemeEl = document.getElementById('currentTheme');
const questionNumber = document.getElementById('questionNumber');
const totalQuestions = document.getElementById('totalQuestions');
const scoreEl = document.getElementById('score');
const finalTotal = document.getElementById('finalTotal');
const percentage = document.getElementById('percentage');
const runningPercentEl = document.getElementById('runningPercent');

// Theme Selection
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        currentTheme = btn.dataset.theme;
        await startQuiz();
    });
});

// Start Quiz
async function startQuiz() {
    // Show loading state on the button
    showLoadingState();

    try {
        // Load category data (from cache or fetch)
        let categoryData;
        if (currentTheme === 'mix') {
            categoryData = await loadMixedCategoryData();
        } else {
            categoryData = await loadCategoryData(currentTheme);
        }

        // Reset state
        score = 0;
        correctAnswers = 0;
        currentQuestionIndex = 0;
        answerRevealed = false;
        currentStreak = 0;
        maxStreak = 0;
        totalBonusPoints = 0;
        resetHintsForQuiz();
        updateStreakDisplay();

        // Initialize party mode if enabled
        if (partyModeEnabled) {
            initializePlayers();
        }

        // Get questions for the theme (shuffle if enabled)
        let allQuestions = [...categoryData];

        // Filter out already-used questions to prevent repetition
        const themeKey = currentTheme;
        if (!usedQuestionsCache[themeKey]) {
            usedQuestionsCache[themeKey] = new Set();
        }

        // Filter to only unused questions
        let unusedQuestions = allQuestions.filter((q, idx) =>
            !usedQuestionsCache[themeKey].has(q.question)
        );

        // If we've used all questions, reset the cache for this theme
        if (unusedQuestions.length < selectedQuestionCount) {
            usedQuestionsCache[themeKey].clear();
            unusedQuestions = allQuestions;
        }

        if (shuffleEnabled) {
            shuffleArray(unusedQuestions);
        }

        // Limit to selected question count
        const maxQuestions = Math.min(selectedQuestionCount, unusedQuestions.length);
        questions = unusedQuestions.slice(0, maxQuestions);

        // Mark these questions as used
        questions.forEach(q => usedQuestionsCache[themeKey].add(q.question));

        hideLoadingState();

        // Update UI
        container.classList.add('quiz-active');
        themeSelection.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        gameOver.classList.add('hidden');
        document.getElementById('partyGameOver')?.classList.add('hidden');
        showHomeButton();

        currentThemeEl.textContent = capitalizeFirstLetter(currentTheme);
        totalQuestions.textContent = questions.length;
        scoreEl.textContent = score;
        runningPercentEl.textContent = '0';

        // Show/hide party mode elements
        if (partyModeEnabled) {
            updateCurrentPlayerDisplay();
            document.getElementById('singlePlayerScore')?.classList.add('hidden');
        } else {
            document.getElementById('currentPlayerDisplay')?.classList.add('hidden');
            document.getElementById('singlePlayerScore')?.classList.remove('hidden');
        }

        // Show/hide timer display based on preference
        if (timerEnabled) {
            document.getElementById('timerDisplay')?.classList.remove('hidden');
        } else {
            hideTimerDisplay();
        }

        displayQuestion();
    } catch (error) {
        hideLoadingState();
        alert('Failed to load quiz. Please try again.');
        console.error('Failed to start quiz:', error);
    }
}

// Display Current Question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answerText.textContent = question.answer;

    // Update question number
    questionNumber.textContent = currentQuestionIndex + 1;

    // Show category label for mix mode
    const questionCategory = document.getElementById('questionCategory');
    if (questionCategory) {
        if (question.category) {
            questionCategory.textContent = capitalizeFirstLetter(question.category);
            questionCategory.classList.remove('hidden');
        } else {
            questionCategory.classList.add('hidden');
        }
    }

    // Reset UI state
    answerSection.classList.add('hidden');
    showAnswerBtn.classList.remove('hidden');
    scoringButtons.classList.add('hidden');
    nextBtn.classList.add('hidden');
    answerRevealed = false;

    // Reset hints for this question
    resetHintsForQuestion();

    // Start timer for this question
    stopTimer(); // Clear any existing timer
    startTimer();
}

// Show Answer
showAnswerBtn.addEventListener('click', () => {
    stopTimer(); // Stop the timer when answer is revealed
    answerSection.classList.remove('hidden');
    showAnswerBtn.classList.add('hidden');
    scoringButtons.classList.remove('hidden');
    answerRevealed = true;
    updateHintButton(); // Disable hint button
});

// Alternative: Click question card to show answer
document.querySelector('.question-card').addEventListener('click', () => {
    if (!answerRevealed && !showAnswerBtn.classList.contains('hidden')) {
        stopTimer(); // Stop the timer when answer is revealed
        answerSection.classList.remove('hidden');
        showAnswerBtn.classList.add('hidden');
        scoringButtons.classList.remove('hidden');
        answerRevealed = true;
        updateHintButton(); // Disable hint button
    }
});

// Update running percentage (based on correct answers, not total points)
function updateRunningPercent() {
    const answered = currentQuestionIndex + 1;
    const percent = Math.round((correctAnswers / answered) * 100);
    runningPercentEl.textContent = percent;
}

// Update next button text based on whether it's the last question
function updateNextButtonText() {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    nextBtn.textContent = isLastQuestion ? 'See Results' : 'Next Question';
}

// Correct Answer
correctBtn.addEventListener('click', () => {
    // Calculate bonus before incrementing streak
    const bonus = calculateStreakBonus(currentStreak);

    // Track correct answer and add points
    correctAnswers++;
    const pointsEarned = 1 + bonus;
    score += pointsEarned;
    totalBonusPoints += bonus;
    scoreEl.textContent = score;

    // Party mode: add score to current player
    if (partyModeEnabled) {
        addScoreToCurrentPlayer(pointsEarned, true);
    }

    // Show bonus popup if earned
    if (bonus > 0) {
        showBonusPopup(bonus);
    }

    incrementStreak();
    updateRunningPercent();
    scoringButtons.classList.add('hidden');
    updateNextButtonText();
    nextBtn.classList.remove('hidden');
});

// Incorrect Answer
incorrectBtn.addEventListener('click', () => {
    resetStreak();
    updateRunningPercent();
    scoringButtons.classList.add('hidden');
    updateNextButtonText();
    nextBtn.classList.remove('hidden');
});

// Next Question
nextBtn.addEventListener('click', () => {
    // Party mode: rotate to next player
    if (partyModeEnabled) {
        nextPlayer();
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
});

// End Quiz
function endQuiz() {
    stopTimer();
    hideTimerDisplay();

    quizContainer.classList.add('hidden');

    // Show party mode results or regular results
    if (partyModeEnabled) {
        showPartyGameOver();
        return;
    }

    gameOver.classList.remove('hidden');

    // Show correct answers and percentage
    const finalCorrect = document.getElementById('finalCorrect');
    if (finalCorrect) {
        finalCorrect.textContent = correctAnswers;
    }
    finalTotal.textContent = questions.length;

    const percentScore = Math.round((correctAnswers / questions.length) * 100);
    percentage.textContent = `${percentScore}%`;

    // Confetti for perfect score!
    if (percentScore === 100) {
        showConfetti();
    }

    // Show total points only when bonus was earned
    const totalPointsValue = document.getElementById('totalPointsValue');
    const totalPointsDisplay = document.getElementById('totalPointsDisplay');
    if (totalPointsValue && totalPointsDisplay) {
        if (totalBonusPoints > 0) {
            totalPointsValue.textContent = score;
            totalPointsDisplay.classList.remove('hidden');
        } else {
            totalPointsDisplay.classList.add('hidden');
        }
    }

    // Update best streak display
    const bestStreakValue = document.getElementById('bestStreakValue');
    const bestStreakDisplay = document.getElementById('bestStreakDisplay');
    if (bestStreakValue && bestStreakDisplay) {
        if (maxStreak >= 3) {
            bestStreakValue.textContent = maxStreak;
            bestStreakDisplay.classList.remove('hidden');
        } else {
            bestStreakDisplay.classList.add('hidden');
        }
    }

    // Update hints used display
    const hintsUsedValue = document.getElementById('hintsUsedValue');
    const hintsUsedDisplay = document.getElementById('hintsUsedDisplay');
    if (hintsUsedValue && hintsUsedDisplay) {
        if (hintsUsed > 0) {
            hintsUsedValue.textContent = hintsUsed;
            hintsUsedDisplay.classList.remove('hidden');
        } else {
            hintsUsedDisplay.classList.add('hidden');
        }
    }

    // Save progress to localStorage (use correctAnswers for high score tracking)
    const progress = updateHighScore(currentTheme, correctAnswers, questions.length);

    // Check if new high score
    const isNewHighScore = progress.highScores[currentTheme].score === correctAnswers &&
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
    stopTimer();
    hideTimerDisplay();
    container.classList.remove('quiz-active');
    quizContainer.classList.add('hidden');
    themeSelection.classList.remove('hidden');
    hideHomeButton();
    updateStatsDisplay();
    updateThemeButtons();
});

// Play Again
playAgainBtn.addEventListener('click', () => {
    stopTimer();
    hideTimerDisplay();
    container.classList.remove('quiz-active');
    gameOver.classList.add('hidden');
    themeSelection.classList.remove('hidden');
    hideHomeButton();
    updateStatsDisplay();
    updateThemeButtons();
});

// Home Button Functions
function showHomeButton() {
    if (homeBtn) {
        homeBtn.classList.remove('hidden');
    }
}

function hideHomeButton() {
    if (homeBtn) {
        homeBtn.classList.add('hidden');
    }
}

// Home Button Click Handler
if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        stopTimer();
        hideTimerDisplay();
        container.classList.remove('quiz-active');
        quizContainer.classList.add('hidden');
        gameOver.classList.add('hidden');
        themeSelection.classList.remove('hidden');
        hideHomeButton();
        updateStatsDisplay();
        updateThemeButtons();
    });
}

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
        'african': 'African',
        'mix': 'Random Mix'
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

    const totalThemes = AVAILABLE_THEMES.length;
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
    initializeTimerToggle();
    initializeShuffleToggle();
    initializeQuestionCountSelector();
    initializeKeyboardNavigation();
    initializeHintButton();
    initializePartyModeToggle();

    // Quiz data is now lazy-loaded per category when a theme is selected
    // No need to pre-load all data

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

    // Party mode button handlers
    const partyPlayAgainBtn = document.getElementById('partyPlayAgainBtn');
    if (partyPlayAgainBtn) {
        partyPlayAgainBtn.addEventListener('click', () => {
            stopTimer();
            hideTimerDisplay();
            container.classList.remove('quiz-active');
            document.getElementById('partyGameOver')?.classList.add('hidden');
            themeSelection.classList.remove('hidden');
            hideHomeButton();
            updateStatsDisplay();
            updateThemeButtons();
        });
    }

    const partyShareBtn = document.getElementById('partyShareBtn');
    if (partyShareBtn) {
        partyShareBtn.addEventListener('click', async () => {
            const shareText = getPartyShareText();
            try {
                await navigator.clipboard.writeText(shareText);
                partyShareBtn.textContent = '✓ Copied!';
                partyShareBtn.classList.add('copied');
                setTimeout(() => {
                    partyShareBtn.textContent = '📋 Share Results';
                    partyShareBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                alert('Copy this to share:\n\n' + shareText);
            }
        });
    }

    // Share button handler
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
