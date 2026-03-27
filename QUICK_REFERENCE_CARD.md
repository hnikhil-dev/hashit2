# ⚡ Quick Reference Card

## 💳 LOAN SYSTEM AT A GLANCE

### When Loan Triggers
```
Emergency cost > Your wealth
           ↓
   LOAN OFFERED
           ↓
8% interest, 5-year term
```

### Loan Math
```
Principal: ₹100,000
Duration: 5 years
Interest: 8% (simple)
Total Cost: ₹100,000 + (₹100,000 × 0.08 × 5) = ₹140,000
Monthly Payment: ₹140,000 ÷ 60 = ₹2,333
Annual Deduction: ₹2,333 × 12 = ₹28,000/year
```

### Loan Display
```
Location: Game Panel - "💳 Active Loans" section
Shows: Principal, interest rate, years remaining, annual payment
Updates: Every year as repayment happens
```

### Key Numbers
| Item | Value |
|------|-------|
| Interest Rate | 8% annual |
| Duration | 5 years |
| Buffer | +₹50,000 |
| Repayment | Automatic |
| Multiple Loans | Allowed |

---

## 📊 ANALYTICS DASHBOARD AT A GLANCE

### How to Open
```
Button: "📊 View Analytics"
Location: Game controls (bottom of game panel)
Opens: Full-screen modal with 7 sections
Close: Click × or "Close Analytics" button
```

### 7 Sections
```
1. 🎮 Game Progress     → Year tracking + bar
2. 💰 Wealth Stats      → Money metrics + chart
3. 📈 Investments       → 5 options + percentages
4. 🛡️ Insurance         → Active policies
5. 💳 Debt             → Outstanding, ratio, history
6. 💼 Salary           → Income + expenses
7. 📋 Summary          → Overall status
```

### Key Metrics
```
Wealth Gain:       Total $ gained (and %)
Debt Ratio:        Debt ÷ Wealth × 100
Progress:          Current Year ÷ Total Years
Active Insurance:  0-3 policies
Outstanding Debt:  Total loan amounts
```

---

## 🎮 GAME FLOW

### Step by Step
```
1. Create Game → Choose name + years (6)
2. Year 1 → Invest 100% (must total 100%)
3. Year 2 → Medical emergency
   └─ Insurance? [Yes: ₹15k] [No: ₹50k damage]
4. Years 3-4 → Continue investing
5. Year 5 → Car accident (repeat 3)
6. Year 6 → House emergency (repeat 3)
7. View Analytics → See all stats
8. Game Complete → Final wealth shown
```

### Emergency Options
```
Medical (Year 2):     ₹50,000  (🏥)
Car Accident (Year 5): ₹75,000  (🚗)
House (Year 6):       ₹100,000 (⚠️)
```

---

## 💰 WEALTH CALCULATIONS

### Per Year
```
Salary:                    ₹300,000 (or more with events)
Expenses (40%):            -₹120,000
Available to Invest (60%): ₹180,000

Investment Returns:        -40% to +50% (depends on choice)
Insurance Cost:            -₹15,000 (if bought)
Emergency Damage:          -₹30,000 to -₹100,000
Loan Repayment:            -₹14,000 to -₹28,000/year

Net Wealth = Previous + Investments + Returns - Expenses - Insurance - Damage - Loans
```

### Example: Year 2 with Loan
```
Start:        ₹50,000
+ Salary:     ₹300,000
+ Invest:     ₹180,000 (at +10%):  +₹18,000
- Expenses:   -₹120,000
- Emergency:  -₹50,000 (full, no insurance)
- Loan:       +₹70,000 (auto-offered)

End:          ₹348,000
```

---

## 🎯 INVESTMENT OPTIONS

| Option | Return Range | Risk | Best For |
|--------|-------------|------|----------|
| Stocks | -15% to +25% | Medium | Balanced |
| Gold | -5% to +10% | Low | Safe |
| Silver | -8% to +15% | Low-Medium | Conservative |
| Crypto | -40% to +50% | Very High | Risk-Takers |
| Commodities | -20% to +30% | High | Adventurous |

---

## 🛡️ INSURANCE DETAILS

