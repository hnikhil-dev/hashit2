# Emergency Insurance System - Visual Guide

## The 3 Emergency Events

```
┌─────────────────────────────────────────────────────────────┐
│ YEAR 2: 🏥 MEDICAL EMERGENCY                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Unexpected hospital expense. Insurance covers 70% if        │
│ purchased.                                                  │
│                                                             │
│ WITHOUT Insurance:                                          │
│ ├─ Full Damage: ₹50,000                                     │
│ └─ Impact: Significant hit to wealth                        │
│                                                             │
│ WITH Insurance:                                             │
│ ├─ Premium: ₹15,000 (5% of salary)                          │
│ ├─ Damage Paid: ₹15,000 (30% liability)                     │
│ ├─ Covered: ₹35,000 (70%)                                   │
│ └─ Net Saving: ₹35,000                                      │
│                                                             │
│ ✅ Protects: All future medical emergencies                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ YEAR 5: 🚗 CAR ACCIDENT                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Vehicle damage needs repair. Insurance covers 70% if        │
│ purchased.                                                  │
│                                                             │
│ WITHOUT Insurance:                                          │
│ ├─ Full Damage: ₹75,000                                     │
│ └─ Impact: Heavy financial burden                           │
│                                                             │
│ WITH Insurance:                                             │
│ ├─ Premium: ₹15,000 (5% of salary)                          │
│ ├─ Damage Paid: ₹22,500 (30% liability)                     │
│ ├─ Covered: ₹52,500 (70%)                                   │
│ └─ Net Saving: ₹52,500                                      │
│                                                             │
│ ✅ Protects: All future car accidents                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ YEAR 6: ⚠️ HOUSE EMERGENCY                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Urgent home repairs needed. Insurance covers 70% if         │
│ purchased. Market modifier: -8%                             │
│                                                             │
│ WITHOUT Insurance:                                          │
│ ├─ Full Damage: ₹100,000                                    │
│ ├─ Market Impact: -8% extra stress                          │
│ └─ Impact: Most severe emergency                            │
│                                                             │
│ WITH Insurance:                                             │
│ ├─ Premium: ₹15,000 (5% of salary)                          │
│ ├─ Damage Paid: ₹30,000 (30% liability)                     │
│ ├─ Covered: ₹70,000 (70%)                                   │
│ └─ Net Saving: ₹70,000                                      │
│                                                             │
│ ✅ Protects: All future home emergencies                    │
└─────────────────────────────────────────────────────────────┘
```

## UI Elements - Emergency Alert Card

```
╔═════════════════════════════════════════════════════════╗
║ 🛡️ Insurance Protection                                ║
╠═════════════════════════════════════════════════════════╣
║                                                         ║
║ Your Active Insurance Policies:                         ║
║ ┌─────────────────────────────────────────────────────┐ ║
║ │ 🏥 Medical Coverage                                 │ ║
║ │ 🚗 Accident Coverage                                │ ║
║ └─────────────────────────────────────────────────────┘ ║
║                                                         ║
║ ⚠️ Emergency Event This Year!                           ║
║ ⚠️ House Emergency                                      ║
║ Potential Damage: ₹100,000                              ║
║                                                         ║
║ ✓ You have active house insurance - 70% covered!       ║
║ (or)                                                    ║
║ ✗ No active insurance - buy to protect!                ║
║                                                         ║
║ ☐ Buy House Insurance                                  ║
║   (5% salary = ₹15,000)                                ║
║   ✓ Insurance purchased - Covers 70% of house          ║
║     emergency's costs and carries over to future       ║
║     years!                                              ║
║                                                         ║
╚═════════════════════════════════════════════════════════╝
```

## Year Result Display

```
╔═════════════════════════════════════════════════════════╗
║ Year 2 Summary                                          ║
╠═════════════════════════════════════════════════════════╣
║                                                         ║
║ 🏥 Medical Emergency                                    ║
║                                                         ║
║ Base Salary: ₹300,000                                  ║
║ Expenses (40%): -₹120,000                              ║
║ Available to Invest: ₹180,000                           ║
║                                                         ║
║ Investment Returns: +₹12,000 ✓                         ║
║                                                         ║
║ ┌──────────────────────────────────────────────────┐   ║
║ │ ✓ Insurance applied! Covered 70% of medical      │   ║
║ │   emergency.                                     │   ║
║ └──────────────────────────────────────────────────┘   ║
║                                                         ║
║ Liability Loss: -₹15,000                               ║
║ Insurance Premium (5%): -₹15,000                       ║
║                                                         ║
║ Active Insurances:                                      ║
║ 🏥 Medical Coverage                                     ║
║                                                         ║
║ ─────────────────────────────────────────────────      ║
║ New Wealth: ₹572,000                                   ║
║ ═════════════════════════════════════════════════      ║
║                                                         ║
╚═════════════════════════════════════════════════════════╝
```

