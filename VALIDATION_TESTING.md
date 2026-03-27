# Implementation Validation & Testing Guide

## Prerequisite Validation

### Environment Variables
```bash
# Check frontend/.env exists and has values
cat frontend/.env

# Should output:
# REACT_APP_SUPABASE_URL=https://xxx.supabase.co
# REACT_APP_SUPABASE_ANON_KEY=eyJxxx...
```

### Dependencies
```bash
# Verify all packages installed
npm list @supabase/supabase-js  # Should be 2.39.0 or higher
npm list react                  # Should be 18.2.0 or higher
npm list react-scripts          # Should be 5.0.1 or higher

# If missing, install:
npm install
npm install --prefix frontend
npm install --prefix backend
```

### Supabase Configuration
```sql
-- Run in Supabase SQL Editor to verify tables exist:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should show: game_progress, room_players, rooms, users
```

## Component Functionality Tests

### Test 1: CreateRoomForm Component

**Setup:**
- Start dev server: `npm run dev`
- Navigate to /home
- Click "Create New Room"

**Test Steps:**
1. Leave "Player Name" empty → Click Create Room
   - **Expected:** Error message "Please enter your name"
   - **Actual:** _______________

2. Enter name "TestPlayer1" → Select "6 Years" → Click Create Room
   - **Expected:** Form submits, shows success screen with 4-digit code
   - **Actual:** _______________

3. Copy the displayed room code
   - **Expected:** Room code is 4 digits, all numbers
   - **Actual:** _______________

4. Verify database insertion:
   ```sql
   SELECT * FROM users WHERE name = 'TestPlayer1';
   SELECT * FROM rooms WHERE room_code = '<code>';
   SELECT * FROM room_players WHERE user_id = <user_id>;
   ```
   - **Expected:** All three queries return one row each
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Form validation works (error on empty name)
- [ ] Form submits successfully
- [ ] Success screen displays room code
- [ ] Room code is 4 digits
- [ ] User inserted into users table
- [ ] Room inserted into rooms table
- [ ] Room player inserted into room_players table
- [ ] Starting wealth = 50000
- [ ] Current wealth = 50000
- [ ] Salary = 300000

### Test 2: JoinRoomForm Component

**Setup:**
- Still on create room success screen
- Save the room code from Test 1

**Test Steps:**
1. Click "Back to Menu" or refresh and select "Join Room"
2. Try invalid room code (e.g., "0000")
   - **Expected:** Error "Room not found. Check the code and try again."
   - **Actual:** _______________

3. Enter correct room code from Test 1
4. Enter name "TestPlayer2" → Click Join Room
   - **Expected:** Form submits, navigates to GameScreen
   - **Actual:** _______________

5. Verify database insertion:
   ```sql
   SELECT * FROM room_players WHERE room_id = <room_id>;
   ```
   - **Expected:** Two rows (TestPlayer1 and TestPlayer2)
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Invalid room code shows error
- [ ] Valid room code is accepted
- [ ] Player joins successfully
- [ ] Navigates to GameScreen
- [ ] Second player added to room_players table
- [ ] Room_players shows both players

### Test 3: GameScreen Component

**Setup:**
- You should now be on GameScreen with both players joined

**Test Steps:**
1. Check display elements:
   - **Room Code:** Should show the room code from Test 1
   - **Year:** Should show "1 / 6"
   - **Player:** Should show "TestPlayer2" (logged in player)
   - **Wealth:** Should show "$50,000"

2. Test investment slider:
   - Drag slider to 0%
     - **Expected:** "Will invest: $0"
     - **Actual:** _______________
   
   - Drag slider to 50%
     - **Expected:** "Will invest: $90,000"
     - **Actual:** _______________
   
   - Drag slider to 100%
     - **Expected:** "Will invest: $180,000"
     - **Actual:** _______________

3. Click "End Year" with slider at 50%
   - **Expected:** 
     - Wealth updates (varies due to random return)
     - Year increments to 2
     - Success message shows
     - Leaderboard updates
   - **Actual:** _______________

4. Verify wealth calculation:
   ```sql
   SELECT user_id, current_wealth FROM room_players 
   WHERE room_id = <room_id> 
   ORDER BY user_id;
   ```
   - **Expected:** TestPlayer2's wealth changed from 50000
   - **Actual:** _______________

