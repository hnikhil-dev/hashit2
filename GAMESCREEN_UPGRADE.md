# GameScreen Upgrade Guide - Realistic Game Logic

## Overview

The GameScreen component has been upgraded with realistic but simple game logic that makes the finance simulation feel alive while remaining hackathon-ready (no complex architecture).

**New Features:**
- ✅ Scripted life events for each year
- ✅ Dynamic salary progression
- ✅ Insurance protection mechanic
- ✅ Market condition modifiers
- ✅ Indian Rupees (₹) currency formatting
- ✅ Year-by-year result summaries

---

## 📋 What Changed

### 1. Currency Formatting (Indian Rupees)

**Helper Function Added:**
```javascript
function formatCurrency(value) {
  return value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
}
```

**All currency displays now use:**
- `formatCurrency(50000)` → "₹50,000"
- `formatCurrency(300000)` → "₹3,00,000"
- `formatCurrency(1500000)` → "₹15,00,000"

**Locations Updated:**
- Player wealth display
- Salary information
- Investment amounts
- Liability amounts
- Insurance costs
- Year result summary

### 2. Scripted Events System

**6 Years of Events (Repeats if > 6 years):**

```javascript
const scriptedEvents = {
  1: { title: "First Job", salaryChangePercent: 0, liabilityAmount: 0, marketModifier: 0 },
  2: { title: "Medical Emergency", liabilityAmount: 20000, insuranceUnlocked: true },
  3: { title: "Promotion", salaryChangePercent: 20, liabilityAmount: 0 },
  4: { title: "Market Boom", marketModifier: 5 },
  5: { title: "Family Responsibility", liabilityAmount: 40000, insuranceUnlocked: true },
  6: { title: "Startup Opportunity", marketModifier: 8 },
}
```

**Event Properties:**
- `title` - Display name
- `description` - What happened
- `salaryChangePercent` - Salary adjustment
- `liabilityAmount` - Unexpected cost
- `marketModifier` - Investment return adjustment (+/- %)
- `insuranceUnlocked` - Can buy insurance this year

**Visual Display:**
- Event card shows above investment slider
- Liability amounts highlighted in red
- Salary changes highlighted in green
- Market modifiers highlighted in blue

### 3. Dynamic Salary Tracking

**New State Variable:**
```javascript
const [salary, setSalary] = useState(300000);
```

**Database Update:**
```javascript
// room_players table now includes salary column
const { data: player } = await supabase
  .from('room_players')
  .select('salary') // NEW
  .single();
```

**How It Works:**
- Year 1: ₹3,00,000 (starts)
- Year 3: ₹3,60,000 (+20% promotion)
- Year 4+: Same as year 3
- Persists across sessions

### 4. Insurance Mechanic

**Rules:**
- 5% salary premium cost
- Unlocks on liability events only
- Covers 70% of liability damage
- Optional checkbox to purchase

**Insurance Example:**
```
Without Insurance:
- Liability: ₹20,000
- Loss: ₹20,000 (full)

With Insurance:
- Insurance Cost: ₹15,000 (5% of ₹3,00,000 salary)
- Liability Reduced: ₹6,000 (30% of ₹20,000)
- Net Loss: ₹21,000 (insurance + liability)
```

**UI:**
- Checkbox appears only when event has liability
- Shows cost preview in label
- Live feedback: "✓ Insurance active" or "✗ No insurance"

### 5. Investment Return Logic

**Calculation Process:**

```
STEP 1: Get base return
baseReturn = random from -10% to +15%

STEP 2: Apply market modifier from event
finalReturn = baseReturn + event.marketModifier
// Example: -5% + 5% (market boom) = 0%

STEP 3: Calculate investment amount
investmentAmount = (salary × 0.6) × (slider / 100)
// If salary ₹3,00,000, slider 50%: ₹90,000

STEP 4: Calculate return
investmentReturn = investmentAmount × (finalReturn / 100)
// If invested ₹90,000, return 5%: ₹4,500
```

**Year Example (Year 4 - Market Boom):**
```
Salary: ₹3,00,000
Expenses: ₹1,20,000
Available: ₹1,80,000

Investment: 50% × ₹1,80,000 = ₹90,000
Base Return: -2% (random)
Market Modifier: +5%
Final Return: 3%
Return Amount: ₹2,700
```

### 6. Year Calculation Flow

**10-Step Process:**

