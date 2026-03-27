# Quick Fix: "Failed to load game state" Error

## Immediate Actions (Try These First)

### 1. Clear Browser Cache
- Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
- Select "All time"
- Check "Cookies and other site data"
- Check "Cached images and files"
- Click "Clear data"
- Refresh the page

### 2. Restart Dev Server
```powershell
# Press Ctrl+C in terminal to stop
# Then restart:
npm run dev
```

### 3. Test with New Room
1. Create a brand new room (new code, new room)
2. Don't use any old room codes
3. Try playing through Year 1 and Year 2
4. Check if it works

## If Still Getting Error

### Check Error Details
1. Open browser DevTools: `F12`
2. Go to "Console" tab
3. Look for error messages starting with "Error loading game state:"
4. Note the full error message
5. Take a screenshot

### Run Migration (Recommended)
If you haven't already, run this SQL in Supabase:

**Navigate to:**
Supabase Dashboard → Your Project → SQL Editor

**Paste and run:**
```sql
ALTER TABLE public.room_players
ADD COLUMN current_year INTEGER DEFAULT 1;

UPDATE public.room_players
SET current_year = 1;

ALTER TABLE public.room_players
ALTER COLUMN current_year SET NOT NULL;
```

**Then:**
1. Restart `npm run dev`
2. Clear browser cache again
3. Try with a new room

## Code Status

The GameScreen.js has been updated to **handle BOTH cases**:
- ✅ With `current_year` column (after migration)
- ✅ Without `current_year` column (backward compatible)

So the app should work either way, but the migration makes it better.

## Still Not Working?

Share the error message from console (F12), and we can debug further.

The error usually looks like one of these:
```
Error: column "current_year" does not exist
→ Solution: Run the migration SQL

Error: no rows returned
→ Solution: Make sure you're logged in and room/player exist

Error: 401 Unauthorized
→ Solution: Check Supabase connection and API keys
```

## Testing Checklist

After applying fix:
- [ ] Clear cache (`Ctrl+Shift+Delete`)
- [ ] Restart server (`npm run dev`)
- [ ] Create NEW room
- [ ] Join as Player 1
- [ ] Play Year 1 → Press "End Year"
- [ ] Verify Year shows as 2/5 (not GAME COMPLETE)
- [ ] Join as Player 2 → Play Year 1 → Press "End Year"
- [ ] Verify Year 2/5 (not GAME COMPLETE)
- [ ] Both can continue playing independently ✓

That's it!
