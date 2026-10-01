---
name: Ansh Tyagi
description: Backend and distributed-systems engineer, presented as an Apple product launch.
colors:
  paper: "#ffffff"
  paper-gray: "#f5f5f7"
  ink: "#1d1d1f"
  ink-muted: "#6e6e73"
  hairline: "#d2d2d7"
  action-blue: "#0071e3"
  action-blue-pressed: "#0062c4"
  link-blue: "#0066cc"
  link-blue-night: "#2997ff"
  night: "#000000"
  night-raised: "#161617"
  night-chip: "#1d1d1f"
  night-ink: "#f5f5f7"
  night-ink-muted: "#a1a1a6"
  cosmic-amber: "#0a84ff"
  cosmic-violet: "#5e5ce6"
  cosmic-rose: "#bf5af2"
  bar-before: "#48484a"
  control-gray: "#e8e8ed"
  live-green: "#30d158"
typography:
  display:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(48px, 8.4vw, 104px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  stat:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(84px, 9vw, 112px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\""
  headline:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(36px, 5.2vw, 64px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.4vw, 30px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  intro:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(19px, 1.8vw, 24px)"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: "-0.005em"
    fontFeature: "\"tnum\""
  label:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.47
  nav:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
rounded:
  tile: "28px"
  photo: "20px"
  logo: "12px"
  bar: "5px"
  pill: "980px"
spacing:
  gutter: "clamp(20px, 5vw, 48px)"
  container: "1120px"
  nav-height: "52px"
  grid-gap: "20px"
  photo-gap: "12px"
  section-y: "clamp(80px, 11vw, 140px)"
  tile-pad: "clamp(28px, 3.4vw, 40px)"
components:
  button-pill-large:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-pill-large-hover:
    backgroundColor: "{colors.action-blue-pressed}"
  button-pill-small:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  text-link:
    textColor: "{colors.link-blue}"
    typography: "{typography.body}"
  text-link-night:
    textColor: "{colors.link-blue-night}"
  tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad}"
  tile-dark:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.tile}"
  highlight-card:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.tile}"
    padding: "36px 32px 32px"
    width: "min(372px, 82vw)"
  chart-card:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.tile}"
    padding: "36px 32px"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  disclosure-plus:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "36px"
  paddle:
    backgroundColor: "{colors.control-gray}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
---

# Design System: Ansh Tyagi

## Overview

**Creative North Star: "The Keynote Product Page"**

The person is presented the way Apple launches a product: a black keynote stage, a swipeable "Get the highlights" gallery, before/after performance bars, bento tiles that open with a "+" button, a Tech Specs table, and footnoted claims. The look is quiet and expensive. Gray and white stretches alternate with black keynote sections, the type is big and tightly tracked, and the surfaces sit flat.

Color does two jobs and only two. Blue is for anything you can act on. A blue-to-violet gradient is for proof: display numbers, the second hero line, and the contact accent word. Everything else is Apple neutrals. This replaces the earlier "Component Datasheet" world (red, ink, paper), which the user rejected.

