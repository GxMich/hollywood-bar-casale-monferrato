---
name: Hollywood Bar — Scena serale
description: A cinematic evening invitation in black, off-white and room lavender.
colors:
  paper: "#f7f5ef"
  surface: "#121314"
  surface-raised: "#1b1a1e"
  ink: "#121016"
  muted: "#c6c0cc"
  line: "#4d4754"
  lavender: "#c7a0e5"
  lavender-hover: "#dcc0f2"
typography:
  display:
    fontFamily: "'Roboto Condensed Variable', 'Archivo Variable', sans-serif"
    fontSize: "clamp(76px, 8.6vw, 132px)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "0"
  headline:
    fontFamily: "'Roboto Condensed Variable', 'Archivo Variable', sans-serif"
    fontSize: "clamp(40px, 4.4vw, 66px)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-.035em"
  title:
    fontFamily: "'Roboto Condensed Variable', 'Archivo Variable', sans-serif"
    fontSize: "clamp(28px, 2.7vw, 40px)"
    fontWeight: 900
    lineHeight: 1.12
    letterSpacing: "-.035em"
  body:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  editorial-body:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.4
  text-link:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 600
  navigation:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
  caption:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  wordmark:
    fontFamily: "'Anton', sans-serif"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: ".005em"
  wordmark-descriptor:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "9px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: ".22em"
rounded:
  square: "0px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  copy-gap: "18px"
  group-gap: "20px"
  lg: "24px"
  xl: "28px"
  xxl: "32px"
  panel-gap: "36px"
  block-gap: "40px"
  gutter: "clamp(24px, 3.5vw, 64px)"
  section-space: "clamp(72px, 7.5vw, 120px)"
components:
  button-lavender:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "17px 25px"
  button-lavender-hover:
    backgroundColor: "{colors.lavender-hover}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "17px 25px"
  text-link:
    textColor: "{colors.lavender}"
    typography: "{typography.text-link}"
    padding: "10px 0"
  navigation:
    textColor: "{colors.paper}"
    typography: "{typography.navigation}"
  offer-tab:
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "14px 28px"
  offer-tab-selected:
    textColor: "{colors.lavender}"
  icon-button:
    textColor: "{colors.paper}"
    rounded: "{rounded.circle}"
    height: "48px"
    width: "48px"
  icon-button-hover:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.ink}"
  provisional-wordmark:
    textColor: "{colors.paper}"
    typography: "{typography.wordmark}"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    width: "min(920px, calc(100% - 40px))"
---

# Design System: Hollywood Bar — Scena serale

## Overview

**Creative North Star: "La serata prende posto"**

The room becomes the invitation: an immersive interior, heavy off-white lettering and a lavender focal word introduce an evening in Casale. The surrounding interface continues in dark photographic spreads, with direct Archivo copy and practical rectangular actions. The character is cinematic, sociable and confident.

This records the implemented replacement selected through `docs/new-directions/mockups/01-scena.png`. The rejected warm-paper system is archived under `docs/scena/`. The small Anton name and filled star are a provisional typeset identity, not an official logo. The two opening photographic plates are generated interpretations and remain disclosed; the lower photographs retain their historical or review-source captions. Design selection does not certify current venue photography or authorize public launch.

**Key Characteristics:**

- Full-bleed room photography with a naturally dark reading area.
- Heavy condensed headings, readable Archivo narrative and compact Anton identity.
- Black and off-white structure with room lavender for emphasis, actions and wayfinding.
- Flat rectangular surfaces, one opening photographic diagonal and circular image controls.
- A finite photographic arrival, native scrolling and immediately usable actions.

## Colors

A near-black world lets the room's lighting and food provide the visual texture; lavender connects emphasis to the illuminated bar.

### Primary

- **Room lavender**: emphasized words, the identity star, primary action fill, selected categories, text actions, focus and the directions field.
- **Light lavender**: precise-pointer hover on lavender actions.

### Neutral

- **Off-white**: principal text and identity lettering on dark surfaces; text on the ink action.
- **Room black**: page, navigation panel, photographic placeholders, mobile quick actions and dialogs.
- **Raised charcoal**: gallery-image fallback ground.
- **Purple-black ink**: text on lavender and the dark directions action.
- **Lilac-grey copy**: supporting narrative, captions and provenance.
- **Smoked rule**: thin separators, category rail, circular outlines, dialog edge and mobile action boundary.

The offer, programme and footer use local dark tonal surfaces. Those single-section values remain in the stylesheet rather than expanding the shared palette.

**The Room Light Rule.** Use lavender in the established roles above; let photographs carry the other hues. The directions field is an intentional full accent passage.