## Insurance Persistence Timeline

```
YEAR 1: Normal Year
├─ No insurance
└─ No active protection

YEAR 2: MEDICAL EMERGENCY ➜ BUY INSURANCE
├─ Buy medical insurance (-₹15,000)
├─ Medical damage (-₹15,000 instead of ₹50,000)
└─ 🏥 Medical Coverage ACTIVE ✓

YEAR 3: Normal Year
├─ Medical insurance carries over
├─ No additional cost
└─ 🏥 Medical Coverage still ACTIVE ✓

YEAR 4: Normal Year  
├─ Medical insurance still active
├─ No cost, no emergency
└─ 🏥 Medical Coverage still ACTIVE ✓

YEAR 5: CAR ACCIDENT ➜ BUY INSURANCE
├─ Medical insurance active but doesn't help
├─ Buy car accident insurance (-₹15,000)
├─ Car damage (-₹22,500 instead of ₹75,000)
└─ 🏥 🚗 Both Coverage ACTIVE ✓

YEAR 6: HOUSE EMERGENCY ➜ BUY INSURANCE
├─ Medical + Car insurance active
├─ Buy house insurance (-₹15,000)
├─ House damage (-₹30,000 instead of ₹100,000)
└─ 🏥 🚗 ⚠️ All Coverage ACTIVE ✓

RESULT:
├─ Total Premiums: ₹45,000
├─ Total Damages: ₹67,500
├─ Total Saved: ₹157,500
└─ Final Status: Fully Protected ✓✓✓
```

## Strategy Decision Tree

```
INSURANCE DECISION FLOW

YEAR 2: Medical Emergency (₹50,000)
├─ YES (₹15,000 premium)
│  └─ Pay ₹15,000 + become protected
│
└─ NO (save premium)
   └─ Pay ₹50,000 + stay vulnerable

        ↓ Continue to Year 5

YEAR 5: Car Accident (₹75,000)
├─ Medical still active if bought before
├─ YES (₹15,000 premium)
│  └─ Pay ₹22,500 + dual protection
│
└─ NO (save premium)
   └─ Pay ₹75,000 + stay vulnerable

        ↓ Continue to Year 6

YEAR 6: House Emergency (₹100,000)
├─ Medical + Car active if bought before
├─ YES (₹15,000 premium)
│  └─ Pay ₹30,000 + triple protection
│
└─ NO (save premium)
   └─ Pay ₹100,000 + stay vulnerable

FINAL OUTCOMES:
├─ All YES:    ₹45k spent, ₹157.5k saved  💰 ✓
├─ All NO:     ₹0 spent, ₹225k lost       💸 ✗
├─ Some YES:   ₹30k spent, varies saved   ⚖️ △
└─ Some NO:    ₹15k spent, varies lost    ⚖️ △
```

## Cost vs Protection Matrix

```
                    NO INSURANCE      WITH INSURANCE    SAVINGS
Medical Emergency   -₹50,000          -₹15,000          ₹35,000
Car Accident        -₹75,000          -₹22,500          ₹52,500
House Emergency     -₹100,000         -₹30,000          ₹70,000
                    ─────────────────────────────────────────
TOTAL (Unprotected) -₹225,000         -₹67,500          ₹157,500

Cost Breakdown (If All Insurance Purchased):
├─ Medical Premium:     ₹15,000
├─ Accident Premium:    ₹15,000  
├─ House Premium:       ₹15,000
├─ Total Premiums:      ₹45,000
│
├─ Medical Damages:     ₹15,000 (instead of ₹50,000)
├─ Accident Damages:    ₹22,500 (instead of ₹75,000)
├─ House Damages:       ₹30,000 (instead of ₹100,000)
├─ Total Damages:       ₹67,500
│
└─ NET RESULT: +₹157,500 SAVED ✓✓✓
```

