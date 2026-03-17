# AIOX — Feedback Page
URL: https://brand.aioxsquad.ai/brandbook/feedback

## Page Purpose
UI feedback component library covering alerts, toasts, modals, notification center, empty states, loading overlays, and confirm sheets.

## Content Structure
1. **Header** — "Feedback Library — Dark Cockpit Edition V2.0"
2. **01 Alerts** — Information, Success, Warning, Error
3. **02 Toasts** — Success ("Changes saved"), Error, Warning, Info
4. **03 Modal** — Dialog with open trigger
5. **04 Notification Center** — Unread notification display
6. **05 Empty States** — "No items", "No results", "Error", "Access denied"
7. **06 Loading Overlay** — Spinner sizes: SM, MD, LG
8. **07 Confirm Sheet** — Default, Destructive, Loading states

## Component Variants

### Alerts (4 variants)
- Information (blue)
- Success (green/lime)
- Warning (amber)
- Error (red)

### Toasts (4 variants)
Same color variants as alerts, appearing as floating notifications

### Empty States (4 variants)
- No items
- No results
- Error
- Access denied

### Loading Overlay Sizes
- SM (small spinner)
- MD (medium spinner)
- LG (large spinner)

### Confirm Sheet States
- Default
- Destructive
- Loading

## JavaScript Interactions
- Modal/Sheet open triggers with state management
- 3-second loading overlay demo
- Notification center with unread count (2)

## Navigation Context
- Position: Design System > Components > Feedback (4.0)

## Key Design Decisions
- 7 feedback categories cover all UI communication needs
- Consistent 4-color semantic system (info/success/warning/error)
- Empty states with clear messaging and action buttons
- Confirm sheets for destructive actions
