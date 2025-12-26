# Gibbon Quiz - Recommended Upgrades

This document tracks planned feature upgrades for the Gibbon Quiz application.

---

## 1. Add Difficulty Levels
- [ ] Add `easy`, `medium`, `hard` tags to questions
- [ ] Create difficulty filter in UI
- [ ] Implement "progressive" mode that gets harder as user advances

**Status:** Not started

---

## 2. Local Storage Progress Tracking
- [x] Save high scores per theme
- [x] Track which themes have been completed
- [x] Remember last played theme
- [x] Show personal statistics (total questions answered, overall accuracy)

**Status:** Complete

---

## 3. Timer Mode (Optional Challenge)
- [x] Add optional countdown timer for each question (30 seconds)
- [x] Create toggle to enable/disable timer mode
- [x] Visual countdown display with warning colors
- [x] Handle timeout as incorrect answer (auto-reveals answer)

**Status:** Complete

---

## 4. Multiplayer/Party Mode
- [ ] Implement "pass and play" mode for 2-4 players
- [ ] Player name entry screen
- [ ] Turn-based question answering
- [ ] Scoreboard showing each player's score at the end

**Status:** Not started

---

## 5. External Quiz Data (JSON)
- [x] Move quiz data from `script.js` into separate `quizzes.json` file
- [x] Implement async loading of quiz data
- [x] Smaller initial JS bundle
- [ ] Support for loading custom quiz files (future enhancement)

**Benefits:**
- Easier to add/edit questions without touching code
- Could later support user-uploaded quiz files

**Status:** Complete

---

## 6. Basic Testing Setup
- [x] Add test runner (Vitest or plain Node.js assertions)
- [x] Write tests for `shuffleArray` function
- [x] Write tests for score calculations
- [x] Set up CI to run tests on commits

**Status:** Complete

---

## 7. Streak & Combo System
- [x] Track consecutive correct answers
- [x] Display "streak" counter during quiz
- [x] Award bonus visual effects for milestones:
  - 5+ streak (golden glow)
  - 10+ streak (orange glow)
  - 15+ streak (red glow + celebration)
- [x] Bonus points for streaks:
  - 5+ streak: +1 bonus point
  - 10+ streak: +2 bonus points
  - 15+ streak: +3 bonus points

**Status:** Complete

---

## 8. Share Results
- [x] Add "Share Score" button on results screen
- [x] Copy formatted result text to clipboard
- [ ] Optional: Generate shareable image
- [ ] Optional: Social media share links

**Status:** Complete

---

## 9. Sound Effects (Optional)
- [ ] Add toggle for sound on/off
- [ ] Sound effect for correct answer
- [ ] Sound effect for incorrect answer
- [ ] Sound effect for quiz completion
- [ ] Save sound preference to localStorage

**Status:** Not started

---

## 10. Dark Mode Toggle
- [x] Add theme switcher button in UI
- [x] Create dark mode CSS styles
- [x] Save theme preference to localStorage
- [x] Respect system preference as default

**Status:** Complete

---

## 11. Keyboard Navigation
- [ ] Arrow keys or number keys to navigate options
- [ ] Spacebar to reveal answer
- [ ] Enter to confirm and move to next question
- [ ] Keyboard shortcuts help overlay

**Status:** Not started

---

## 12. Quiz Shuffle Toggle
- [ ] Add option to play questions in original order
- [ ] Useful for study/practice mode
- [ ] Save preference to localStorage

**Status:** Not started

---

## 13. Confetti Animation
- [ ] Add confetti effect on perfect scores
- [ ] Celebration animation on high streaks
- [ ] Optional: particle effects for milestones

**Status:** Not started

---

## 14. Question Hints
- [ ] Add optional hints to questions
- [ ] "Use Hint" button that costs points
- [ ] Track hints used in results

**Status:** Not started

---

## 15. Achievements/Badges
- [ ] Design badge system for milestones
- [ ] Unlock badges (e.g., "Complete all categories", "Perfect score", "10 streak master")
- [ ] Badge display in stats panel
- [ ] Save achievements to localStorage

**Status:** Not started

---

## 16. Daily Challenge
- [ ] Fixed set of questions each day (seeded random)
- [ ] Track daily challenge completion
- [ ] Show daily streak counter
- [ ] Compare with previous days

**Status:** Not started

---

## 17. Review Mode
- [ ] After quiz, show all Q&A pairs
- [ ] Highlight incorrect answers for review
- [ ] Option to retry missed questions only

**Status:** Not started

---

## 18. Mixed Category Mode
- [ ] "Random Mix" category option
- [ ] Pull questions from all categories
- [ ] Show which category each question is from

**Status:** Not started

---

## 19. Accessibility Improvements
- [ ] Add ARIA labels to interactive elements
- [ ] Improve focus management
- [ ] Screen reader announcements for score changes
- [ ] High contrast mode option

**Status:** Not started

---

## 20. Local Leaderboard
- [ ] Top 5 scores per category with initials
- [ ] Entry screen for initials on high score
- [ ] Persistent leaderboard in localStorage

**Status:** Not started

---

## 21. PWA Support
- [ ] Add web app manifest
- [ ] Implement service worker for offline play
- [ ] Cache quiz data for offline access
- [ ] Install prompt for mobile users

**Status:** Not started

---

## 22. Question Contribution
- [ ] Simple form to submit new questions
- [ ] Preview submitted question
- [ ] Export as JSON for review

**Status:** Not started

---

## Priority Suggestions

**Completed Features:**
- Dark Mode Toggle (#10) ✅
- Local Storage Progress Tracking (#2) ✅
- Timer Mode (#3) ✅
- External Quiz Data (#5) ✅
- Streak & Combo System (#7) ✅
- Share Results (#8) ✅
- Basic Testing Setup (#6) ✅

**Remaining - Low Effort:**
- Keyboard Navigation (#11)
- Quiz Shuffle Toggle (#12)
- Confetti Animation (#13)
- Question Hints (#14)

**Remaining - Medium Effort:**
- Difficulty Levels (#1)
- Achievements/Badges (#15)
- Daily Challenge (#16)
- Review Mode (#17)
- Mixed Category Mode (#18)
- Accessibility Improvements (#19)

**Remaining - Higher Effort:**
- Multiplayer/Party Mode (#4)
- Sound Effects (#9)
- Local Leaderboard (#20)
- PWA Support (#21)
- Question Contribution (#22)
