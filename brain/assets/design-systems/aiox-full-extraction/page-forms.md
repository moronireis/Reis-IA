# AIOX — Forms Page
URL: https://brand.aioxsquad.ai/brandbook/forms

## Page Purpose
Form element library with 8 sections covering inputs, textarea, select, toggles, segmented controls, and composed forms.

## Content Structure
1. **Header** — "AIOX SQUAD FORM LIBRARY V1.0 // DARK COCKPIT EDITION"
2. **01 Production Roles** — Field, FieldLabel, SegmentedControl, BbFormField
3. **02 Legacy Compatibility** — BbFormField abstraction
4. **03 Usage Guidance** — When to use which wrapper
5. **04 Text Inputs** — Full Name, Email, Password, Disabled
6. **05 Textarea** — Message (max 500 chars)
7. **06 Select** — Role dropdown (Admin, Editor, Viewer)
8. **07 Toggles** — Checkboxes, switches, notification toggles
9. **08 Composed Form** — Full form example with validation

## Form Components
| Component | Purpose |
|-----------|---------|
| `Field` | Canonical wrapper for form fields |
| `FieldLabel` | Label companion component |
| `SegmentedControl` | Pill selector (toggle between options) |
| `BbFormField` | Legacy abstraction layer |

## Input Examples
- Full Name ("As it appears on your ID")
- Email ("We will send a confirmation")
- Password ("Minimum 8 characters required")
- Disabled Input

## Segmented Controls
- Budget: Under $10k, $10k-$25k, $25k+
- Priority: Low, Medium, High

## Composed Form Example
- Project Name* (required)
- Description
- Priority selector
- Mark as urgent toggle
- Buttons: "Create Project" + "Cancel"

## Navigation Context
- Position: Design System > Components > Forms (3.0)

## Key Design Decisions
- 4 component wrappers for different form contexts
- Segmented controls for constrained choices
- Composed form shows full integration example
- Input border: --bb-border-input (rgba(156,156,156,0.2))
