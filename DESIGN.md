# Design System Strategy: The Serene Sanctuary

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Sanctuary."** 

In the context of emotional and psychological health, our UI must act as a deep breath. We are moving away from the "App as a Tool" aesthetic and toward "App as a Space." This system rejects the rigid, boxy constraints of traditional SaaS platforms in favor of a high-end editorial experience that feels fluid, organic, and profoundly safe. 

We achieve this through **Intentional Asymmetry** and **Soft Minimalism**. By breaking the "template" look with generous white space and overlapping elements, we create a sense of movement and life, signaling to the user that they are in a supportive, human-centric environment, not a clinical database.

---

## 2. Colors: The Tonal Landscape
Our palette is rooted in soft atmospheric tones, designed to reduce cognitive load and heart rate. 

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Content boundaries must be established solely through background color shifts or subtle tonal transitions. For example, a `surface-container-low` section should sit against a `background` or `surface` color to create a "ghost" edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, semi-translucent paper.
*   **Background (`#f8f9fa`):** The base canvas.
*   **Nesting Logic:** To create depth, use the surface-container tiers. Place a `surface-container-lowest` (#ffffff) card on top of a `surface-container-low` (#f1f4f5) background. This creates a soft, natural "lift" that feels premium and intentional.

### The "Glass & Gradient" Rule
To elevate the experience beyond flat design:
*   **Glassmorphism:** Use semi-transparent surface colors (e.g., `surface` at 80% opacity) with a `24px` backdrop-blur for floating navigation bars or modal overlays.
*   **Signature Textures:** Use subtle linear gradients for primary CTAs, transitioning from `primary` (#22648e) to `primary_container` (#95cfff) at a 135-degree angle. This adds a "visual soul" and tactile depth.

---

## 3. Typography: Editorial Authority
We pair the geometric stability of **Manrope** for headers with the high legibility of **Inter** for utility and body text.

*   **Display & Headlines (Manrope):** These are our "voice." Use `display-lg` (3.5rem) with wide tracking (-0.02em) to create an authoritative yet calming presence. Headlines should feel like book titles—grand and spacious.
*   **Body & Labels (Inter):** These are our "support." `body-lg` (1rem) provides the core reading experience. Inter's neutral tone ensures that the user’s focus remains on the content, not the typeface.

The contrast between the oversized, expressive Manrope headers and the restrained Inter body text creates a high-end editorial rhythm that feels curated and trustworthy.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to represent "height"; we use light to represent "presence."

*   **The Layering Principle:** Stack `surface-container` tokens to define hierarchy. 
    *   *Level 0:* `surface` (The floor)
    *   *Level 1:* `surface-container-low` (Secondary content blocks)
    *   *Level 2:* `surface-container-lowest` (Interactive cards/primary focus)
*   **Ambient Shadows:** If an element must float (e.g., a FAB or a modal), use an ultra-diffused shadow: `box-shadow: 0 12px 40px rgba(45, 51, 53, 0.06);`. The shadow color is a tint of our `on_surface` color, never pure black, ensuring it feels like natural ambient light.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline_variant` at **15% opacity**. A 100% opaque border is a failure of the "Sanctuary" aesthetic.

---

## 5. Components: Soft & Intentional
All components inherit the `xl` (1.5rem) or `lg` (1rem) roundedness to maintain the "Soft" vibe.

*   **Buttons:**
    *   **Primary:** A gradient of `primary` to `primary_dim`. High roundedness (`full`). No shadow; use a subtle `primary_container` glow on hover.
    *   **Tertiary:** Text-only with an underline that appears on hover, utilizing the `secondary` color for a sophisticated lavender accent.
*   **Cards:** Forbid divider lines. Separate "Header," "Body," and "Footer" of a card using `1.5rem` vertical padding and subtle background shifts (e.g., a `surface-container-high` footer on a `surface-container-lowest` card).
*   **Input Fields:** Use `surface-container-low` as the fill. On focus, transition the background to `surface-container-lowest` and add a `2px` "Ghost Border" of the `primary` color. 
*   **Progress Indicators:** Use the `secondary` (Lavender) color for emotional milestones. The softness of lavender reduces the "task-oriented" stress of progress tracking.
*   **The "Breath" Component:** A custom component for this platform—a large, pulsing circular gradient using `primary_container` and `secondary_container` with a `40px` blur, used for guided breathing or meditation states.

---

## 6. Do’s and Don'ts

### Do:
*   **Embrace Asymmetry:** Align a headline to the left but place the supporting body text in a narrower column shifted to the right to create "Editorial Air."
*   **Prioritize Whitespace:** If a screen feels "busy," increase the spacing scale rather than adding more borders or dividers.
*   **Use Tonal Transitions:** Transition the entire background color of the page from `surface` to `secondary_container` as the user moves into "Rest" or "Reflection" sections of the app.

### Don't:
*   **Don’t use 100% Black:** Never use `#000000`. Use `on_surface` (#2d3335) to keep the contrast soft and readable.
*   **Don’t use Sharp Corners:** Even "small" components like checkboxes must use the `sm` (0.25rem) radius. Sharp corners trigger a "threat" response in the subconscious.
*   **Don’t Grid-Lock:** Avoid making every page look like a dashboard. Allow elements to overlap slightly (e.g., an image overlapping a text container) to create depth.