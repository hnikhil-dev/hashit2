# Quick Reference Card

## 🎮 Game Rules

**Objective:** Grow your wealth by making smart investment decisions

**Setup:**
- Each player starts with $50,000
- Game lasts 5, 6, or 8 years
- Each year: Earn $300,000 salary, spend $120,000 (40%), have $180,000 to invest

**Each Year:**
1. See your current wealth
2. Decide investment % (0-100% slider)
3. Click "End Year"
4. Wealth updates with random return (-10% to +15%)
5. Check leaderboard

**Win:** Highest final wealth after all years

---

## 📱 Screens & Navigation

```
Login/Register
    ↓
Dashboard ("Game" button)
    ↓
Game Menu
    ├─→ Create Room → Form → Game
    └─→ Join Room → Form → Game
    
Game Screen (Play Years)
    ↓
Leaderboard (View Rankings)
    ↓
Back to Menu
```

---

## 🧮 Wealth Formula

```
Base: Previous Wealth
+ Annual Gain: $180,000 (always)
+ Investment Return: Invested Amount × Random (-10% to +15%)

Example:
  Previous: $50,000
  Investment: 50% of $180k = $90,000
  Return: +5% = +$4,500
  New Total: $50,000 + $180,000 + $4,500 = $234,500
```

---

## 🏗️ File Structure

| File | Purpose |
|------|---------|
| `App.js` | Main game routing |
| `CreateRoomForm.js` | Create new room |
| `JoinRoomForm.js` | Join existing room |
| `GameScreen.js` | Play the game |
| `LeaderboardScreen.js` | View final rankings |
| `App.css` | All styling |

---

## 💾 Database Tables

**users**
- user_id (PK)
- name

**rooms**
- room_id (PK)
- room_code (4 digits, unique)
- total_years (5, 6, or 8)
- current_year (progresses)

**room_players**
- id (PK)
- room_id, user_id (FKs)
- current_wealth (updates each year)
- starting_wealth ($50,000)
- salary ($300,000)

**game_progress**
- progress_id (PK)
- room_id, user_id (FKs)
- year_number
- net_wealth (final wealth for year)

---

## 🚀 Quick Start

```bash
# 1. Install
npm install-all

# 2. Configure
# Update frontend/.env with Supabase credentials

# 3. Run
npm run dev

# 4. Test
# Go to http://localhost:3000
# Register → Click Game → Create/Join room
```

---

## ⚠️ Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Supabase keys missing" | Check frontend/.env has REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY |
| Port 3000/3001 in use | Kill existing processes or wait for ports to free up |
| Room not found | Check room code is exactly 4 digits, correct case |
| Data not updating | Refresh page or check Supabase tables exist |
| Styles not showing | Clear browser cache (Ctrl+Shift+Del) |
| Form submitting twice | Check network throttling in DevTools (maybe simulating slow connection) |

---

## 🎨 Key UI Elements

**Investment Slider:**
- Drag left → Conservative (lower risk, lower reward)
- Drag right → Aggressive (higher risk, higher reward)

**Leaderboard Colors:**
- 🟢 Green = Positive wealth change
- 🔴 Red = Negative wealth change
- 🌟 Highlighted = 1st place (winner)

**Messages:**
- ✅ Green = Success
- ❌ Red = Error
- ℹ️ Blue = Information

---

## 📊 Example Game Session

**Setup:** 3 players, 5 years

**Year 1:**
- Player A: 30% investment, +2% return → +$7,800
- Player B: 50% investment, -5% return → -$4,500
- Player C: 80% investment, +10% return → +$16,200

**Current Standings:** C ($66.2k) > A ($57.8k) > B ($45.5k)

**Year 2:**
- Player A: 70% investment, +8% return → +$10,080
- Player B: 40% investment, +3% return → +$2,160
- Player C: 20% investment, -8% return → -$2,880

**Current Standings:** A ($67.9k) > C ($63.3k) > B ($47.7k)

*...game continues...*

**Final after Year 5:**
Winner: Player C with $285,430

---

## 🔍 How to Debug

**Check State:**
- Open DevTools (F12)
- React tab → Find GameScreen component
- See props and state

**Check Database:**
- Go to Supabase dashboard
- Check users, rooms, room_players tables
- Verify data matches game

**Check Network:**
- Open DevTools (F12)
- Network tab
- Look for `/rest/v1/` requests
- Verify responses are success (200)

---

## ✅ Testing Checklist

Before launching:
- [ ] Create room works
- [ ] Join room works
- [ ] Play year submits
- [ ] Wealth updates
- [ ] Leaderboard shows all players
- [ ] Game ends after total years
- [ ] Two players can play same room
- [ ] Final leaderboard correct
- [ ] Mobile responsive
- [ ] No console errors

---

## 🎯 Investment Strategy Tips

**Conservative (10-30%):**
- Low risk of loss
- Steady, reliable growth
- Final wealth: ~$200-220k

**Balanced (40-60%):**
- Moderate risk/reward
- Most consistent results
- Final wealth: ~$220-260k

**Aggressive (70-100%):**
- High volatility
- Potential for big gains/losses
- Final wealth: ~$180-300k+

---

## 📞 Quick Help

**Q: Can I play alone?**
A: Yes, but leaderboard shows only you

**Q: What if I join a room that's already started?**
A: You start at year 1 with $50,000 like others. You can catch up!

**Q: Can I undo a year?**
A: No, but you can create a new game and try different strategy

**Q: Why did my wealth decrease?**
A: Random returns can be negative (-10% to -1%). That's the risk!

**Q: How is winner determined?**
A: Highest final wealth after all years. Percentage gain is secondary tie-breaker

**Q: Can two players have same wealth?**
A: Yes. In that case, ranking order is by user_id

---

## 🔗 Important Links

- **Supabase Dashboard:** https://app.supabase.io
- **React Docs:** https://react.dev
- **Game GitHub:** [Your repo URL]

---

## 📅 Timeline

| Task | Time |
|------|------|
| Setup (install, env, DB) | 5 min |
| First game | 15 min |
| Test multi-player | 10 min |
| Full validation | 30 min |
| Ready for demo | ~60 min |

---

## 🎮 Have Fun!

The game is designed to be simple to understand but engaging to play. Share room codes with friends and compete! 🏆

Good luck! 🚀

