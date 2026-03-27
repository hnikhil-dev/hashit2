# Multi-Investment Options - Visual Guide & Examples

## Investment Options Visual Card

```
┌─────────────────────────────────┐
│ 📈 Stocks                       │
├─────────────────────────────────┤
│ Moderate risk, good returns     │
│ Return: -15% to +25%            │
│                                 │
│ ▓▓░░░░░░░░  20%                │
│ Amount: ₹36,000                │
└─────────────────────────────────┘
```

Each card has:
- **Emoji** - Visual identifier
- **Name** - Investment type
- **Description** - Risk level summary
- **Return Range** - Min to max possible return
- **Slider** - Adjust allocation %
- **Percentage** - Current allocation
- **Amount** - Rupees to invest

## User Interface Layout

### Desktop View (5 Option Cards in Grid)

```
💰 Investment Allocation
Allocate your ₹180,000 across different investment options:

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 📈 Stocks    │  │ 🏆 Gold      │  │ ⭐ Silver    │  │ 🌾 Commodit │  │ 🚀 Crypto    │
│ Moderate     │  │ Low          │  │ Medium       │  │ High         │  │ Very High    │
│ -15% to +25% │  │ -5% to +10%  │  │ -8% to +15%  │  │ -20% to +30% │  │ -40% to +50% │
│              │  │              │  │              │  │              │  │              │
│ ▓▓░░░░░░░░ 20%│  │ ▓▓░░░░░░░░ 20%│  │ ▓▓░░░░░░░░ 20%│  │ ▓▓░░░░░░░░ 20%│  │ ▓▓░░░░░░░░ 20%│
│ ₹36,000      │  │ ₹36,000      │  │ ₹36,000      │  │ ₹36,000      │  │ ₹36,000      │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘

Total Allocation: 100%
```

### Mobile View (Cards Stack)

```
💰 Investment Allocation

┌──────────────────────────┐
│ 📈 Stocks                │
│ Moderate risk...         │
│ ▓▓░░░░ 20%  ₹36,000     │
└──────────────────────────┘

┌──────────────────────────┐
│ 🏆 Gold                  │
│ Low risk...              │
│ ▓▓░░░░ 20%  ₹36,000     │
└──────────────────────────┘

... (cards stack vertically)

Total Allocation: 100%
```

## Example Scenario

### Initial State
Player starts year with:
- Salary: ₹300,000
- Expenses: ₹120,000 (40%)
- Available to Invest: ₹180,000

Default allocation (20% each):
- Stocks: ₹36,000
- Gold: ₹36,000
- Silver: ₹36,000
- Commodities: ₹36,000
- Crypto: ₹36,000

### Example 1: Balanced Investor

**Allocation:**
```
Stocks: 25% → ₹45,000
Gold: 25% → ₹45,000
Silver: 25% → ₹45,000
Commodities: 15% → ₹27,000
Crypto: 10% → ₹18,000
```

**Event Modifier:** +5% (Market Boom)

**Year Results:**
```
┌─────────────────────────────────┐
│ 📈 Stocks (25%): ₹45,000        │
│ Return: +8% → +₹3,600  ✓        │
├─────────────────────────────────┤
│ 🏆 Gold (25%): ₹45,000          │
│ Return: +3% → +₹1,350  ✓        │
├─────────────────────────────────┤
│ ⭐ Silver (25%): ₹45,000        │
│ Return: -2% → -₹900  ✗          │
├─────────────────────────────────┤
│ 🌾 Commodities (15%): ₹27,000   │
│ Return: +12% → +₹3,240  ✓       │
├─────────────────────────────────┤
│ 🚀 Crypto (10%): ₹18,000        │
│ Return: -15% → -₹2,700  ✗       │
├─────────────────────────────────┤
│ Total Investment Return: +₹4,590 │
└─────────────────────────────────┘
```

**Final Wealth Update:**
```
Previous Wealth:       ₹500,000
+ Available Capital:   ₹180,000
+ Investment Return:   +₹4,590
- Liability:           ₹0
- Insurance:           ₹0
─────────────────────
New Wealth:           ₹684,590
```

### Example 2: Aggressive Investor

**Allocation:**
```
Stocks: 40% → ₹72,000
Commodities: 35% → ₹63,000
Crypto: 25% → ₹45,000
Gold: 0% → ₹0
Silver: 0% → ₹0
```

**Event Modifier:** -2% (Market Downturn)

**Year Results:**
```
┌─────────────────────────────────┐
│ 📈 Stocks (40%): ₹72,000        │
│ Return: +15% → +₹10,800  ✓      │
├─────────────────────────────────┤
│ 🌾 Commodities (35%): ₹63,000   │
│ Return: -8% → -₹5,040  ✗        │
├─────────────────────────────────┤
│ 🚀 Crypto (25%): ₹45,000        │
│ Return: +25% → +₹11,250  ✓      │
├─────────────────────────────────┤
│ Total Investment Return: +₹17,010 │
└─────────────────────────────────┘
```

