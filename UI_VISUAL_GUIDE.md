# 🎨 Chat History UI/UX Visual Guide

## Sidebar Layout Structure

```
┌─────────────────────────────────────────┐
│  ╭─── HEADER ─────────────────────────╮ │
│  │ 📱 Chat History              [✕]  │ │
│  │                                    │ │
│  │ ┌──────────────────────────────┐  │ │
│  │ │ ➕  New Chat                 │  │ │
│  │ └──────────────────────────────┘  │ │
│  ╰────────────────────────────────────╯ │
│                                         │
│  ╭─── CHAT LIST ───────────────────╮   │
│  │ 🕐 HARI INI                     │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ Berapa cara membuat API REST │ │   │
│  │ │ 💬 3 msg • 19/11/2025      📥│ │ ← Hover: show export & delete
│  │ │                    [delete🗑️]  │   │
│  │ └─────────────────────────────┘ │   │
│  │                                 │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ Apa itu React Hooks         │ │   │
│  │ │ 💬 5 msg • 19/11/2025       │ │   │
│  │ └─────────────────────────────┘ │   │
│  │                                 │   │
│  │ 📅 KEMARIN                      │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ Tutorial Next.js            │ │   │
│  │ │ 💬 12 msg • 18/11/2025      │ │   │
│  │ └─────────────────────────────┘ │   │
│  │                                 │   │
│  │ 📅 MINGGU INI                   │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ Tailwind CSS Tips           │ │   │
│  │ │ 💬 8 msg • 15/11/2025       │ │   │
│  │ └─────────────────────────────┘ │   │
│  │                                 │   │
│  │ 📅 LEBIH LAMA                   │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ Python Basics               │ │   │
│  │ │ 💬 20 msg • 10/10/2025      │ │   │
│  │ └─────────────────────────────┘ │   │
│  ╰─────────────────────────────────╯   │
│                                         │
│  ╭─── FOOTER ───────────────────────╮  │
│  │ 📌 10 percakapan tersimpan       │  │
│  │                                  │  │
│  │ ┌────────────────────────────┐  │  │
│  │ │ 🗑️  Hapus Semua           │  │  │
│  │ └────────────────────────────┘  │  │
│  ╰──────────────────────────────────╯  │
└─────────────────────────────────────────┘
```

## Chat Item States

### Normal State
```
┌─────────────────────────────────────┐
│ Judul Chat                          │
│ 💬 5 msg • 19/11/2025               │
└─────────────────────────────────────┘
```

### Active State (Selected)
```
┌─────────────────────────────────────┐
│ Judul Chat (highlight)              │
│ 💬 5 msg • 19/11/2025               │
│ Border: Primary Color               │
│ Background: Primary Color (light)   │
└─────────────────────────────────────┘
```

### Hover State
```
┌─────────────────────────────────────┐
│ Judul Chat                    [📥🗑️] │
│ 💬 5 msg • 19/11/2025               │
│ Background: Secondary Color (light) │
│ Show action buttons:                │
│   📥 = Export                       │
│   🗑️ = Delete                       │
└─────────────────────────────────────┘
```

## Color Scheme

### Light Mode
```
Primary Color:      #3B82F6 (Blue)
Secondary Color:    #E5E7EB (Light Gray)
Foreground:         #000000 (Black)
Muted Foreground:   #6B7280 (Gray)
Border:             #D1D5DB (Light Border)
Background:         #FFFFFF (White)
Destructive:        #EF4444 (Red)
```

### Dark Mode
```
Primary Color:      #60A5FA (Light Blue)
Secondary Color:    #374151 (Dark Gray)
Foreground:         #FFFFFF (White)
Muted Foreground:   #D1D5DB (Light Gray)
Border:             #4B5563 (Dark Border)
Background:         #1F2937 (Dark Gray)
Destructive:        #F87171 (Light Red)
```

## Icons Used

| Icon | Meaning | Location |
|------|---------|----------|
| 💬 | Message/Chat | Chat list, counter |
| ➕ | Add/New | New Chat button |
| 📥 | Download/Export | Action button |
| 🗑️ | Delete/Trash | Action button |
| ✕ | Close | Mobile sidebar close |
| 🕐 | Clock/Time (Today/Yesterday) | Group header |
| 📅 | Calendar/Date (Week/Older) | Group header |
| 📌 | Pin/Bookmark | Footer info |

## Responsive Breakpoints

### Desktop (md: 768px+)
```
Sidebar: Static, always visible on left
┌─────────┬──────────────────────┐
│ Sidebar │                      │
│         │   Main Content       │
│(320px)  │                      │
└─────────┴──────────────────────┘

Sidebar Width: 320px (fixed)
Chat Item Size: Full width - padding
```

