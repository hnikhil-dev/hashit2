# Architecture & Technical Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Port 3000)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    App.js (Root)                     │   │
│  │  - Auth state management                             │   │
│  │  - Route handling (auth, dashboard, game)            │   │
│  │  - Game state (gameState object)                     │   │
│  │  - Component switching based on route & gameState    │   │
│  └──────────────────────────────────────────────────────┘   │
│           ↓            ↓            ↓           ↓            │
│      HomePage      DashboardPage  AboutPage  Game Components │
│                                              ↓                │
│                                    ┌─────────────────────┐   │
│                                    │ CreateRoomForm      │   │
│                                    │ JoinRoomForm        │   │
│                                    │ GameScreen          │   │
│                                    │ LeaderboardScreen   │   │
│                                    └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────────────────────────────┐
        │   Supabase Client (@supabase/supabase-js) │
        │     - supabase.from().select()            │
        │     - supabase.from().insert()            │
        │     - supabase.from().update()            │
        │     - supabase.auth.signUp()              │
        │     - supabase.auth.signOut()             │
        └───────────────────────────────────────────┘
                            ↓
        ┌──────────────────────────────────────────────┐
        │      Supabase Backend (PostgreSQL)           │
        │  ┌──────────────┬────────────┬──────────┐    │
        │  │    users     │   rooms    │room_play │    │
        │  │ ──────────── │ ──────────┤──────    │    │
        │  │ user_id (PK) │room_id(PK)│ id (PK)  │    │
        │  │ name         │room_code  │ room_id* │    │
        │  │ created_at   │total_years│ user_id* │    │
        │  │              │current_yr │ starting │    │
        │  │              │status     │ current  │    │
        │  │              │created_at │ salary   │    │
        │  │              │           │ joined   │    │
        │  └──────────────┴────────────┴──────────┘    │
        │                                              │
        │  ┌──────────────────────────────────────┐    │
        │  │      game_progress                   │    │
        │  │ ─────────────────────────────────    │    │
        │  │ progress_id (PK)                     │    │
        │  │ room_id* (FK → rooms)                │    │
        │  │ user_id* (FK → users)                │    │
        │  │ year_number                          │    │
        │  │ net_wealth                           │    │
        │  │ created_at                           │    │
        │  └──────────────────────────────────────┘    │
        └──────────────────────────────────────────────┘
```

## Data Flow Diagram

### Creating a Room

```
User Input (Name, Years)
    ↓
CreateRoomForm.handleSubmit()
    ↓
1. Lookup user by name (case-insensitive)
    ├─ Found → Use existing user_id
    └─ Not found → Insert new user → Get user_id
    ↓
2. Generate unique room code (retry 5x if collision)
    ↓
3. Insert into rooms table
    ├─ room_code (unique)
    ├─ total_years (from form)
    ├─ current_year (default 1)
    └─ status (default 'waiting')
    ↓
4. Insert into room_players
    ├─ room_id (from step 3)
    ├─ user_id (from step 1)
    ├─ starting_wealth (50000)
    ├─ current_wealth (50000)
    └─ salary (300000)
    ↓
Display success with room code
```

### Joining a Room

```
User Input (Room Code, Name)
    ↓
JoinRoomForm.handleSubmit()
    ↓
1. SELECT * FROM rooms WHERE room_code = ?
    ├─ Found → Continue
    └─ Not found → Show error
    ↓
2. Lookup user by name
    ├─ Found → Use existing user_id
    └─ Not found → Insert new user → Get user_id
    ↓
3. Check if user already in room
    ├─ Already joined → Show error
    └─ Not joined → Continue
    ↓
4. Insert into room_players (same as room creation)
    ↓
Redirect to GameScreen
```

### Playing a Year

```
User Input (Investment %)
    ↓
GameScreen.handleSubmitYear()
    ↓
