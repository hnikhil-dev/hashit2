# Emergency Insurance System - Quick Start Guide

## The 3 Emergencies

```
YEAR 2: 🏥 Medical Emergency
├─ Damage: ₹50,000
├─ With Insurance: Pay ₹15,000 (30%)
└─ Premium: ₹15,000 (5% of salary)

YEAR 5: 🚗 Car Accident  
├─ Damage: ₹75,000
├─ With Insurance: Pay ₹22,500 (30%)
└─ Premium: ₹15,000 (5% of salary)

YEAR 6: ⚠️ House Emergency
├─ Damage: ₹100,000
├─ With Insurance: Pay ₹30,000 (30%)
├─ Premium: ₹15,000 (5% of salary)
└─ Market Impact: -8% (extra stress)
```

## Key Mechanic: Insurance Carries Forward

Once you buy insurance for an emergency type, **you're protected for life** against that type!

```
Year 2: Buy Medical Insurance (-₹15k)
  → 🏥 Medical Coverage ACTIVE

Years 3-4: Nothing happens to medical insurance
  → 🏥 Medical Coverage still ACTIVE

Year 5: Buy Car Insurance (-₹15k)  
  → 🏥 🚗 Both coverages ACTIVE

Year 6: Buy House Insurance (-₹15k)
  → 🏥 🚗 ⚠️ All three coverages ACTIVE
```

## Cost-Benefit Analysis

### Buy All Insurance (Safest)
```
Premium Costs:     3 × ₹15,000 = ₹45,000
Protected Damages: ₹225,000
Net Savings:       ₹180,000
```

### No Insurance (Riskiest)
```
Premium Costs:     ₹0
Actual Damages:    ₹225,000
Net Loss:          ₹225,000
```

### Selective Insurance (Balanced)
```
Premium Costs:     2 × ₹15,000 = ₹30,000
Protected Damages: ₹125,000 (medical + house)
Unprotected:       ₹75,000 (car)
Net Position:      +₹20,000 saved
```

## UI at a Glance

### During Emergency Year:

```
🛡️ Insurance Protection

Your Active Insurance Policies:
┌─────────────────────┐
│ 🏥 Medical Coverage │
└─────────────────────┘

⚠️ Emergency Event This Year!
🚗 Car Accident
Potential Damage: ₹75,000
✗ No active insurance for car accident - buy to protect!

☐ Buy Accident Insurance (5% salary = ₹15,000)
  ✗ No insurance - You'll bear full cost if emergency occurs
```

### After Year Completes:

```
✓ Insurance applied! Covered 70% of car accident emergency.
(Payment: ₹22,500 instead of ₹75,000)

Active Insurances:
🏥 Medical Coverage, 🚗 Accident Coverage
```

## Strategy Guide

### 👶 Beginner (Safe)
Buy all insurance as you encounter them:
- Year 2: Buy medical
- Year 5: Buy car accident
- Year 6: Buy house
- Result: Full protection, ₹45k total cost

### 🎯 Intermediate (Strategic)
Buy only the highest-damage ones:
- Year 2: Buy medical (₹50k at risk)
- Year 5: Skip car accident
- Year 6: Buy house (₹100k at risk)
- Result: ₹70k total cost, ₹75k unprotected damage

### 🚀 Advanced (Risky)
Gamble and buy selectively:
- Year 2: Skip (cheap emergency)
- Year 5: Buy car (expensive emergency)
- Year 6: Skip (hope nothing worse happens)
- Result: ₹15k cost, ₹150k possible damage

### 🎲 Extreme (Very Risky)
Never buy insurance:
- All emergencies: Skip
- Result: No cost, but ₹225k damages possible
- Useful if wealth is very high

## Testing Checklist

- [ ] Create 6-year room
- [ ] Year 2 arrives - see emergency alert
- [ ] View insurance price and coverage %
- [ ] Buy insurance - see "Insurance active" message
- [ ] Year result shows "Insurance applied! Covered 70%"
- [ ] See active insurances badge (🏥)
- [ ] Continue to Year 5 - insurance still shows as active
- [ ] New emergency (car) appears
- [ ] Previous insurance doesn't help this time
- [ ] Buy new insurance
- [ ] Year 6 - both insurances are active
- [ ] See both badges (🏥 🚗)
- [ ] Check final wealth calculation is correct

## Common Mistakes to Avoid

❌ **Mistake:** Forgetting insurance resets each year
✅ **Truth:** Once bought, insurance persists forever

❌ **Mistake:** One insurance covers all emergencies
✅ **Truth:** Medical insurance only covers medical emergencies

❌ **Mistake:** Insurance is too expensive
✅ **Truth:** Saves much more than it costs (saves ₹35-70k per emergency)

❌ **Mistake:** Can skip insurance on expensive events
✅ **Truth:** Even risky, as damage can be devastating to wealth

## Example Game Flow

```
START: ₹50,000 wealth

YEAR 1: Salary ₹300k, no emergency
Result: +₹180k from salary/investments → ₹230k wealth

YEAR 2: MEDICAL EMERGENCY
├─ Option 1: Buy insurance (-₹15k)
│  Damage: ₹15k → ₹215k wealth
│  Insurance: ACTIVE 🏥
│
└─ Option 2: Skip insurance
   Damage: ₹50k → ₹180k wealth
   Insurance: NONE

YEAR 3: Salary increases, no emergency
Result: +₹180k from income → ₹395k or ₹360k

YEAR 4: Normal year
Result: +₹180k from income → ₹575k or ₹540k

YEAR 5: CAR ACCIDENT
├─ Medical insurance active 🏥 (but doesn't help)
├─ Option: Buy accident insurance (-₹15k)
│  Damage: ₹22.5k → ₹537.5k
│  Insurance: ACTIVE 🏥 🚗
│
└─ Or: No insurance
   Damage: ₹75k → ₹500k
   Insurance: Only 🏥

YEAR 6: HOUSE EMERGENCY (-8% market modifier)
├─ Option: Buy house insurance (-₹15k)
│  Damage: ₹30k → ₹492.5k
│  Insurance: ACTIVE 🏥 🚗 ⚠️
│
└─ Or: No insurance  
   Damage: ₹100k → ₹400k
   Insurance: Only 🏥 🚗

GAME OVER
Protected path: ₹492.5k wealth ✓
Unprotected path: ₹400k wealth
Difference: ₹92.5k saved by insurance!
```

## Why This Is Realistic

✅ Real insurance protects against specific risks
✅ Once paid, insurance stays active
✅ Can choose which risks to cover
✅ Premium is small vs. actual damage
✅ Different scenarios require different coverage
✅ Long-term protection is cost-effective

## Next Steps

1. Run: `npm run dev`
2. Create a 6-year room
3. Play Year 1 normally
4. When Year 2 arrives, see the medical emergency alert
5. Decide: Buy insurance or take the risk?
6. Continue through all 6 years, making strategic insurance decisions
7. Compare final wealth based on your choices!

**Good luck! May your insurance protect you well!** 🛡️