### Tablet (sm: 640px to md: 768px)
```
Sidebar: Collapsible, overlay when open
[≡] ← Hamburger menu
Main content takes full width
```

### Mobile (< sm: 640px)
```
Sidebar: Overlay from left
[≡] Main Content [...]
Sidebar animates in from left
Backdrop blur when open
Closes on selection or click outside
```

## Animations

### Sidebar Slide In/Out (Mobile)
```
Duration: 300ms
Timing: Spring (stiffness: 300, damping: 30)
From: x: -320px (off-screen left)
To:   x: 0 (visible)
```

### Chat Item Hover
```
Duration: Default (immediate)
Transform: scale(1.02) on hover
          scale(0.98) on tap
Gives feedback without animation
```

### Chat Item Appear
```
Inherit from parent AnimatePresence
Smooth fade in when added
```

## Typography

### Sidebar Header
```
Font Size: 18px (lg)
Font Weight: 700 (bold)
Color: Foreground
Font Family: System default
```

### Group Label
```
Font Size: 12px (xs)
Font Weight: 600 (semibold)
Color: Muted Foreground
Text Transform: UPPERCASE
Letter Spacing: 0.05em
Opacity: 70%
```

### Chat Title
```
Font Size: 14px (text-xs)
Font Weight: 500 (medium)
Color: Foreground
Overflow: truncate (single line)
```

### Chat Metadata
```
Font Size: 12px (text-xs)
Color: Muted Foreground (70% opacity)
Format: "💬 N msg • DD/MM/YYYY"
```

### Button Text
```
Font Size: 14px (sm) - New Chat
Font Weight: 600 (semibold)
Color: Primary Foreground
```

## Spacing & Layout

### Sidebar Padding
```
Header: 24px (p-6)
Content: 16px (p-4)
Footer: 16px (p-4)
Chat list row gap: 4px (space-y-1)
```

### Chat Item Internal Spacing
```
Padding: 12px (p-3)
Gap: 8px
Border Radius: 8px (rounded-lg)
```

### Group Spacing
```
Between groups: 16px (mb-4)
Group header padding: 8px top & bottom
Group items gap: 4px (space-y-1)
```

## Borders & Shadows

### Sidebar Shadow
```
Desktop: shadow-lg (0 10px 15px -3px)
Mobile: shadow-xl (0 20px 25px -5px)
```

### Chat Item Border
```
Active: 1px solid - Primary color (50% opacity)
Inactive: 1px transparent
Active Bg: Primary color (15% opacity)
```

### Button Hover Shadow
```
New Chat: hover:shadow-lg when clicked
```

## Transitions & Effects

### All Transitions
```
Default Duration: 200ms
Default Timing: ease-in-out
Properties:
  - background-color
  - border-color
  - transform
  - opacity
```

### Hover Effects
```
Chat Item: scale(1.02)
Buttons: opacity-0 to opacity-100
         (show/hide on hover)
```

## Accessibility

### Focus States (Keyboard Navigation)
```
All buttons: Focus ring visible
Focus color: Primary color
Focus width: 2px
```

### Color Contrast
```
Text on Background: >= 4.5:1 ratio
Text on Colored Bg: >= 4.5:1 ratio
All icons: >= 3:1 ratio
```

### Touch Targets
```
Minimum Size: 44px x 44px
Chat Item: ~44px height with padding
Buttons: 24px min for action buttons
Tap Area: 8px padding around interactive
```

## Empty State

```
┌─────────────────────────────────────┐
│          [💬 Icon]                  │
│       Belum ada chat                 │
│                                     │
│  Mulai percakapan baru untuk       │
│  melihatnya di sini                │
│                                     │
│  ➕ New Chat button available       │
└─────────────────────────────────────┘
```

## Loading States

```
Chat List Loading:
├─ Show skeleton/placeholder
├─ Animate pulse effect
└─ Replace with actual content

Message Loading:
├─ Show cursor animation
├─ "..." dot animation
└─ Replace with message when done
```

## Error States

```
Delete Confirmation:
├─ Modal dialog appears
├─ "Are you sure?" message
├─ Cancel / Delete buttons
└─ Red color for Delete button

Export Error:
├─ Console error logged
├─ User notified if needed
└─ Retry available
```

---

**Visual Design**: Material Design 3 Inspired  
**Theme System**: Light & Dark mode support  
**Animation Library**: Framer Motion  
**Last Updated**: November 6, 2025