Calculate Wealth:
  salary = 300000
  expenses = 120000
  remaining = 180000
  invested = remaining * (investment% / 100)
  return = random(-10%, +15%)
  newWealth = oldWealth + remaining + (invested * return)
    ↓
1. INSERT into game_progress
    ├─ room_id, user_id, year_number, net_wealth
    └─ (Timestamp auto-added)
    ↓
2. UPDATE room_players SET current_wealth = newWealth
    ↓
3. UPDATE rooms SET current_year = nextYear
    (If nextYear <= totalYears)
    ↓
4. Load leaderboard
    ├─ SELECT * FROM room_players
    ├─ ORDER BY current_wealth DESC
    ├─ With joined user data (users.name)
    └─ Update leaderboard display
    ↓
Year completes / Game ends
```

## Component Hierarchy

```
App
├── DashboardPage
│   └── Buttons to navigate
├── AboutPage
│   └── App info
├── HomePage
│   └── Room forms (CREATE/JOIN)
├── GameMenu (new screen in gameState)
│   ├── CreateRoomForm
│   │   └── Calls onRoomCreated
│   ├── JoinRoomForm
│   │   └── Calls onJoinRoom
│   ├── GameScreen
│   │   ├── Game info display
│   │   ├── Investment slider
│   │   ├── Leaderboard panel
│   │   └── Buttons (End Year, Back)
│   └── LeaderboardScreen
│       └── Final rankings table
```

## State Management

### Global App State

```javascript
// Auth/UI State
const [mode, setMode] = useState('login');                // login | register
const [route, setRoute] = useState('auth');               // auth | home | dashboard | about | game | leaderboard
const [session, setSession] = useState(null);             // Supabase session
const [loading, setLoading] = useState(false);            // UI loading
const [message, setMessage] = useState('');               // Success feedback
const [error, setError] = useState('');                   // Error feedback

// Game State
const [gameState, setGameState] = useState({
  roomCode: '',              // Current room code (e.g., "4829")
  roomId: null,              // Supabase room_id
  userId: null,              // Supabase user_id
  screen: 'menu'             // menu | create | join | game | leaderboard
});
```

### Local Component State

#### CreateRoomForm:
```javascript
const [playerName, setPlayerName] = useState('');
const [numberOfYears, setNumberOfYears] = useState('5');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [roomCode, setRoomCode] = useState('');      // Display after creation
```

#### GameScreen:
```javascript
const [currentYear, setCurrentYear] = useState(1);
const [totalYears, setTotalYears] = useState(0);
const [playerName, setPlayerName] = useState('');
const [playerWealth, setPlayerWealth] = useState(50000);
const [investmentPercentage, setInvestmentPercentage] = useState(50);
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');
const [error, setError] = useState('');
const [leaderboard, setLeaderboard] = useState([]);
```

## Routing System

```
Location                    Component Rendered          Game State
─────────────────────────────────────────────────────────────────────
/auth                       Auth (Login/Register)       N/A
/dashboard                  DashboardPage               N/A
/about                      AboutPage                   N/A
/home + gameState.screen    ↓
    = 'menu'                GameMenu buttons            gameState
    = 'create'              CreateRoomForm              gameState
    = 'join'                JoinRoomForm                gameState
    = 'game'                GameScreen                  gameState
    = 'leaderboard'         LeaderboardScreen           gameState
```

## Supabase Integration Points

### Authentication
- `supabase.auth.signUp(email, password)` - Register
- `supabase.auth.signInWithPassword(email, password)` - Login
- `supabase.auth.signOut()` - Logout
- `supabase.auth.getSession()` - Get current session
- `supabase.auth.onAuthStateChange()` - Listen for auth changes

### Database Queries

**Users:**
```javascript
// Find by name (case-insensitive)
.from('users').select('user_id').ilike('name', playerName).single()

// Insert
.from('users').insert([{ name }]).select('user_id').single()
```

**Rooms:**
```javascript
// Find by code
.from('rooms').select('*').eq('room_code', code).single()

