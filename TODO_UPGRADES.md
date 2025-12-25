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
- [ ] Add test runner (Vitest or plain Node.js assertions)
- [ ] Write tests for `shuffleArray` function
- [ ] Write tests for score calculations
- [ ] Set up CI to run tests on commits

**Status:** Not started

---

## 7. Streak & Combo System
- [x] Track consecutive correct answers
- [x] Display "streak" counter during quiz
- [x] Award bonus visual effects for milestones:
  - 5+ streak (golden glow)
  - 10+ streak (orange glow)
  - 15+ streak (red glow + celebration)
- [ ] Optional: Bonus points for streaks

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

## Priority Suggestions

**Completed Features:**
- Dark Mode Toggle (#10) ✅
- Local Storage Progress Tracking (#2) ✅
- Timer Mode (#3) ✅
- External Quiz Data (#5) ✅
- Streak & Combo System (#7) ✅
- Share Results (#8) ✅

**Remaining - Medium Effort:**
- Difficulty Levels (#1)

**Remaining - Higher Effort:**
- Multiplayer/Party Mode (#4)
- Basic Testing Setup (#6)
- Sound Effects (#9)