## Active Insurance Badge Design

```
Currently Active:

┌──────────────────┐
│ 🏥 Medical Cover │
└──────────────────┘

┌──────────────────┐
│ 🚗 Accident Cover│
└──────────────────┘

┌──────────────────┐
│ ⚠️ Home Coverage │
└──────────────────┘
```

## Emergency Alert Card Colors

```
NORMAL YEAR
├─ Background: Light blue
├─ Border: Blue
└─ No alert

EMERGENCY YEAR - WITHOUT INSURANCE
├─ Background: Golden yellow (#FEF3C7)
├─ Border: Orange (#FBF124)
├─ Alert Text: Dark orange (#92400E)
└─ Warning: "⚠️ Buy insurance to protect!"

EMERGENCY YEAR - WITH INSURANCE
├─ Background: Golden yellow
├─ Border: Orange
├─ Alert Text: Dark green (#047857)
└─ Message: "✓ Insurance will protect you!"
```

## Year-by-Year Wealth Comparison

```
PATH 1: Full Insurance Coverage

YEAR    EVENT               COST      DAMAGE    WEALTH
─────────────────────────────────────────────────────────
1       Start               —         —         ₹50,000
2       Medical (Insured)   ₹15,000   ₹15,000   ₹232,000
3       Normal Year         —         —         ₹412,000
4       Normal Year         —         —         ₹592,000
5       Car Accident        ₹15,000   ₹22,500   ₹754,500
6       House (Insured)     ₹15,000   ₹30,000   ₹919,500
─────────────────────────────────────────────────────────
FINAL: ₹919,500 (Protected Path) ✓


PATH 2: No Insurance

YEAR    EVENT               COST      DAMAGE    WEALTH
─────────────────────────────────────────────────────────
1       Start               —         —         ₹50,000
2       Medical (Exposed)   —         ₹50,000   ₹182,000
3       Normal Year         —         —         ₹362,000
4       Normal Year         —         —         ₹542,000
5       Car Accident        —         ₹75,000   ₹497,000
6       House (Exposed)     —         ₹100,000  ₹377,000
─────────────────────────────────────────────────────────
FINAL: ₹377,000 (Unprotected Path) ✗

DIFFERENCE: ₹542,500 BETTER WITH INSURANCE!
```

## Mobile View Layout

```
┌──────────────────────────────────┐
│ 🛡️ Insurance Protection          │
├──────────────────────────────────┤
│                                  │
│ Active Insurance Policies:       │
│ ┌────────────────────────────┐   │
│ │ 🏥 Medical Coverage        │   │
│ │ 🚗 Accident Coverage       │   │
│ └────────────────────────────┘   │
│                                  │
│ ⚠️ Emergency This Year!           │
│ 🚗 Car Accident                   │
│ Damage: ₹75,000                  │
│                                  │
│ ✗ No insurance - buy to          │
│   protect!                       │
│                                  │
│ ☐ Buy Insurance                  │
│   5% = ₹15,000                  │
│   ✓ Will be protected from       │
│     future accidents             │
│                                  │
└──────────────────────────────────┘
```

## Print This Card!

```
╔════════════════════════════════════════════════════╗
║  EMERGENCY INSURANCE QUICK REFERENCE               ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  🏥 MEDICAL (Year 2)                              ║
║  ├─ Damage: ₹50,000                               ║
║  ├─ Premium: ₹15,000                              ║
║  └─ Saves: ₹35,000                                ║
║                                                    ║
║  🚗 ACCIDENT (Year 5)                             ║
║  ├─ Damage: ₹75,000                               ║
║  ├─ Premium: ₹15,000                              ║
║  └─ Saves: ₹52,500                                ║
║                                                    ║
║  ⚠️ HOUSE (Year 6)                                ║
║  ├─ Damage: ₹100,000                              ║
║  ├─ Premium: ₹15,000                              ║
║  └─ Saves: ₹70,000                                ║
║                                                    ║
║  KEY RULE:                                        ║
║  Insurance you buy TODAY protects you FOREVER     ║
║  against that type of emergency!                  ║
║                                                    ║
║  BEST STRATEGY:                                   ║
║  Buy all insurance = ₹45k cost, ₹157.5k saved    ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

---

**Visual Guide Complete!** Print it, share it, use it while playing! 🛡️