```
Cost:                ₹15,000 (5% of salary)
Coverage:            70% of damage
Duration:            Forever (once bought)
Emergency Types:     Medical, Accident, House

Example: Medical Insurance
Cost:         ₹15,000
Damage:       ₹50,000
Insurance:    70% of ₹50,000 = ₹35,000
You Pay:      ₹15,000 + ₹15,000 = ₹30,000
You Save:     ₹20,000 vs. no insurance
```

---

## 🚀 STRATEGY TIPS

### Safe (Boring but Effective)
```
- 100% Gold (lowest risk)
- Buy all insurance
- Guaranteed to build wealth
- Final: ₹800,000+
```

### Balanced (Recommended)
```
- 20% each investment
- Buy insurance when needed
- Good risk/reward
- Final: ₹700,000-₹900,000
```

### Aggressive (Risky but Rewarding)
```
- 40%+ Crypto/Commodities
- No insurance initially
- High variance (good or bad)
- Final: ₹400,000-₹1,200,000
```

---

## 📱 RESPONSIVE DESIGN

```
Desktop (1920px):  3 columns, full features
Tablet (768px):    2 columns, adapts
Mobile (480px):    1 column, scrollable
```

---

## ✅ CHECKLIST

### Before Playing
- [x] Dev server running (`npm run dev`)
- [x] Browser open (http://localhost:3000)
- [x] No console errors
- [x] Game loads correctly

### During Game
- [x] Can allocate investments
- [x] Year submission works
- [x] Emergencies appear
- [x] Analytics button visible
- [x] Loans show if needed
- [x] Wealth updates

### After Game
- [x] Final wealth displayed
- [x] Leaderboard updated
- [x] Analytics show complete stats
- [x] No errors occurred

---

## 📊 KEY STATISTICS

| Statistic | Where to Find |
|-----------|--------------|
| Current Wealth | Game panel + Analytics |
| Wealth Gain | Analytics section |
| Investment Allocation | Analytics + Game panel |
| Insurance Status | Game panel + Analytics |
| Outstanding Debt | Loan section + Analytics |
| Debt Ratio | Analytics section |
| Progress % | Analytics section |
| Final Status | Analytics + Game Complete |

---

## 🎲 PROBABILITY RANGES

```
Investment Returns (per year):
├─ Gold: -5% to +10%     (90% chance of small gain)
├─ Silver: -8% to +15%   (70% chance of gain)
├─ Stocks: -15% to +25%  (50/50 chance)
├─ Commodities: -20% to +30% (30% chance of big loss)
└─ Crypto: -40% to +50%  (Very unpredictable!)
```

---

## 💡 PRO TIPS

1. **Buy Insurance Early** - ₹15k now vs. ₹50-100k later
2. **Diversify** - Don't put 100% in one investment
3. **Check Analytics** - See what's working
4. **Monitor Debt Ratio** - Keep under 50%
5. **Safe Wins** - Gold strategy = guaranteed wealth
6. **Risk Awareness** - 40% loss in Crypto is possible
7. **Plan Ahead** - Know your emergency costs

---

## 🔗 QUICK LINKS

| Need | File |
|------|------|
| How to Play | DEBT_LOAN_ANALYTICS_QUICK_START.md |
| Code Details | DEBT_LOAN_ANALYTICS_SYSTEM.md |
| Full Overview | IMPLEMENTATION_COMPLETE.md |
| Visual Guide | FEATURES_VISUAL_SUMMARY.md |
| Documentation | README_UPDATES.md |

---

## ⚡ EMERGENCY REFERENCE

### Loan Triggered?
```
1. Check Analytics → Debt section
2. View monthly payment
3. Plan for annual repayment
4. Continue playing
5. Debt decreases each year
```

### Analytics Won't Open?
```
1. Reload page
2. Check browser console
3. Try different browser
4. Restart dev server
```

### Wrong Numbers?
```
Remember:
- All currency = Indian Rupees (₹)
- Percentages = 0-100% allocation
- Salary = Annual
- Expenses = 40% of salary (mandatory)
- Investments = 60% of salary
```

---

## 🎊 YOU'RE ALL SET!

Everything is ready:
- ✅ Code implemented
- ✅ Features working
- ✅ Documentation complete
- ✅ Dev server running

**Open http://localhost:3000 and play!** 🚀

---

**Print this card for quick reference!** 📋