5. Verify game_progress insertion:
   ```sql
   SELECT * FROM game_progress WHERE room_id = <room_id>;
   ```
   - **Expected:** One record with year_number=1, net_wealth=<updated_amount>
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Room code displays correctly
- [ ] Year displays as "X / Total"
- [ ] Player name displays
- [ ] Initial wealth is $50,000
- [ ] Investment % slider works (0-100)
- [ ] Investment amount preview updates
- [ ] "End Year" button submits successfully
- [ ] Wealth updates after submission
- [ ] Year increments to next value
- [ ] game_progress table is populated
- [ ] room_players current_wealth updated
- [ ] Leaderboard shows all players

### Test 4: Wealth Calculation Accuracy

**Manual Calculation:**
```
Starting Wealth: $50,000
Salary: $300,000
Expenses (40%): $120,000
Available: $180,000
Investment %: 50%
Investment Amount: $90,000

If random return = +5%:
Investment Return: $4,500
New Wealth: $50,000 + $180,000 + $4,500 = $234,500

If random return = -8%:
Investment Return: -$7,200
New Wealth: $50,000 + $180,000 - $7,200 = $222,800
```

**Test:**
1. Play multiple years, recording results
2. For each year, calculate expected range:
   - Minimum: oldWealth + 180000 + (invested × -0.10)
   - Maximum: oldWealth + 180000 + (invested × +0.15)
3. Verify actual wealth falls within range
   - **Expected:** ✓ Within range
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Salary is $300,000
- [ ] Expenses are 40% = $120,000
- [ ] Available to invest = $180,000
- [ ] Minimum return = -10%
- [ ] Maximum return = +15%
- [ ] Formula: newWealth = old + 180k + (invested × return)
- [ ] Wealth always increases by at least $180,000
- [ ] Random returns fall in -10% to +15% range

### Test 5: Game Completion Flow

**Setup:**
- Continuing from Test 4, you have a game with 6 years

**Test Steps:**
1. Continue playing years 2-5 (click "End Year" for each)
2. On year 6, click "End Year"
   - **Expected:** Shows "Game Over!" message
   - **Actual:** _______________

3. Cannot click "End Year" again
   - **Expected:** Button disabled or error message
   - **Actual:** _______________

4. See leaderboard with final rankings
   - **Expected:** Both players listed, ranked by final wealth
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Game ends after total_years played
- [ ] "Game Over" message displays
- [ ] Leaderboard appears
- [ ] All players shown
- [ ] Players ranked by current_wealth (descending)
- [ ] Can go back to menu

### Test 6: Leaderboard Screen

**Setup:**
- You're on the leaderboard after game ends

**Test Steps:**
1. Verify display:
   - Room code
   - Total years
   - Player rankings
   - Starting wealth for each player
   - Final wealth for each player
   - Wealth change ($) for each player
   - Percentage change for each player
   - Winner highlighted (highest wealth)

2. Calculate percentage change:
   ```
   % Change = (Final - Starting) / Starting × 100
   ```
   - **Expected:** Calculations accurate
   - **Actual:** _______________

3. Back button returns to game menu
   - **Expected:** Click "Back to Menu" → Game menu appears
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Leaderboard displays all players
- [ ] Players ranked by final wealth (descending)
- [ ] Starting wealth displays
- [ ] Final wealth displays
- [ ] Wealth change calculated correctly
- [ ] Percentage change calculated correctly
- [ ] Winner highlighted
- [ ] Room code shown
- [ ] Back button works

## Multi-Player Testing

### Test 7: Two Player Game

**Setup:**
- Open two browser tabs/windows
- Create a room in Tab 1
- Join the same room in Tab 2

**Test Steps:**
1. Tab 1: Set investment to 30%, click "End Year"
2. Tab 2: Refresh page
   - **Expected:** Year advances to 2
   - **Actual:** _______________

3. Tab 2: Set investment to 70%, click "End Year"
4. Tab 1: Refresh page
   - **Expected:** Year advances to 3
   - **Actual:** _______________

5. Play 2-3 more rounds
6. Both players should see each other's wealth on leaderboard
   - **Expected:** Leaderboard shows both players with different wealth
   - **Actual:** _______________

7. After game ends, both see same final leaderboard
   - **Expected:** Same ranking and wealth displayed
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Two players can join same room
- [ ] Each player's wealth tracked independently
- [ ] Leaderboard shows both players
- [ ] Year progresses for all players
- [ ] Final leaderboard consistent across browsers
- [ ] Page refresh shows updated data

## Error Handling Tests

### Test 8: Error Scenarios