// Insert
.from('rooms').insert([{ room_code, total_years }]).select('room_id').single()

// Update year
.from('rooms').update({ current_year }).eq('room_id', roomId).eq('current_year', currentYear)
```

**Room Players:**
```javascript
// Insert
.from('room_players').insert([{ room_id, user_id, ... }])

// Find by user and room
.from('room_players').select('*').eq('room_id', roomId).eq('user_id', userId).single()

// Get leaderboard
.from('room_players').select('users(name), current_wealth').eq('room_id', roomId).order('current_wealth', { ascending: false })

// Update wealth
.from('room_players').update({ current_wealth }).eq('room_id', roomId).eq('user_id', userId)
```

**Game Progress:**
```javascript
// Insert
.from('game_progress').insert([{ room_id, user_id, year_number, net_wealth }])
```

## Error Handling Strategy

```
Try-Catch Blocks:
├── CreateRoomForm.handleSubmit()
├── JoinRoomForm.handleSubmit()
├── GameScreen.handleSubmitYear()
├── GameScreen.loadGameState()
├── GameScreen.loadLeaderboard()
└── LeaderboardScreen.useEffect()

Error Types Handled:
├── User input validation (empty fields)
├── Room not found (wrong code)
├── User already in room
├── Database errors (Supabase API errors)
└── Network timeouts

User Feedback:
├── Error messages displayed in red (setError)
├── Success messages in green (setMessage)
├── Loading states prevent duplicate submissions
└── Disabled buttons during async operations
```

## Performance Optimizations

1. **Query Optimization:**
   - Single queries only (no N+1 problems)
   - Use `.single()` for guaranteed one result
   - Select only needed columns (future optimization)

2. **State Management:**
   - Leaderboard reloads only after year submission
   - Player data cached (not refetched each render)
   - Game state isolated from auth state

3. **UI Rendering:**
   - Conditional rendering (game over screen)
   - CSS transforms use GPU acceleration
   - No inline function definitions (would break memoization)

4. **Async Handling:**
   - Early returns prevent unnecessary work
   - Error handling stops execution
   - Loading states prevent double-submit

## Caching Strategy

```
Data Cached in State:
├── Player name (loadGameState → setPlayerName)
├── Current wealth (loadGameState → setPlayerWealth)
├── Current/Total years (loadGameState → useState)
└── Leaderboard (loadLeaderboard → setLeaderboard)

Cache Invalidation:
├── After year submission → reload leaderboard
├── After room creation → set gameState
├── After room join → set gameState
└── Page refresh → reload all data
```

## Transaction Safety

Game year submission has potential race condition:

```
Scenario: Two players click "End Year" simultaneously
├─ Player 1 updates year: current_year = 3
├─ Player 2 updates year: current_year = 3 (also sets to 3, not 4)
└─ Year only increments once (safe but limiting)

Solution in Production:
├─ Add `expected_current_year` check
├─ Or use Row-Level Security (RLS) policies
├─ Or add host-only year increment logic
```

## Testing Scenarios

### Happy Path:
1. Create room → Shows code
2. Join room → Enters game
3. Play year → Wealth updates
4. Finish game → Shows leaderboard

### Edge Cases:
1. Join non-existent room → Error message
2. Join room twice → Error message
3. Investment 0% → Still adds salary
4. Investment 100% → Full amount invested
5. Game over → Can't submit year
6. Refresh page → Loads current state

## Deployment Checklist

- [ ] Environment variables set in `.env`
- [ ] Supabase tables created
- [ ] Row-Level Security (RLS) policies configured (if needed)
- [ ] Frontend build: `npm run build --prefix frontend`
- [ ] Backend running or deployed
- [ ] CORS configured in Supabase
- [ ] Test auth flow works
- [ ] Test create/join room works
- [ ] Test year submission calculates correctly
- [ ] Test leaderboard displays correctly