**Key Characteristics:**
- Section rhythm alternates white, light gray (#f5f5f7), and black stages.
- One action color (blue) and one proof accent (the cosmic gradient).
- Archivo at normal width with Apple-style negative tracking. The display text is heavy (700).
- 28px-radius tiles, pill controls, a frosted dark sticky nav.
- Claims carry footnote superscripts that resolve in the footer notes.

## Colors

The palette is Apple neutrals, with blue for action and a warm gradient for proof.

### Primary
- **Action Blue** (action-blue; pressed: action-blue-pressed): the fill of every pill button. Pressed/hover darkens it. It also draws the focus ring (2px outline, 3px offset).
- **Link Blue** (link-blue; on black: link-blue-night): inline and "›" text links.

### Secondary
- **Cosmic Gradient** (`linear-gradient(100deg, cosmic-amber 0%, cosmic-violet 38%, cosmic-rose 100%)`): clipped to text on display numbers (highlight values, chart multipliers, project stats), the second hero line, and the starred contact word. It also fills the "after" performance bar. A blurred radial glow of violet and rose rises behind the hero art.
- **Cosmic Violet** (cosmic-violet), solid: small markers only. These are the bullet dots, the repo star, and the equalizer bars.

### Neutral
- **Paper / Paper Gray** (paper, paper-gray): light section and tile grounds. Tiles invert against their section: white tiles on gray sections, gray tiles on white sections.
- **Ink / Ink Muted** (ink, ink-muted): headlines and body / secondary copy, meta, sublines.
- **Hairline** (hairline): spec and repo row rules, footer dividers, the inset 1px ring on chips and logo tiles.
- **Night / Night Raised / Night Chip** (night, night-raised, night-chip): keynote stage, chart cards, chips on dark.
- **Night Ink / Night Ink Muted** (night-ink, night-ink-muted): text on black.
- **Bar Before** (bar-before): the "before" performance bar.
- **Live Green** (live-green): the availability dot only, with a 4px 18% halo.

### Named Rules
**The Blue Means Act Rule.** Blue appears only on things that can be clicked or focused. Never use it for decoration or emphasis.

**The Gradient Is Proof Rule.** The cosmic gradient marks measured results and the one or two words that carry the promise. Never use it on body text, buttons, or backgrounds.

## Typography

**Display Font:** Archivo (with -apple-system, BlinkMacSystemFont, system-ui)
**Body Font:** Archivo (same stack)

**Character:** This is the user's kept face. It is set at normal width and treated like SF Pro Display: heavy display, tight negative tracking, generous body leading. Tabular numerals are on globally, so metrics align.

### Hierarchy
- **Display**: hero tagline. The contact headline uses a smaller step, clamp(40px, 6.4vw, 80px).
- **Stat**: highlight-card values. The same treatment at clamp(48px, 5.6vw, 72px) for chart multipliers and clamp(64px, 7vw, 96px) for tile stats.
- **Headline**: section heads, written as short sentences ending in a period ("Experience.", "Tech specs.").
- **Title**: tile and spec keys. The tile subline is 17px/600 muted.
- **Intro**: section and hero sub. Max 40–44ch, balanced, muted with bold lead phrases in full ink.
- **Body** (17px / 1.47): tiles, specs. Prose max 62ch. Bullets are 16px / 1.5.
- **Label** (13–15px): meta, chart context, captions, chips (13px), footer (12px).

### Named Rules
**The Sentence Head Rule.** Section heads are short declarative sentences with a period. Sections have no labels above the heading.

## Layout

The container is 1120px max with a fluid gutter. Sections get section-y vertical padding, and section heads sit 36–56px above their content. Bento tiles run on a 6-column grid with spans of 2, 3, 4, or 6 and a 20px gap. Performance charts use a 2-column grid. Photos use a 4-column grid on 12px gaps, with the first photo spanning 2×2, then a 3-up row of life widgets.

The highlights gallery scrolls horizontally with snap, aligned to the container edge, the scrollbar hidden, and circular paddles at bottom right. At 900px and below, every grid collapses to one column, specs stack, and photos go 2-up. At 860px and below, nav links fold into a chevron disclosure dropdown. The hero sits under the frosted nav (negative top margin) and is centered.

## Elevation & Depth

The system is flat. Depth comes from tonal layering (black stage, then #161617 chart cards; gray section, then white tile) and from translucency. There are no drop shadows.

### Shadow Vocabulary
- **Hairline ring** (`box-shadow: inset 0 0 0 1px #d2d2d7`): chips and logo tiles on white, and image cards.
- **Live halo** (`box-shadow: 0 0 0 4px rgba(48,209,88,.18)`): the availability dot.
- **Frosted nav** (`background: rgba(0,0,0,.8); backdrop-filter: saturate(180%) blur(20px)`): the sticky local nav and mobile menu. Under reduced transparency it becomes solid #161617.

### Named Rules
**The No Drop Shadow Rule.** Surfaces separate by tone, never by cast shadow.

## Shapes

Large continuous rounding on containers (tiles, cards, charts at 28px; photos and widgets at 20px). Full pills on every control (buttons, chips, paddles, the "+" disclosure). Thin 10px bars with 5px ends. Photos and image tiles clip to their radius. Product art can bleed off the bottom edge of a tile.

## Components

### Buttons
- **Shape:** full pill (980px).
- **Primary:** Action Blue fill, white 500-weight text. Large (17px, 12×24) for hero and contact. Small (12.5px, 5×12) as the nav Email.
- **Hover / Active:** darkens to the pressed blue over .2s, and scales to .97 on press.
- **Text link:** blue text with a trailing "›" that nudges 3px right on hover. On black it uses the lighter night blue.

### Chips
- **Style:** 13px pill, white with a hairline ring. On gray tiles they become gray with no ring. On dark they become #1d1d1f with no ring. A bold variant is used for languages.

### Cards / Containers
- **Tile:** 28px radius, tile-pad, flex column with a 12px gap. It inverts against its section; the dark variant is black.
- **Highlight card:** black, 372px wide, min 460px tall. A bold-lead sentence sits at the top and the gradient stat at the bottom. Photo and image variants exist.
- **Chart card:** #161617, gradient multiplier, label with footnote, then before/after bars.

### Navigation
- **Local nav:** 52px sticky, frosted black. The name sits left (19px/600). Links are 12.5px #d2d2d7 and turn white on hover. The blue Email pill is on the right.

### Disclosure ("+" tile)
- A full-width summary row (15px/600 label) with a 36px ink circle "+" that rotates 45° when open. Height animates via `::details-content` over .35s.

### Tech Specs
- A two-column 1:3 row (title-scale key, 17px value with a 15px muted subline), separated by hairlines.

### Motion
- Easing is `cubic-bezier(0.23,1,0.32,1)` / expo.out. Hero items rise 24px from blur, staggered .08s. Below-fold blocks fade up 40px once. Bars grow from scaleX 0 and multipliers count up. The laptop lid opens and the Memoji peeks. Every default is the final visible state, and reduced motion skips all of it.

## Do's and Don'ts

### Do:
- **Do** alternate white, gray, and black sections, and invert tile tone against the section.
- **Do** use Action Blue pills for primary actions and "›" text links for secondary ones.
- **Do** put measured numbers in the cosmic gradient at stat scale, with a footnote superscript that resolves in the footer.
- **Do** keep Archivo at normal width with negative tracking on everything 24px and up.

### Don't:
- **Don't** use blue for anything that is not interactive.
- **Don't** use the gradient on buttons, backgrounds, or running text.
- **Don't** add drop shadows. Separate by tone.
- **Don't** add labels or kickers above section heads.
- **Don't** reintroduce the datasheet red/ink/paper palette.