## Typography

**Display and Heading Font:** self-hosted Roboto Condensed Variable, with Archivo Variable and sans-serif fallbacks.  
**Body Font:** self-hosted Archivo Variable, with Arial and sans-serif fallbacks.  
**Identity Font:** self-hosted Anton, with sans-serif fallback.

**Character:** tightly set, heavy condensed titles make the invitation visible over the room. Archivo provides a quieter reading voice. Anton belongs to the provisional name, not the narrative heading hierarchy.

### Hierarchy

The frontmatter records desktop base roles. The source applies these optical and responsive overrides:

| Role or component | Above 900px | 601–900px | 360–600px | Up to 359px |
| --- | --- | --- | --- | --- |
| Opening h1 | display token | clamp(72px, 11vw, 96px), line-height .96 | clamp(46px, 14.4vw, 68px), line-height 1.02 | 45px |
| Standard h2 | headline token | clamp(36px, 6.4vw, 54px) | same tablet clamp | 31px |
| Apericena h2 | clamp(40px, 4.05vw, 62px), line-height .88, zero tracking | 36px | clamp(37px, 9.3vw, 52px) | 33px |
| Offer h3 | title token | clamp(28px, 4.8vw, 40px) | 30px | 27px |
| Heritage h2 | clamp(34px, 3.5vw, 52px) | 30px | 34px | 31px |
| Gallery h3 | clamp(28px, 2.8vw, 40px) | 28px | 26px | 24px |
| Programme h2 | clamp(34px, 4vw, 58px) | 40px | 34px | 34px |
| Dialog h2 | clamp(30px, 4vw, 46px) | same clamp | same clamp | same clamp |
| Identity lettering / star | 44px / 40px | 31px / 31px | 31px / 31px | 27px / 27px |

The apericena title becomes 40px between 901px and 1150px. The two opening headline lines are deliberate and nowrap inside their line wrappers. At the source viewport (1487px), the implemented opening is about 128px; at 390px it is about 56px. Component-specific sizes are not additional global scale steps.

- **Body:** browser-normal root size with the body token's family and paragraph leading. Most narrative sections use the editorial-body role; offer and programme copy become 16px at 900px. Heritage uses 15px on tablet and 16px on mobile.
- **Opening support:** clamp(20px, 2.14vw, 34px), line-height 1.35; 24px on tablet and 20px/1.45 on mobile. It is supporting display copy, not the standard paragraph style.
- **Reading widths:** offer copy caps at 460px desktop / 580px tablet; heritage at 510px; section support at 400px; programme support at 365px desktop. Preserve those useful reading columns instead of stretching every paragraph across a spread.
- **Actions:** base labels use the label token. Opening action labels scale from 18px to 24px desktop, then 20px tablet / 18px mobile / 16px below 360px. Text links inherit the recorded role, with authored section overrides.
- **Captions:** the compact caption role identifies provenance; individual line-height and mobile sizes are local. Do not remove provenance to make a crop cleaner.

**The Two Voices Rule.** Use Roboto Condensed for invitation and section hierarchy, Archivo for narrative and controls, and Anton only for the provisional identity.

## Layout

The page is centered with a maximum width of 1800px. Full-bleed photography reaches that page boundary. Shared gutters and section spacing come from the frontmatter; at 900px and below they become 24px and 72px, with a 20px gutter below 360px. Native document scrolling remains the navigation model.

The opening room is clamp(610px, 47.08vw, 848px) high on desktop, yielding approximately 700px at the 1487px reference width. Its header overlays the image and its title starts within the same left gutter. The adjacent food/copy spread uses 58%/42% columns, 55%/45% between 901–1150px and 51%/49% on tablet. Below 601px it becomes a photograph followed by copy; the photograph uses a 1.6 aspect ratio and loses its diagonal. The mobile room remains the full background behind the invitation, action and address.

Recurring lower spreads use a 1.3fr/1fr grid with an 8% gap; the offer panel becomes one column at 900px. Heritage uses a narrower photograph beside a wider narrative column and switches to copy before photograph on mobile. The desktop gallery uses unequal 1.3fr/1fr/.85fr image columns and a staggered middle tile. At 900px it becomes a native horizontal snap rail with 76% tiles, increasing to 86% on mobile. Contact information stays in two columns on tablet and one on mobile.

The mobile quick-action bar appears after the opening action leaves view and hides at the directions section. It reserves safe-area padding and the footer reserves room for it. Controls remain at least 44px in their implemented responsive sizes.

## Elevation & Depth

