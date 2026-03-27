# User Interface Guide - Game Screens

## Screen 1: Game Menu

```
╔════════════════════════════════════════════════════════════════╗
║  HashIt Finance Simulation Game      [← Back to Dashboard]     ║
╚════════════════════════════════════════════════════════════════╝

                    Welcome, john_doe!
              Choose an option to get started:

        ┌──────────────────────────────────────┐
        │      Create New Room                 │
        │  (Set up a room and share the code)  │
        └──────────────────────────────────────┘

        ┌──────────────────────────────────────┐
        │      Join Existing Room              │
        │  (Enter a code to join a game)       │
        └──────────────────────────────────────┘
```

## Screen 2: Create Room Form

```
╔════════════════════════════════════════════════════════════════╗
║  Create a New Room                                              ║
╚════════════════════════════════════════════════════════════════╝

    Player Name *
    ┌─────────────────────────────────────┐
    │ Enter your display name             │
    └─────────────────────────────────────┘

    Number of Years *
    ┌─────────────────────────────────────┐
    │ [5 Years        ▼]                  │ (Dropdown)
    └─────────────────────────────────────┘
    Options: 5 Years | 6 Years | 8 Years

    ┌─────────────────────────────────────┐
    │     Create Room                     │ (Primary Button)
    └─────────────────────────────────────┘

    ┌─────────────────────────────────────┐
    │     Cancel                          │ (Secondary Button)
    └─────────────────────────────────────┘
```

## Screen 2b: Room Created (Success)

```
╔════════════════════════════════════════════════════════════════╗
║                    Room Created!                               ║
║           Share this code with others to join:                 ║
║
║                        ┌─────────┐
║                        │ 4 8 2 9 │  (Monospace, Large)
║                        └─────────┘
║
║                   ┌──────────────┐
║                   │  Go to Game  │
║                   └──────────────┘
╚════════════════════════════════════════════════════════════════╝
```

## Screen 3: Join Room Form

```
╔════════════════════════════════════════════════════════════════╗
║  Join a Room                                                    ║
╚════════════════════════════════════════════════════════════════╝

    Room Code *
    ┌─────────────────────────────────────┐
    │ Enter 4-digit code                  │
    └─────────────────────────────────────┘

    Player Name *
    ┌─────────────────────────────────────┐
    │ Enter your name                     │
    └─────────────────────────────────────┘

    ┌─────────────────────────────────────┐
    │     Join Room                       │ (Primary)
    └─────────────────────────────────────┘

    ┌─────────────────────────────────────┐
    │     Cancel                          │ (Secondary)
    └─────────────────────────────────────┘

    Optional Error: "Room not found. Check the code and try again."
```

## Screen 4: Game Screen (Main)

```
╔════════════════════════════════════════════════════════════════════════╗
║  HashIt Finance Simulation                      [← Back to Menu]       ║
╚════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────┐  ┌─────────────────────┐
│  Game Info                                  │  │   Leaderboard       │
├─────────────────────────────────────────────┤  ├─────────────────────┤
│ Room Code: 4829                             │  │ Rank │ Player │ $ │
│ Year: 3 / 5                                 │  ├──────┼────────┼───┤
│ Player: Sarah                               │  │  1   │ Sarah  │   │
│ Current Wealth: $234,500 (Highlighted)      │  │      │        │$2 │
├─────────────────────────────────────────────┤  │      │        │34 │
│ Year 3 - Investment Decision                │  │      │        │,5 │
│                                             │  │      │        │00 │
│ Annual Salary: $300,000                     │  ├──────┼────────┼───┤
│ Expenses (40%): $120,000                    │  │  2   │ John   │   │
│ Available to Invest: $180,000               │  │      │        │$1 │
│                                             │  │      │        │80 │
│ Investment %: 50%                           │  │      │        │,0 │
│ [━━━━━●━━━━━━━━━━━━] (Slider)              │  │      │        │00 │
│ 0%                              100%        │  │      │        │   │
│                                             │  └─────────────────────┘
│ Will invest: $90,000 (with -10% to +15%)   │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │         End Year                        │ │ (Primary Button)
│ └─────────────────────────────────────────┘ │
│                                             │
│ Success: Year submitted! Processing...     │
└─────────────────────────────────────────────┘
```

## Screen 4b: Game Over

```
┌─────────────────────────────────────────────┐
│                Game Over!                   │
│        Final Wealth: $245,800               │
│   Check the leaderboard to see the          │
│          final rankings.                    │
└─────────────────────────────────────────────┘
```

