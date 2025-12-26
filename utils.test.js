import { describe, it, expect } from 'vitest';
import {
    shuffleArray,
    capitalizeFirstLetter,
    calculatePercentage,
    isNewHighScore,
    getStreakMilestone,
    calculateStreakBonus,
    formatShareText
} from './utils.js';

describe('shuffleArray', () => {
    it('should return the same array instance', () => {
        const original = [1, 2, 3, 4, 5];
        const result = shuffleArray(original);
        expect(result).toBe(original);
    });

    it('should maintain array length', () => {
        const arr = [1, 2, 3, 4, 5];
        shuffleArray(arr);
        expect(arr.length).toBe(5);
    });

    it('should contain all original elements', () => {
        const arr = [1, 2, 3, 4, 5];
        shuffleArray(arr);
        expect(arr.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle empty array', () => {
        const arr = [];
        shuffleArray(arr);
        expect(arr).toEqual([]);
    });

    it('should handle single element array', () => {
        const arr = [1];
        shuffleArray(arr);
        expect(arr).toEqual([1]);
    });

    it('should produce different orderings over multiple runs', () => {
        const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const results = new Set();

        // Run shuffle 20 times and collect unique orderings
        for (let i = 0; i < 20; i++) {
            const arr = [...original];
            shuffleArray(arr);
            results.add(JSON.stringify(arr));
        }

        // Should have more than 1 unique ordering (statistically almost certain)
        expect(results.size).toBeGreaterThan(1);
    });
});

describe('capitalizeFirstLetter', () => {
    it('should handle special theme names', () => {
        expect(capitalizeFirstLetter('southafrica')).toBe('South Africa');
        expect(capitalizeFirstLetter('science')).toBe('Science & Nature');
        expect(capitalizeFirstLetter('tvshows')).toBe('TV Shows');
        expect(capitalizeFirstLetter('artculture')).toBe('Art & Culture');
        expect(capitalizeFirstLetter('food')).toBe('Food & Drink');
    });

    it('should capitalize first letter for unknown themes', () => {
        expect(capitalizeFirstLetter('movies')).toBe('Movies');
        expect(capitalizeFirstLetter('christmas')).toBe('Christmas');
        expect(capitalizeFirstLetter('places')).toBe('Places');
    });

    it('should handle already capitalized input', () => {
        expect(capitalizeFirstLetter('Movies')).toBe('Movies');
    });

    it('should handle single character', () => {
        expect(capitalizeFirstLetter('a')).toBe('A');
    });
});

describe('calculatePercentage', () => {
    it('should calculate correct percentage', () => {
        expect(calculatePercentage(7, 10)).toBe(70);
        expect(calculatePercentage(10, 10)).toBe(100);
        expect(calculatePercentage(0, 10)).toBe(0);
    });

    it('should round to nearest integer', () => {
        expect(calculatePercentage(1, 3)).toBe(33);  // 33.33... rounds to 33
        expect(calculatePercentage(2, 3)).toBe(67);  // 66.66... rounds to 67
    });

    it('should handle zero total', () => {
        expect(calculatePercentage(0, 0)).toBe(0);
    });

    it('should handle perfect scores', () => {
        expect(calculatePercentage(15, 15)).toBe(100);
        expect(calculatePercentage(25, 25)).toBe(100);
    });
});

describe('isNewHighScore', () => {
    it('should return true when no existing score', () => {
        expect(isNewHighScore(50, null)).toBe(true);
        expect(isNewHighScore(50, undefined)).toBe(true);
    });

    it('should return true when new score is higher', () => {
        expect(isNewHighScore(80, 70)).toBe(true);
    });

    it('should return false when new score is lower', () => {
        expect(isNewHighScore(60, 70)).toBe(false);
    });

    it('should return false when scores are equal', () => {
        expect(isNewHighScore(70, 70)).toBe(false);
    });
});

describe('getStreakMilestone', () => {
    it('should return null for streaks below 5', () => {
        expect(getStreakMilestone(0)).toBe(null);
        expect(getStreakMilestone(4)).toBe(null);
    });

    it('should return gold for streaks 5-9', () => {
        expect(getStreakMilestone(5)).toBe('gold');
        expect(getStreakMilestone(9)).toBe('gold');
    });

    it('should return orange for streaks 10-14', () => {
        expect(getStreakMilestone(10)).toBe('orange');
        expect(getStreakMilestone(14)).toBe('orange');
    });

    it('should return red for streaks 15+', () => {
        expect(getStreakMilestone(15)).toBe('red');
        expect(getStreakMilestone(100)).toBe('red');
    });
});

describe('calculateStreakBonus', () => {
    it('should return 0 for streaks below 5', () => {
        expect(calculateStreakBonus(0)).toBe(0);
        expect(calculateStreakBonus(1)).toBe(0);
        expect(calculateStreakBonus(4)).toBe(0);
    });

    it('should return 1 for streaks 5-9', () => {
        expect(calculateStreakBonus(5)).toBe(1);
        expect(calculateStreakBonus(7)).toBe(1);
        expect(calculateStreakBonus(9)).toBe(1);
    });

    it('should return 2 for streaks 10-14', () => {
        expect(calculateStreakBonus(10)).toBe(2);
        expect(calculateStreakBonus(12)).toBe(2);
        expect(calculateStreakBonus(14)).toBe(2);
    });

    it('should return 3 for streaks 15+', () => {
        expect(calculateStreakBonus(15)).toBe(3);
        expect(calculateStreakBonus(20)).toBe(3);
        expect(calculateStreakBonus(100)).toBe(3);
    });

    it('should match streak milestones thresholds', () => {
        // Bonus should align with milestone thresholds
        expect(calculateStreakBonus(4)).toBe(0);  // No milestone
        expect(calculateStreakBonus(5)).toBe(1);  // Gold milestone
        expect(calculateStreakBonus(10)).toBe(2); // Orange milestone
        expect(calculateStreakBonus(15)).toBe(3); // Red milestone
    });
});

describe('formatShareText', () => {
    it('should format basic share text', () => {
        const result = formatShareText('Movies', 8, 10, 2);
        expect(result).toContain('Theme: Movies');
        expect(result).toContain('Score: 8/10 (80%)');
        expect(result).not.toContain('Best Streak');
    });

    it('should include streak for 3+', () => {
        const result = formatShareText('Science & Nature', 10, 15, 5);
        expect(result).toContain('Best Streak: 5 in a row!');
    });

    it('should include play link', () => {
        const result = formatShareText('Movies', 5, 10, 0);
        expect(result).toContain('https://squash74.github.io/Gibbon-quiz-master/');
    });

    it('should handle perfect score', () => {
        const result = formatShareText('History', 15, 15, 15);
        expect(result).toContain('Score: 15/15 (100%)');
        expect(result).toContain('Best Streak: 15 in a row!');
    });
});