The system uses no box shadows. Depth comes from the interior's photographic perspective, the dark reading shade, image crops, adjacent dark tones and the native dialog backdrop. The opening shade is directional on desktop and a uniform dark overlay on smaller screens; it protects reading over a changing crop. Dialogs have a thin border and a dark translucent backdrop, without decorative lifting.

**The Photographic Depth Rule.** Keep interface surfaces flat; use crop, tonal separation and the room itself to convey depth.

## Shapes

Actions, panels, tabs, image frames and dialogs are square. Circular controls are reserved for gallery arrows and dialog close. Fine one-pixel rules structure categories, provenance and practical information. The opening food image has a shallow sloping right boundary, removed on mobile; this is an established surface composition, not a requirement to cut every photograph diagonally.

## Components

### Buttons and text actions

Confident rectangular actions with clear space for their SVG arrow. Lavender actions use ink labels; the directions action reverses this pairing. The base action has 56px minimum height, 17px/25px padding and a 30px label/arrow gap. The larger opening action has its own 68px desktop minimum and 60px mobile minimum. Legacy `light` and `orange` source variants currently resolve to the same lavender treatment; they do not introduce additional palette roles.

Precise-pointer hover lightens lavender actions; the ink action uses its local purple-black hover. Arrow movement is 4px and press scale is .98. Global focus uses a 3px lavender outline with 5px offset; the directions field switches focus to ink. Text actions remain underlined and retain their 44px minimum target.

### Navigation and identity

A compact provisional Anton name and lavender SVG star anchor an overlay header. Desktop navigation uses off-white Archivo links with a lavender underline on the first link. This is a static first-link treatment, not scroll-spy state. At 900px the navigation becomes a dark full-width disclosure below the 90px topbar. Closed links are inert; Escape returns focus to the toggle, and selecting an anchor closes the disclosure and focuses its destination.

### Offer categories

An open horizontal rail with a bottom rule. The selected category changes text, a three-pixel underline and arrow rotation together. Tabs use roving keyboard focus and Arrow/Home/End navigation. Pointer selection gives the photo a brief settle; keyboard selection is immediate. The supporting note remains visible and does not imply a confirmed menu, formula or price.

### Image spreads and gallery

Photographs sit in flat rectangular frames rather than cards. Desktop gallery heights vary intentionally; the mobile rail normalizes them for browsing. Each tile opens a native dialog. The dialog provides close, previous/next, position count, arrow-key navigation, touch swipe and source-period caption. Fine-pointer hover enlarges a tile photograph by 1.035 over 450ms; it does not change the surrounding layout. No general-purpose input, chip or card primitive is shipped.

The small L’APERICENA marker is retained at the opening food/copy spread because it is explicitly present in the user-selected reference. This is a limited composition-fidelity exception, not a reusable eyebrow role for other sections.

### Dialogs and mobile actions

A square dark dialog caps its width at the recorded token and its height at the viewport minus 48px; mobile margins reduce to 12px. The circular close target is 44px. Opening/closing uses native dialog semantics and restores body scrolling. Mobile quick actions use one dark action and one lavender directions action, separated from content by a rule.

### Motion

The room settles from scale 1.045 to 1 over 1800ms. The title lines rise 32px over 850ms, staggered by 100ms. On desktop with movement allowed, a visible room may translate by up to 10px and scale to 1.04 as it leaves view. The introductory food photograph settles once over 900ms. Interface timing is 100ms press, 160ms fast, 240ms panel and 140ms exit. Source easings and complete extension values live in the sidecar.

Motion supports hierarchy and feedback; content and controls are never held for an observer. Live reduced-motion changes finish or cancel running animation, remove the photographic camera movement and use immediate navigation. Pointer hover is limited to fine pointers. There is no perpetual loop or forced scrolling in this build.

## Do's and Don'ts

### Do:

- **Do** preserve the room-first invitation and the dark photographic world selected in `01-scena.png`.
- **Do** use Room lavender for the established emphasis, action, selection and directions roles.
- **Do** keep heading, narrative and identity families in their separate roles.
- **Do** reflow image and copy for mobile while retaining the opening room, invitation and action.
- **Do** retain image provenance, illustrative disclosure, keyboard focus and live reduced-motion support.

### Don't:

- **Don't** restore the rejected cream system or mix in the unselected direction images.
- **Don't** promote the provisional name/star into a claim of an official logo.
- **Don't** present generated opening plates as current venue or menu photography.
- **Don't** replace native scrolling with a forced camera journey or add perpetual motion.
- **Don't** convert the flat photographic spreads into a generic raised-card grid.
