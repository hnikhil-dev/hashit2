# Database Migration Guide

## Updated Schema Required

The GameScreen upgrade requires the `room_players` table to include a `salary` column to track player salary progression through events.

### SQL Migration

Run this SQL in your Supabase SQL Editor to add the `salary` column:

```sql
-- Add salary column to room_players if it doesn't exist
ALTER TABLE public.room_players
ADD COLUMN salary INTEGER DEFAULT 300000;

-- Create index for faster queries (optional but recommended)
CREATE INDEX idx_room_players_salary ON public.room_players(salary);
```

### Verification

After running the migration, verify the column exists:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name='room_players' 
ORDER BY ordinal_position;
```

You should see:
- `id` (SERIAL)
- `room_id` (INTEGER)
- `user_id` (INTEGER)
- `starting_wealth` (INTEGER)
- `current_wealth` (INTEGER)
- `salary` (INTEGER) ← NEW
- `joined_at` (TIMESTAMP)

### Alternative: Full Table Recreation

If you prefer to recreate the table from scratch:

```sql
-- Drop old table (WARNING: This deletes all game data!)
DROP TABLE IF EXISTS public.room_players CASCADE;

-- Create new table with salary column
CREATE TABLE public.room_players (
  id SERIAL PRIMARY KEY,
  room_id INTEGER NOT NULL REFERENCES rooms(room_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  starting_wealth INTEGER DEFAULT 50000,
  current_wealth INTEGER DEFAULT 50000,
  salary INTEGER DEFAULT 300000,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(room_id, user_id)
);

-- Create indexes
CREATE INDEX idx_room_players_room_id ON public.room_players(room_id);
CREATE INDEX idx_room_players_user_id ON public.room_players(user_id);
CREATE INDEX idx_room_players_salary ON public.room_players(salary);
```

## What Changed in the Game

### New Features
1. **Scripted Events** - Each year has a specific life event that affects:
   - Salary (promotions, job changes)
   - Liabilities (medical emergencies, family expenses)
   - Market conditions (booms, slowdowns)

2. **Insurance Protection** - Players can buy insurance (5% salary premium) to:
   - Reduce liability damage by 70%
   - Unlock when liability events occur

3. **Dynamic Salary** - Salary increases through promotions and events
   - Tracked in `room_players.salary` column
   - Persists across game sessions

4. **Indian Rupees (₹)** - All currency formatting now uses INR format
   - Replaces hardcoded dollar amounts
   - Uses proper locale formatting

### Game Logic Changes

**Old Year Calculation:**
```
newWealth = currentWealth + 180000 + (investmentReturn)
```

**New Year Calculation:**
```
1. Apply event (salary change, liability, market modifier)
2. Calculate expenses (40% of salary)
3. Calculate investment return (affected by market modifier)
4. Calculate insurance cost & reduced liability
5. Update wealth with all factors
6. Save salary progression for next year
```

### Database Queries Updated

All GameScreen queries now:
- Read `salary` from `room_players`
- Update `salary` when events change it
- Use parameterized queries (Supabase safety)

## Rollback Instructions

If you need to rollback the changes:

```sql
-- Remove salary column (keeps existing data in other columns)
ALTER TABLE public.room_players
DROP COLUMN IF EXISTS salary;

-- Or restore from backup if available
-- Contact your Supabase admin for backup restoration
```

## Testing After Migration

1. Start a new game room
2. Create/join a room with a test player
3. Click "End Year" and verify:
   - Event card displays with correct event
   - Salary updates if event has salary change
   - Insurance checkbox appears for liability events
   - Wealth calculation includes all factors
   - Leaderboard updates correctly

4. Play through all 6 years to test all events:
   - Year 1: First Job
   - Year 2: Medical Emergency (+ insurance option)
   - Year 3: Promotion (+20% salary)
   - Year 4: Market Boom (+5% market modifier)
   - Year 5: Family Responsibility (+ insurance option)
   - Year 6: Startup Opportunity (+8% market modifier)

## Performance Notes

- The `salary` column is indexed for fast queries
- Leaderboard queries remain O(n) but are fast for typical player counts
- Consider adding caching if games exceed 100+ concurrent players

## Backward Compatibility

- Old game sessions can continue (salary defaults to 300000)
- New game sessions will track salary progression
- Wealth calculations are deterministic and reproducible

## Support

If you encounter issues:
1. Check Supabase SQL Editor for error messages
2. Verify foreign key constraints are intact
3. Ensure `rooms` and `users` tables exist
4. Check role-based access control (RLS policies)

---

**Migration Status:** Ready for production use after SQL execution
