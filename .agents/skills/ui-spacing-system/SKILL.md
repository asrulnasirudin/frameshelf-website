---
name: ui-spacing-system
description: >-
  Strict UI spacing, visual hierarchy, and 4pt/8pt layout system for web applications and landing pages.
  Derived from "The Ultimate Spacing Guide for UI Designers" (UXLAB Academy).
  Use whenever auditing, designing, creating, or refactoring CSS layout, padding, margins, gaps,
  component padding, section pacing, and visual proximity in user interfaces.
---

# UI Spacing System & Layout Architecture

A comprehensive, mathematically rigorous spacing guide based on the Gestalt Law of Proximity, container boundary laws, and the 4pt/8pt baseline grid system.

Use this skill to eliminate "AI sloppiness"—arbitrary pixel values (e.g. 7px, 13px, 17px, 23px), floating/orphan headings, suffocated container padding, uneven sibling margins, and broken vertical rhythm.

---

## 1. Core Principles of UI Spacing

### A. The Gestalt Law of Proximity (Visual Clustering)
> **Elements placed close together are perceived as belonging to the same group; elements placed further apart are perceived as separate entities.**

- **The Cardinal Rule for Headings:**
  The space between a heading and its associated content (body, subhead, list) must ALWAYS be substantially smaller than the space between that heading and the preceding section/element.
  - *Correct:* Preceding element `→ 48px/64px →` Section Heading `→ 8px/12px →` Subtitle/Body.
  - *AI Sloppiness Error (Orphan Heading):* Setting equal margins above and below a heading (e.g. `margin: 24px 0`), causing the heading to float ambiguously in no-man's land.

- **Proportional Grouping Ratio:**
  - Micro gap (within a unit, e.g., icon + text, label + input): `4px` or `8px`.
  - Item gap (between related items in a list or card): `12px` or `16px`.
  - Group gap (between distinct component blocks or form groups): `24px` or `32px`.
  - Section gap (between major content chapters): `64px`, `80px`, or `96px`.

### B. The Container Law: Inner vs. Outer Spacing (Padding vs. Margin)
> **Padding belongs to the interior of a container; margin/gap belongs to the relationship between distinct containers.**

- **The Hierarchy Rule:**
  `Internal Padding ≤ External Margin / Gap`
  - A card with `20px` or `24px` internal padding should be separated from sibling cards by at least `16px` to `24px`.
  - An element inside a container should never sit closer to the container’s border than it does to neighboring content within that container. If an inner button is 6px from the bottom card border but 24px from the text above it, it feels suffocated and unbalanced.
- **Symmetrical Breathing Room:**
  - Left and right padding of a card/modal/container must be strictly identical (`padding-inline: 20px`, never `padding-left: 18px; padding-right: 12px`).
  - Top and bottom padding should either be equal or intentionally biased toward visual optical centering.

---

## 2. The 4pt / 8pt Baseline Spacing Scale

Every single margin, padding, gap, min-height, and layout dimension must snap to this token scale. **Never eyeball or guess arbitrary odd numbers (no 3px, 5px, 7px, 9px, 11px, 13px, 15px, 17px, 19px, 21px, 23px).**

| Token Name | Value | Point System | Common UI Usage |
| :--- | :--- | :--- | :--- |
| `space-1` / `3xs` | **`4px`** | `4pt × 1` | Hairline offset, icon-to-text gap, compact badge vertical padding |
| `space-2` / `2xs` | **`8px`** | `4pt × 2` / `8pt × 1` | Eyebrow-to-title gap, form label to input, icon button interior, micro chip gap |
| `space-3` / `xs`  | **`12px`** | `4pt × 3` | Title-to-lead paragraph gap, compact toolbar gap, button vertical padding |
| `space-4` / `sm`  | **`16px`** | `8pt × 2` | Default component internal padding, card body gap, standard text paragraph spacing |
| `space-5` / `md`  | **`20px`** | `4pt × 5` | Studio tool row gap, comfortable card padding, search bar padding |
| `space-6` / `lg`  | **`24px`** | `8pt × 3` | Card container internal padding, grid column gap, segmented container gap |
| `space-8` / `xl`  | **`32px`** | `8pt × 4` | Modal padding, major card interior, section subhead to grid gap |
| `space-10` / `2xl`| **`40px`** | `8pt × 5` | Hero CTA-to-preview gap, header bar vertical breathing room |
| `space-12` / `3xl`| **`48px`** | `8pt × 6` | Section header to content division, large card padding |
| `space-16` / `4xl`| **`64px`** | `8pt × 8` | Standard section vertical rhythm on tablet/mobile |
| `space-20` / `5xl`| **`80px`** | `8pt × 10` | Standard section vertical padding on desktop |
| `space-24` / `6xl`| **`96px`** | `8pt × 12` | Major hero / feature section breathing room |

---

## 3. Structural Layout & Vertical Rhythm

### A. Section Pacing
For landing pages and SaaS product marketing:
```css
/* Pacing token: scales cleanly on a mathematical curve without fractional clutter */
:root {
  --section-py: clamp(56px, 5vw, 88px);
  --section-gap: clamp(32px, 3.5vw, 56px);
}
```
1. **Section Header Stack:**
   - Eyebrow to Main Heading: `8px`.
   - Main Heading to Lead Description: `12px` to `16px`.
   - Lead Description to Primary Action/Grid: `32px` to `40px`.
2. **Feature Showcase Rows:**
   - Text column to visual preview container: `clamp(32px, 4vw, 64px)`.
   - Content block margin-bottom: `24px` to `32px`.

### B. Cards & Components
1. **Card Internal Padding:**
   - Compact reference cards: `16px`.
   - Standard content cards: `20px` or `24px`.
   - Hero preview windows / modals: `24px` to `32px`.
2. **Card Grid Gaps:**
   - 3-column / 4-column grids: `16px`, `20px`, or `24px`.
   - Never allow grid gaps to be smaller than the elements' internal line spacing, or cards will merge into each other visually.
3. **Interactive Touch Targets:**
   - Buttons, inputs, and chips must have a minimum tap footprint of `40px` (or `44px` on touch screens) to prevent missed taps.

---

## 4. AI Sloppiness Anti-Patterns Checklist

When auditing or reviewing code, immediately flag and fix:

- [ ] **Arbitrary / Odd Pixels:**
  - ❌ `gap: 7px;`, `padding: 13px 18px;`, `margin-bottom: 23px;`
  - ✅ `gap: 8px;`, `padding: 12px 16px;`, `margin-bottom: 24px;`
- [ ] **Floating / Orphan Headings:**
  - ❌ Heading has `margin: 32px 0 32px;` (equal distance to top and bottom).
  - ✅ Heading has `margin-top: 48px; margin-bottom: 12px;` (bound to its content).
- [ ] **Border Suffocation:**
  - ❌ Text sits `4px` or `6px` from the card edge with no breathing room.
  - ✅ Minimum `16px` or `20px` container padding.
- [ ] **Unequal Side Insets:**
  - ❌ `padding: 12px 10px 12px 16px;` without clear architectural reason.
  - ✅ Symmetrical: `padding: 12px 16px;`.
- [ ] **Mismatched Sibling Padding:**
  - ❌ Card A has `padding: 24px;`, sibling Card B has `padding: 16px;`.
  - ✅ All sibling cards in a grid share identical padding tokens.
- [ ] **Label Detached from Control:**
  - ❌ Input label is 24px above its input, but the input is 12px from the next field.
  - ✅ Label is 8px from its own input; form group is 24px from the next field.
