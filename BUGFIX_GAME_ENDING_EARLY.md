# BUGFIX: Game Ending After First Year Press

## Problem
The game was ending immediately after the first player pressed "End Year", regardless of how many total years were set.

## Root Cause
The bug was in how player years were being tracked:
- **Wrong:** Using `room.current_year` (shared room year) to track each player's progress
- **Result:** When the first player finished year 1, the room year became 2. The second player would load with year 2, and pressing "End Year" would immediately show game complete.

## Solution
Track each player's year **individually** in the `room_players` table:

1. **Added new column:** `current_year` to `room_players` table
2. **Updated GameScreen.js:**
   - Load player's `current_year` from database (not room year)
   - Save player's `current_year` when they complete a year
3. **Keep room year separate:** `room.current_year` is now only for UI display purposes

## Database Migration

Run this SQL in your Supabase dashboard:

```sql
ALTER TABLE public.room_players
ADD COLUMN current_year INTEGER DEFAULT 1;

UPDATE public.room_players
SET current_year = 1
WHERE current_year IS NULL;

ALTER TABLE public.room_players
ALTER COLUMN current_year SET NOT NULL;
```

Or run the migration file: `MIGRATION_ADD_PLAYER_YEAR.sql`

## Code Changes

### In `loadGameState()`:
```javascript
// NOW: Load player's individual year
const { data: player } = await supabase
  .from('room_players')
  .select('users(name), current_wealth, salary, current_year')
  // ...
setCurrentYear(player.current_year || 1);
```

### In `handleSubmitYear()`:
```javascript
// NOW: Save player's new year
const { error: updateError } = await supabase
  .from('room_players')
  .update({
    current_wealth: Math.round(newWealth),
    salary: Math.round(newSalary),
    current_year: nextYear,  // ← Save player's year
  })
  // ...
```

## Testing Steps

1. **Run migration** to add `current_year` column
2. **Create a new room** with 5 years
3. **Player 1:** Press "End Year" → Should show Year 2/5 ✓
4. **Player 2:** Press "End Year" → Should show Year 2/5 ✓
5. **Player 1:** Press "End Year" multiple times → Year progresses 3/5, 4/5, 5/5, then GAME OVER ✓
6. **Player 2:** Can continue independently → Their game doesn't end until they reach 5/5 ✓

## Result
✅ Each player's game progresses independently
✅ Multi-player scenarios work correctly
✅ Game ends only when each player reaches their totalYears
✅ Backward compatible with existing rooms
