# HashIt - Multiplayer Finance Simulation Game

## Quick Start

### Prerequisites
- Node.js 16+
- npm
- Supabase account with the required tables

### Installation

```bash
# Install all dependencies
npm install-all

# Or individually:
npm install
npm install --prefix frontend
npm install --prefix backend
```

### Environment Variables

Create `frontend/.env`:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
```

### Run Development Server

```bash
npm run dev
```

This starts both frontend (port 3000) and backend (port 3001).

---

## Game Features

### 1. CREATE ROOM
- Player enters their name
- Selects number of years (5, 6, or 8)
- System generates a unique 4-digit room code
- Inserts data into: `users`, `rooms`, `room_players` tables
- Displays room code to share

### 2. JOIN ROOM
- Player enters room code and name
- System validates room exists
- Finds or creates user in `users` table
- Inserts player into `room_players` table
- Redirects to game screen

### 3. PLAY YEAR
Each year, players submit an investment percentage (0-100%):

**Calculation:**
- Annual Salary: $300,000
- Expenses (40%): $120,000
- Available to Invest: $180,000
- Investment Amount = Available × (Investment % / 100)
- Random Return = -10% to +15%
- **New Wealth = Previous Wealth + Available + (Investment Amount × Return)**

**Data Flow:**
- Insert record into `game_progress` table (year, net_wealth)
- Update `room_players.current_wealth`
- Increment room year automatically

### 4. UPDATE WEALTH
- Real-time wealth tracking per player
- Leaderboard shows current standings
- Wealth changes persist to database

### 5. LEADERBOARD
- Displays all players in room
- Ranked by `current_wealth` (descending)
- Shows wealth change from starting amount
- Percentage gain/loss calculated

---

## File Structure

```
frontend/src/
├── components/
│   ├── CreateRoomForm.js      # Create new room UI
│   ├── JoinRoomForm.js         # Join existing room UI
│   ├── GameScreen.js           # Game play interface
│   └── LeaderboardScreen.js    # Final standings display
├── lib/
│   └── supabase.js             # Supabase client
├── App.js                      # Main app with routing
├── App.css                     # All styling (game + existing)
└── HomePage.js                 # Dashboard/menu
```

---

## Component Details

### CreateRoomForm
**Props:**
- `onRoomCreated(roomData)` - Callback when room is created
- `onCancel()` - Callback to go back

**Handles:**
1. User creation or lookup (case-insensitive)
2. Unique 4-digit code generation
3. Room insertion with total_years
4. Initial room_players insertion
5. Success message with room code

### JoinRoomForm
**Props:**
- `onRoomJoined(roomData)` - Callback when joined
- `onCancel()` - Callback to go back

**Handles:**
1. Room lookup by code
2. User creation or lookup
3. Duplicate check (already in room)
4. room_players insertion

### GameScreen
**Props:**
- `roomCode` - Current room code
- `roomId` - Room database ID
- `userId` - Current player ID
- `onBackToMenu()` - Go to leaderboard

**Features:**
- Display current year, total years, player wealth
- Investment percentage slider (0-100)
- Automatic wealth calculation
- game_progress insertion
- Leaderboard display (right panel)

### LeaderboardScreen
**Props:**
- `roomId` - Room ID to fetch players
- `onBackToMenu()` - Go back

**Features:**
- Ranked list of all players
- Starting vs final wealth
- Percentage change indicator
- Winner highlight

---

## Database Tables Used

### users
```sql
user_id (PK)
name (text)
created_at
-- Optional: auth_id (UUID) for future auth mapping
```

### rooms
```sql
room_id (PK)
room_code (UNIQUE, 4-digit text)
total_years (int)
current_year (default 1)
status (default 'waiting')
created_at
```

### room_players
```sql
id (PK)
room_id (FK)
user_id (FK)
starting_wealth (default 50000)
current_wealth (default 50000)
salary (default 300000)
joined_at
```

### game_progress
```sql
progress_id (PK)
room_id (FK)
user_id (FK)
year_number (int)
net_wealth (int)
created_at
```

---

## Wealth Calculation Formula

```javascript
const salary = 300000;
const expenses = salary * 0.4;        // $120,000
const remaining = salary - expenses;  // $180,000

// Player chooses investment_percentage (0-100)
const investmentAmount = remaining * (investmentPercentage / 100);

// Random return between -10% and +15%
const returnRate = (Math.random() * 0.25) - 0.1;
const investmentReturn = investmentAmount * returnRate;

// Update wealth
const newWealth = playerWealth + remaining + investmentReturn;
```

---

## Game Flow Diagram

```
Login/Register
    ↓
Dashboard
    ↓
    ├─→ Create Room
    │   ├─ Enter Name
    │   ├─ Select Years
    │   ├─ Get Room Code
    │   └─→ Game Screen
    │
    └─→ Join Room
        ├─ Enter Room Code
        ├─ Enter Name
        └─→ Game Screen

Game Screen
    ├─ Display Year (X / Total)
    ├─ Set Investment %
    ├─ Click "End Year"
    ├─ Calculate Wealth
    ├─ Increment Year
    └─ Repeat until Year > Total Years
         ↓
      Leaderboard
         ↓
      Back to Menu
```

---

## Styling Approach

- **Tailwind-inspired classes** in App.css
- **Gradient backgrounds** matching existing design
- **Responsive grid layouts** for desktop/mobile
- **Smooth transitions** and hover effects
- **Color scheme:**
  - Primary: Blue (#2563eb)
  - Accent: Orange (#ea580c)
  - Success: Green (#22c55e)
  - Error: Red (#dc2626)
  - Gray scale for text

---

## Testing Checklist

- [ ] User can create a room (name, years selected, code displayed)
- [ ] User can join a room (valid code, name, redirects to game)
- [ ] Year submission calculates wealth correctly
- [ ] Investment percentage slider works (0-100)
- [ ] Game ends after total_years completed
- [ ] Leaderboard shows all players ranked by wealth
- [ ] Multiple players in same room have independent wealth tracking
- [ ] Room code is unique across all rooms
- [ ] Refresh page loads current game state

---

## Future Enhancements

1. **Real-time Sync** - WebSockets for live leaderboard updates
2. **Host Controls** - Let room creator control year progression
3. **Market Events** - Random market crashes or booms affect returns
4. **Achievements** - Badges for highest wealth, best returns, etc.
5. **Analytics** - Charts showing wealth progression over time
6. **Custom Game Rules** - Allow host to set base salary, expense %, return ranges
7. **Player Profiles** - Stats across multiple games
8. **Undo/Replay** - Review past years' decisions

---

## Simplification Notes

✓ **No Real-time Sync** - Page refresh allowed  
✓ **No Complex State Management** - React useState sufficient  
✓ **Minimal Validation** - Basic error handling  
✓ **No Authentication** - Uses name-based identification  
✓ **Single Room Type** - All games follow same rules  
✓ **Host-less Progression** - Any player can increment year  

---

## Error Handling

- Room code not found → Display error message
- User already in room → Display error message
- Supabase connection error → Display error message
- Network timeout → Retry logic on submission

---

## Performance Notes

- Leaderboard loads on game mount and after each year
- Player data cached in state (not refetched each render)
- Minimal database queries per action
- CSS uses hardware acceleration (transform, will-change)