**Test 1: Network Error Simulation**
1. Start game
2. Open DevTools (F12) → Network tab
3. Set throttling to "Offline"
4. Click "End Year"
   - **Expected:** Error message appears
   - **Actual:** _______________

**Test 2: Invalid Data**
1. Try joining with empty name
   - **Expected:** Validation error
   - **Actual:** _______________

2. Try joining room code with letters
   - **Expected:** Validation error or auto-uppercase
   - **Actual:** _______________

**Test 3: Database Errors**
1. Delete player record from database
2. Refresh game page
   - **Expected:** Error message "Failed to load game state"
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Network errors show appropriate message
- [ ] Form validation prevents invalid submissions
- [ ] Database errors don't crash app
- [ ] Error messages are user-friendly
- [ ] User can recover from errors
- [ ] Loading states prevent double-submit

## Performance Tests

### Test 9: Load Testing

**Test Steps:**
1. Create multiple rooms (5-10)
2. Join rooms with different players (10-20 total)
3. Play several years with multiple players
4. Query leaderboard with 10+ players
   - **Expected:** Leaderboard loads in < 2 seconds
   - **Actual:** _______________

5. Check network requests in DevTools
   - **Expected:** No unnecessary queries
   - **Actual:** _______________

**Validation Checklist:**
- [ ] Game loads within 2 seconds
- [ ] Leaderboard loads within 2 seconds
- [ ] Year submission processes within 3 seconds
- [ ] No memory leaks on page refresh
- [ ] No duplicate API calls
- [ ] Smooth animations (60fps)

## Browser Compatibility Tests

### Test 10: Cross-Browser Testing

**Browsers to Test:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

**Test Steps:**
1. Load game in each browser
2. Create a room
3. Play a year
4. Verify leaderboard
5. Check styling:
   - Forms are centered
   - Buttons align properly
   - Slider works smoothly
   - Text is readable
   - Colors display correctly

**Validation Checklist:**
- [ ] App loads without errors in all browsers
- [ ] Forms submit successfully
- [ ] Styling displays consistently
- [ ] Slider works smoothly
- [ ] No console errors
- [ ] Responsive on mobile

## Data Integrity Tests

### Test 11: Data Consistency

**Test Steps:**
1. Create a game with 5 years
2. Play year 1 in Tab 1, Tab 2, etc.
3. Verify database:
   ```sql
   -- Check all players have same current_year in room
   SELECT user_id, room_id FROM room_players 
   WHERE room_id = <id>;
   
   -- Check game_progress has entry for each player each year
   SELECT COUNT(*) FROM game_progress 
   WHERE room_id = <id>;  -- Should be (num_players * years_played)
   
   -- Check no orphaned records
   SELECT COUNT(*) FROM room_players rp
   WHERE NOT EXISTS (SELECT 1 FROM users u WHERE u.user_id = rp.user_id);
   ```
   - **Expected:** No mismatches or orphaned records
   - **Actual:** _______________

**Validation Checklist:**
- [ ] All players in room have same year
- [ ] game_progress has entries for all players
- [ ] No orphaned records (room_players with missing users)
- [ ] Wealth values are reasonable (>= 50000)
- [ ] No negative wealth values
- [ ] All foreign keys intact

## Final Validation Checklist

### Functionality
- [ ] Create room works end-to-end
- [ ] Join room works end-to-end
- [ ] Game play calculates wealth correctly
- [ ] Game ends when years complete
- [ ] Leaderboard ranks players correctly
- [ ] All database tables populated correctly

### UI/UX
- [ ] Forms are user-friendly
- [ ] Error messages are clear
- [ ] Success messages show
- [ ] Loading states prevent confusion
- [ ] Mobile responsive
- [ ] Buttons are easy to click
- [ ] Color scheme is professional

### Performance
- [ ] Pages load quickly (< 2s)
- [ ] No lag on interactions
- [ ] Smooth animations
- [ ] No memory leaks
- [ ] Efficient queries

### Data
- [ ] Data persists correctly
- [ ] No data loss on refresh
- [ ] Calculations accurate
- [ ] No orphaned records
- [ ] Consistent across devices

### Security
- [ ] No XSS vulnerabilities (input sanitized)
- [ ] No SQL injection risks (using parameterized queries)
- [ ] CORS configured correctly
- [ ] Secrets not exposed in frontend code

## Sign-off

**Date Tested:** _______________
**Tester Name:** _______________
**All Tests Passed:** ☐ Yes ☐ No
**Known Issues:** _______________________________________________
**Ready for Deployment:** ☐ Yes ☐ No