**Final Wealth:**
```
Previous: ₹500,000 + ₹180,000 + ₹17,010 = ₹697,010
```
Much higher gain due to aggressive allocation and lucky crypto boom!

### Example 3: Conservative Investor

**Allocation:**
```
Gold: 60% → ₹108,000
Silver: 40% → ₹72,000
Stocks: 0% → ₹0
Commodities: 0% → ₹0
Crypto: 0% → ₹0
```

**Event Modifier:** +10% (Strong Market Boom)

**Year Results:**
```
┌─────────────────────────────────┐
│ 🏆 Gold (60%): ₹108,000         │
│ Return: +8% → +₹8,640  ✓        │
├─────────────────────────────────┤
│ ⭐ Silver (40%): ₹72,000        │
│ Return: +10% → +₹7,200  ✓       │
├─────────────────────────────────┤
│ Total Investment Return: +₹15,840 │
└─────────────────────────────────┘
```

**Final Wealth:**
```
Previous: ₹500,000 + ₹180,000 + ₹15,840 = ₹695,840
```
Stable, predictable returns. Safe but lower gains than aggressive strategy.

## Smart Scaling Example

### User Action Sequence

1. **Start:** All 20% each
   ```
   Stocks: 20%, Gold: 20%, Silver: 20%, Commodities: 20%, Crypto: 20%
   ```

2. **Move Stocks slider to 40%:**
   ```
   Stocks: 40% (+20)
   Gold: 15% (-5, auto-scaled)
   Silver: 15% (-5, auto-scaled)
   Commodities: 15% (-5, auto-scaled)
   Crypto: 15% (-5, auto-scaled)
   Total: 100% ✓
   ```

3. **Move Gold slider to 0%:**
   ```
   Stocks: 40%
   Gold: 0% (-15)
   Silver: 19% (+4, auto-scaled)
   Commodities: 20% (+5, auto-scaled)
   Crypto: 21% (+6, auto-scaled)
   Total: 100% ✓
   ```

4. **Move Crypto slider to 50%:**
   ```
   Stocks: 20% (-20, auto-scaled)
   Gold: 0%
   Silver: 10% (-9, auto-scaled)
   Commodities: 20%
   Crypto: 50% (+29)
   Total: 100% ✓
   ```

The game automatically maintains 100% total without requiring manual math!

## Risk vs. Return Comparison

```
VOLATILITY & RETURN PROFILES
(Higher = More Extreme)

Return Range
+50% │           🚀 Crypto
+30% │      🌾 Commodities
+25% │    📈 Stocks
+15% │              ⭐ Silver
+10% │          🏆 Gold
  0% ├─────────────────────────────
 -10% │          🏆 Gold
 -15% │    📈 Stocks
 -20% │      🌾 Commodities
 -40% │           🚀 Crypto

Volatility (Risk): Gold < Silver < Stocks < Commodities < Crypto
Upside Potential:  Gold < Silver < Stocks < Commodities < Crypto
Downside Risk:     Gold < Silver < Stocks < Commodities < Crypto
```

## Color Coding in Results

```
Positive Returns (Gains)
┌──────────────────────────────┐
│ ✓ +₹1,234 (green text)       │
└──────────────────────────────┘

Negative Returns (Losses)
┌──────────────────────────────┐
│ ✗ -₹5,678 (red text)         │
└──────────────────────────────┘

Highlighted Rows
┌──────────────────────────────┐
│ Green: Positive gains         │
│ Red: Negative losses          │
│ Blue: Final wealth total      │
└──────────────────────────────┘
```

## Allocation Strategies Summary

```
CONSERVATIVE          BALANCED              AGGRESSIVE
(Low Risk)           (Moderate Risk)       (High Risk)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 Gold: 80%        📈 Stocks: 20%       📈 Stocks: 40%
⭐ Silver: 20%      🏆 Gold: 20%         🌾 Commodit: 30%
                    ⭐ Silver: 20%       🚀 Crypto: 30%
                    🌾 Commodit: 20%
                    🚀 Crypto: 20%

Expected Return:    Expected Return:     Expected Return:
Low but Stable      Moderate/Mixed       High but Volatile

Yearly Variation:   Yearly Variation:    Yearly Variation:
±5% range          ±15% range           ±30% range
```

## Testing Scenarios

### Test 1: Default Allocation
- Click "End Year" without changing sliders
- Verify all 5 options show 20% each
- Check total return is sum of all 5

### Test 2: Extreme Allocation
- Move Crypto to 100%
- Verify others go to 0%
- Play year, observe wild swings

### Test 3: Mixed Strategy
- Set: Stocks 30%, Gold 30%, Crypto 40%
- Play multiple years
- See how allocation performs over time

### Test 4: Market Events
- Year with +10% market modifier: All returns increase
- Year with -10% market modifier: All returns decrease
- Verify modifier applies to all 5 options

### Test 5: Responsiveness
- Adjust sliders rapidly
- Verify auto-scaling works smoothly
- Check amounts update in real-time
- Test on mobile - grid should be responsive
