# Quick Start Guide - HashIt Game

## 1. Prerequisites

Ensure you have:
- Node.js 16+ installed
- npm installed
- Supabase project with tables (see DATABASE SETUP below)

## 2. Environment Setup

Copy your Supabase credentials and update `frontend/.env`:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Install Dependencies

```bash
cd f:/Projects/hashit2
npm install-all
```

Or if that doesn't work:
```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

## 4. Start Development Server

```bash
npm run dev
```

The app will start on:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 5. Create Test Accounts

1. Go to http://localhost:3000
2. Register with Gmail (test@gmail.com, password123456)
3. Wait for redirect (may take a few seconds)
4. You're logged in!

## 6. Test the Game

### Create a Room:
1. Click "Game" button on dashboard
2. Click "Create New Room"
3. Enter name: "Player 1"
4. Select years: "5"
5. Click "Create Room"
6. Copy the room code (e.g., 4829)

### Join the Room:
1. Open another browser tab (or incognito)
2. Create another test account (test2@gmail.com)
3. Click "Game"
4. Click "Join Existing Room"
5. Paste room code: 4829
6. Enter name: "Player 2"
7. Click "Join Room"

### Play a Year:
1. Both tabs now show GameScreen
2. Player 1: Set investment to 30%, click "End Year"
3. See wealth updated and year incremented
4. Check leaderboard (right side)
5. Player 2: Set investment to 70%, click "End Year"
6. Both see updated leaderboard with rankings

### Finish Game:
- Keep clicking "End Year" until year > total years
- See "Game Over" message
- View final leaderboard
- See change in wealth and percentage gain/loss

## 7. Database Setup

If tables don't exist, create them in Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE public.users (
  user_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rooms table
CREATE TABLE public.rooms (
  room_id SERIAL PRIMARY KEY,
  room_code TEXT UNIQUE NOT NULL,
  total_years INTEGER NOT NULL,
  current_year INTEGER DEFAULT 1,
  status TEXT DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Room players table
CREATE TABLE public.room_players (
  id SERIAL PRIMARY KEY,
  room_id INTEGER NOT NULL REFERENCES public.rooms(room_id),
  user_id INTEGER NOT NULL REFERENCES public.users(user_id),
  starting_wealth INTEGER DEFAULT 50000,
  current_wealth INTEGER DEFAULT 50000,
  salary INTEGER DEFAULT 300000,
  joined_at TIMESTAMP DEFAULT NOW()
);

-- Game progress table
CREATE TABLE public.game_progress (
  progress_id SERIAL PRIMARY KEY,
  room_id INTEGER NOT NULL REFERENCES public.rooms(room_id),
  user_id INTEGER NOT NULL REFERENCES public.users(user_id),
  year_number INTEGER NOT NULL,
  net_wealth INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 8. Troubleshooting

### "Supabase keys missing" error
- Check frontend/.env has correct REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY
- Restart dev server after adding env variables

### "Room not found" when joining
- Check room code is correct (case-sensitive, 4 digits)
- Make sure room was created in the same Supabase project

### Wealth not updating
- Check browser console for errors
- Verify game_progress table exists
- Ensure room_players table has user_id foreign key set correctly

### Port already in use
- Kill existing Node processes or use different ports
- Check `package.json` scripts section

### Slow page loads
- Clear browser cache
- Check Supabase database doesn't have millions of rows
- Verify internet connection

## 9. Key Files to Know

| File | Purpose |
|------|---------|
| `frontend/src/App.js` | Main app component, routing, game state |
| `frontend/src/components/GameScreen.js` | Game play interface |
| `frontend/src/components/CreateRoomForm.js` | Create room form |
| `frontend/src/components/JoinRoomForm.js` | Join room form |
| `frontend/src/components/LeaderboardScreen.js` | Final standings |
| `frontend/src/App.css` | All styling |
| `frontend/.env` | Supabase credentials |

## 10. Game Rules

**Each Year:**
1. Player sees slider (0-100% investment)
2. Player adjusts slider to decide investment percentage
3. Player clicks "End Year"

**Calculation:**
```
Available = $180,000 (salary - 40% expenses)
Investment = Available × (percentage / 100)
Return = -10% to +15% (random)
Wealth Update = Previous + Available + (Investment × Return)
```

**Win Condition:**
- Highest wealth at end of all years

## 11. Game Flow Diagram

```
Login/Register
    ↓
Dashboard (click "Game")
    ↓
Game Menu (choose Create or Join)
    ↓
    ├─ Create → CreateRoomForm → GameScreen
    └─ Join → JoinRoomForm → GameScreen
         ↓
      Play Years (adjust slider, click "End Year")
         ↓
      Game Over → Leaderboard
         ↓
      Back to Menu
```

## 12. Example Game Session

**Player 1 (Aggressive):**
- Year 1: 90% investment → +$10,000 (lucky return)
- Year 2: 80% investment → -$5,000 (unlucky return)
- Year 3: 100% investment → +$15,000 (lucky)
- Final: $270,000

**Player 2 (Conservative):**
- Year 1: 10% investment → +$500
- Year 2: 20% investment → -$200
- Year 3: 30% investment → +$1,000
- Final: $181,300

**Result:** Player 1 wins with $88,700 more

## 13. Tips for Testing

1. **Use two browsers** for real multiplayer testing
2. **Test on mobile** to check responsive design
3. **Watch console** for error messages (F12 → Console tab)
4. **Check Supabase** directly to verify data was saved
5. **Try edge cases:**
   - Join room that doesn't exist (should error)
   - Create room with same player twice (should prevent)
   - End year with investment = 0% (should still add salary)
   - End year with investment = 100% (should work fine)

## 14. Performance Notes

- Page refresh needed to see other players' changes (no real-time sync)
- Leaderboard updates immediately after each year
- Database queries are minimal (no unnecessary selects)
- CSS animations use GPU acceleration

## 15. What's Next?

See GAME_IMPLEMENTATION.md for:
- Detailed component documentation
- Complete wealth calculation formula
- Database schema details
- Future enhancement ideas
- Testing checklist