```
STEP 1: Get current event
STEP 2: Update salary (if event has salary change)
STEP 3: Calculate expenses (40% of salary)
STEP 4: Available money = salary - expenses
STEP 5: Calculate investment return (with market modifier)
STEP 6: Calculate insurance cost & reduced liability
STEP 7: Update wealth with all factors
STEP 8: Insert game progress record
STEP 9: Update room_players (wealth + salary)
STEP 10: Increment year in rooms table
```

**Wealth Formula:**
```
newWealth = currentWealth
           + availableToInvest
           + investmentReturn
           - liability
           - insuranceCost
```

### 7. Year Result Summary

**Displays After Each Year:**
- Base salary
- Salary increase (if applicable)
- Expenses
- Investment amount & percentage
- Return (with % shown)
- Liability loss (if applicable)
- Insurance premium (if purchased)
- New total wealth

**Color Coding:**
- Green = gains (salary increase, positive return)
- Red = losses (liability, insurance cost)
- Blue = final wealth

---

## 🗄️ Database Changes

### New Column Required

```sql
ALTER TABLE room_players
ADD COLUMN salary INTEGER DEFAULT 300000;
```

**Why:** Track salary progression across years

### Updated Queries

**Read player data:**
```javascript
const { data: player } = await supabase
  .from('room_players')
  .select('salary') // NEW
  .eq('room_id', roomId)
  .single();
```

**Update player data:**
```javascript
await supabase
  .from('room_players')
  .update({
    current_wealth: Math.round(newWealth),
    salary: Math.round(newSalary), // NEW
  })
  .eq('room_id', roomId)
  .eq('user_id', userId);
```

---

## 🎮 Game Flow Example

**Player: Arjun | Room: 5-Year Game**

**Year 1: First Job**
- Event: No changes
- Salary: ₹3,00,000
- Available: ₹1,80,000
- Investment: 50% = ₹90,000
- Return: -3% = -₹2,700
- Wealth: ₹50,000 + ₹1,80,000 - ₹2,700 = **₹2,27,300**

**Year 2: Medical Emergency**
- Event: Liability ₹20,000 (no insurance)
- Salary: ₹3,00,000
- Available: ₹1,80,000
- Investment: 30% = ₹54,000
- Return: 8% = ₹4,320
- Liability: ₹20,000
- Wealth: ₹2,27,300 + ₹1,80,000 + ₹4,320 - ₹20,000 = **₹3,91,620**

**Year 3: Promotion**
- Event: +20% salary increase
- Salary: ₹3,60,000 (was ₹3,00,000)
- Available: ₹2,16,000
- Investment: 60% = ₹1,29,600
- Return: 12% = ₹15,552
- Wealth: ₹3,91,620 + ₹2,16,000 + ₹15,552 = **₹6,23,172**

**Year 4: Market Boom**
- Event: +5% market modifier
- Salary: ₹3,60,000
- Available: ₹2,16,000
- Investment: 70% = ₹1,51,200
- Base Return: 2%, Market: +5% = 7%
- Return: ₹10,584
- Wealth: ₹6,23,172 + ₹2,16,000 + ₹10,584 = **₹8,49,756**

**Year 5: Family Responsibility**
- Event: Liability ₹40,000 (with insurance ₹18,000)
- Salary: ₹3,60,000
- Available: ₹2,16,000
- Investment: 50% = ₹1,08,000
- Return: 6% = ₹6,480
- Liability (with insurance): ₹12,000 (70% covered)
- Insurance Cost: ₹18,000
- Wealth: ₹8,49,756 + ₹2,16,000 + ₹6,480 - ₹12,000 - ₹18,000 = **₹10,42,236**

**Final Ranking:**
| Rank | Player | Wealth |
|------|--------|--------|
| 1 | Arjun | ₹10,42,236 |
| 2 | Priya | ₹9,87,500 |

---

## 🎯 Key Design Decisions

### Why This Works for Hackathons

1. **Simple Logic** - No AI, neural networks, or complex formulas
2. **Deterministic** - Same strategy produces same results (except random return)
3. **Balanced** - Salary increases offset market volatility
4. **Engaging** - Life events make each year feel different
5. **Complete** - Insurance decisions matter but aren't mandatory
6. **Fast** - Can finish 5-6 year game in 5-10 minutes

### Insurance Paradox

Insurance is *expensive* but *valuable*:
- Year 2: ₹20,000 liability vs ₹15,000 insurance premium
  - With: -₹21,000 loss
  - Without: -₹20,000 loss
  - *Insurance costs more* but teaches risk management

