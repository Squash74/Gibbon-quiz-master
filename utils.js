// Utility functions for Gibbon Quiz
// These are pure functions that can be tested independently

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} The same array, shuffled
 */
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Capitalizes theme names with special handling for compound names
 * @param {string} string - The theme key to format
 * @returns {string} The formatted theme name
 */
export function capitalizeFirstLetter(string) {
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

/**
 * Calculates percentage score
 * @param {number} score - Number of correct answers
 * @param {number} total - Total number of questions
 * @returns {number} Percentage rounded to nearest integer
 */
export function calculatePercentage(score, total) {
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
}

/**
 * Determines if a score is a new high score
 * @param {number} newPercentage - The new score percentage
 * @param {number|null} existingPercentage - The existing high score percentage (or null if none)
 * @returns {boolean} True if this is a new high score
 */
export function isNewHighScore(newPercentage, existingPercentage) {
    if (existingPercentage === null || existingPercentage === undefined) {
        return true;
    }
    return newPercentage > existingPercentage;
}

/**
 * Gets the streak milestone level for visual effects
 * @param {number} streak - Current streak count
 * @returns {string|null} Milestone level ('gold', 'orange', 'red') or null
 */
export function getStreakMilestone(streak) {
    if (streak >= 15) return 'red';
    if (streak >= 10) return 'orange';
    if (streak >= 5) return 'gold';
    return null;
}

/**
 * Formats the share text for quiz results
 * @param {string} themeName - The formatted theme name
 * @param {number} score - Number of correct answers
 * @param {number} total - Total number of questions
 * @param {number} maxStreak - Best streak achieved
 * @returns {string} Formatted share text
 */
export function formatShareText(themeName, score, total, maxStreak) {
    const percentScore = calculatePercentage(score, total);

    let streakText = '';
    if (maxStreak >= 3) {
        streakText = `\nBest Streak: ${maxStreak} in a row!`;
    }

    return `🎉 Quiz time 🎉

Theme: ${themeName}
Score: ${score}/${total} (${percentScore}%)${streakText}

Play at: https://squash74.github.io/Gibbon-quiz-master/`;
}