## Screen 5: Leaderboard Screen (Final)

```
╔════════════════════════════════════════════════════════════════╗
║  Final Leaderboard                    [← Back to Menu]         ║
╚════════════════════════════════════════════════════════════════╝

Room: 4829 | Years: 5 | Status: completed

┌────────────────────────────────────────────────────────────────┐
│ Rank │ Player Name │ Starting  │ Final      │ Change          │
├──────┼─────────────┼───────────┼────────────┼─────────────────┤
│ ① 1  │ Sarah       │  $50,000  │ $245,800   │ +$195,800 (39%) │
├──────┼─────────────┼───────────┼────────────┼─────────────────┤
│ 2    │ John        │  $50,000  │ $180,000   │ +$130,000 (26%) │
├──────┼─────────────┼───────────┼────────────┼─────────────────┤
│ 3    │ Emma        │  $50,000  │ $142,500   │ +$92,500 (19%)  │
├──────┼─────────────┼───────────┼────────────┼─────────────────┤
│ 4    │ Mike        │  $50,000  │ $98,750    │ +$48,750 (10%)  │
└────────────────────────────────────────────────────────────────┘
```

## Color Scheme

```
Primary Blue:    #2563eb (buttons, highlights)
Orange Accent:   #ea580c (gradients)
Success Green:   #22c55e (positive changes)
Error Red:       #dc2626 (errors)
Warning Yellow:  #f59e0b (important info)
Gray Text:       #374151 (regular text)
Light Gray:      #f3f4f6 (backgrounds)
White:           #ffffff (cards, panels)
```

## Button States

```
Normal State:
┌──────────────────┐
│  Create Room     │ Blue background, white text
└──────────────────┘

Hover State:
┌──────────────────┐
│  Create Room     │ Slightly darker, lifted shadow
└──────────────────┘

Disabled State:
┌──────────────────┐
│  Creating...     │ Grayed out, not clickable
└──────────────────┘

Active/Pressed:
┌──────────────────┐
│  Create Room     │ No lift effect, immediate visual feedback
└──────────────────┘
```

## Form Input States

```
Empty/Default:
┌──────────────────────────────────┐
│ Enter your name                  │ Gray placeholder text
└──────────────────────────────────┘

Focused:
┌──────────────────────────────────┐
│ J                                │ Blue border, cursor active
└──────────────────────────────────┘

Filled:
┌──────────────────────────────────┐
│ John                             │ Dark text
└──────────────────────────────────┘

Error:
┌──────────────────────────────────┐
│ J                                │ Red border
└──────────────────────────────────┘
✗ Please enter a valid room code

Disabled:
┌──────────────────────────────────┐
│ John                             │ Gray background, cursor not-allowed
└──────────────────────────────────┘
```

## Investment Slider

```
Visual States:

0% (Conservative):
[●━━━━━━━━━━━━━━━━]
┆
Invest 0% | Safe | Low growth potential

50% (Balanced):
[━━━━━●━━━━━━━━━━]
┆
Invest 50% | Moderate Risk | Medium growth

100% (Aggressive):
[━━━━━━━━━━━━━━━●]
┆
Invest 100% | High Risk | Maximum potential
```

## Responsive Design

### Desktop (1200px+)
```
┌─────────────────────────┬──────────────┐
│  Game Panel (60%)       │ Leaderboard  │
│  [Form/Info]            │ (40%)        │
│                         │ [Table]      │
└─────────────────────────┴──────────────┘
```

### Tablet (768px - 1199px)
```
┌──────────────────────────────┐
│  Game Panel (100%)           │
│  [Form/Info]                 │
├──────────────────────────────┤
│  Leaderboard (100%)          │
│  [Table]                     │
└──────────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────┐
│  Game Panel      │
│  [Stacked]       │
├──────────────────┤
│  Leaderboard     │
│  [Scrollable]    │
└──────────────────┘
```

## Information Hierarchy

```
Level 1 (Largest): Game Title, Year, Current Wealth
Level 2: Form labels, Section headers
Level 3: Regular text, values
Level 4: Helper text, timestamps
Level 5: Placeholder text, hints
```

## Feedback Messages

### Success (Green #22c55e)
```
✓ Year submitted successfully!
  Your wealth is now $245,800
```

### Error (Red #dc2626)
```
✗ Room not found
  Check the code and try again
```

### Warning (Yellow #f59e0b)
```
⚠ Game is ending soon
  Only 1 year remaining
```

### Info (Blue #2563eb)
```
ℹ Processing year 3...
  This may take a moment
```