- Year 5: ₹40,000 liability vs ₹18,000 insurance premium
  - With: -₹30,000 loss (insurance + reduced liability)
  - Without: -₹40,000 loss
  - *Insurance saves money* when liability is large

Players learn to **evaluate tradeoffs**.

### Market Modifiers

- **Year 1** (First Job): 0% - Baseline
- **Year 2** (Medical): 0% - Bad luck, not bad market
- **Year 3** (Promotion): 0% - Salary increase, market neutral
- **Year 4** (Boom): +5% - Good market conditions
- **Year 5** (Family): 0% - Personal problem, market neutral
- **Year 6** (Startup): +8% - High risk, high opportunity

Pattern: Good events are followed by neutral/bad, keeping game balanced.

---

## 🧪 Testing the Upgrade

### Quick Test (5 minutes)

1. Create a room for 1 year
2. Join as test player
3. Check event card displays correctly
4. Adjust investment slider to 100%
5. Click "End Year"
6. Verify:
   - Event summary shows all calculations
   - Wealth updated correctly
   - Leaderboard shows new wealth
   - Game says "Game Over!"

### Full Test (20 minutes)

1. Create room for 6 years
2. Play through all events:
   - Year 1: No changes (baseline)
   - Year 2: Medical emergency - don't buy insurance
   - Year 3: Promotion (+20% salary)
   - Year 4: Market boom (+5% return)
   - Year 5: Family expense - buy insurance
   - Year 6: Startup opportunity (+8% return)
3. Verify:
   - Salary increases in year 3
   - Insurance checkbox appears years 2 & 5 only
   - Market modifiers affect return %
   - Final wealth reflects all decisions
   - Leaderboard ranks correctly

### Database Verification

```sql
-- Check salary column exists
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'room_players';

-- Check salary progression
SELECT room_id, user_id, salary, current_wealth 
FROM room_players 
WHERE room_id = 1;
```

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| Code Lines Added | 250+ |
| CSS Classes Added | 15+ |
| Events Total | 6 |
| Database Changes | 1 column added |
| Breaking Changes | 0 |
| Backward Compatible | ✅ Yes |

---

## ⚠️ Known Limitations

1. **No Real-Time Sync** - Refresh page to see other players' updates
2. **Events Fixed** - Same event every year (no randomization)
3. **No Insurance History** - Can't see past insurance purchases
4. **Linear Progression** - Only salary changes, no other bonuses
5. **Single Market Modifier** - Can't combine multiple events

These are intentional for hackathon simplicity. Production version could add:
- Real-time WebSocket updates
- Random event selection
- Insurance claim history
- Compound investment strategies
- Dynamic market conditions

---

## 🚀 Deployment Checklist

- [ ] Run database migration: `ALTER TABLE room_players ADD COLUMN salary...`
- [ ] Update GameScreen.js (done ✅)
- [ ] Update App.css with new styles (done ✅)
- [ ] Test with 1-year game (5 min)
- [ ] Test with 6-year game (15 min)
- [ ] Test insurance mechanic in years 2 & 5
- [ ] Verify ₹ formatting displays correctly
- [ ] Check leaderboard updates after each year
- [ ] Confirm game-over message appears

---

## 📚 Files Modified

| File | Changes | Lines |
|------|---------|-------|
| GameScreen.js | Complete rewrite with events, insurance, salary tracking | 494 |
| App.css | Event card, insurance control, year result styles | +150 |
| DATABASE_MIGRATION.md | New file with SQL migration guide | 100+ |

---

## 💡 Pro Tips

1. **For Conservative Players:** 0% investment = steady wealth
2. **For Aggressive Players:** 100% investment = high volatility
3. **Insurance Math:** Break-even on large liabilities
4. **Salary Strategy:** Reinvest promotion bonuses early
5. **Market Timing:** Can't predict, so diversify investments

---

## Support

**Error: "Failed to submit year"**
- Check database salary column exists
- Verify Supabase connection
- Check browser console for details

**Insurance checkbox not showing:**
- Year 2 & 5 only (liability events)
- Check event config

**₹ symbol not displaying:**
- Check browser supports Intl.NumberFormat
- Fallback: Uses locale-specific format

---

**Ready to play! 🎮**

Start with [QUICK_START.md](QUICK_START.md) to begin.
