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
- [ ] Save high scores per theme
- [ ] Track which themes have been completed
- [ ] Remember last played theme
- [ ] Show personal statistics (total questions answered, overall accuracy)

**Status:** Not started

---

## 3. Timer Mode (Optional Challenge)
- [ ] Add optional countdown timer for each question (e.g., 30 seconds)
- [ ] Create toggle to enable/disable timer mode
- [ ] Visual countdown display
- [ ] Handle timeout as incorrect answer

**Status:** Not started

---

## 4. Multiplayer/Party Mode
- [ ] Implement "pass and play" mode for 2-4 players
- [ ] Player name entry screen
- [ ] Turn-based question answering
- [ ] Scoreboard showing each player's score at the end

**Status:** Not started

---

## 5. External Quiz Data (JSON)
- [ ] Move quiz data from `script.js` into separate `quizzes.json` file
- [ ] Implement async loading of quiz data
- [ ] Smaller initial JS bundle
- [ ] Support for loading custom quiz files

**Benefits:**
- Easier to add/edit questions without touching code
- Could later support user-uploaded quiz files

**Status:** Not started

---

## 6. Basic Testing Setup
- [ ] Add test runner (Vitest or plain Node.js assertions)
- [ ] Write tests for `shuffleArray` function
- [ ] Write tests for score calculations
- [ ] Set up CI to run tests on commits

**Status:** Not started

---

## 7. Streak & Combo System
- [ ] Track consecutive correct answers
- [ ] Display "streak" counter during quiz
- [ ] Award bonus visual effects for milestones:
  - 5+ streak
  - 10+ streak
  - 15+ streak
- [ ] Optional: Bonus points for streaks

**Status:** Not started

---

## 8. Share Results
- [ ] Add "Share Score" button on results screen
- [ ] Copy formatted result text to clipboard
- [ ] Optional: Generate shareable image
- [ ] Optional: Social media share links

**Status:** Not started

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
- [ ] Add theme switcher button in UI
- [ ] Create dark mode CSS styles
- [ ] Save theme preference to localStorage
- [ ] Respect system preference as default

**Status:** Not started

---

## Priority Suggestions

**Quick Wins (Low effort, high impact):**
- Dark Mode Toggle (#10)
- Local Storage Progress Tracking (#2)

**Medium Effort:**
- Difficulty Levels (#1)
- External Quiz Data (#5)
- Share Results (#8)

**Higher Effort:**
- Timer Mode (#3)
- Streak & Combo System (#7)
- Multiplayer/Party Mode (#4)
- Basic Testing Setup (#6)
- Sound Effects (#9)
