# VA Fluid Lab — Teaching Polish Notes

Purpose: turn the overnight prototype from “pretty demo” into a small lesson that VA can open in the morning and immediately understand or extend.

## What I added tonight

- **3-minute morning tour** at the top of the page, so the demo has a suggested path instead of becoming a random set of sliders.
- **One-click concept checks** on every topic card. These are deliberately short: one cause/effect idea per card.
- **Assumption note**: the page is a learning model, not a certified design calculator.
- **Fluid Machinery Studio**: a preliminary design GUI for chord/pitch/radius/rpm/flow/blade-count tradeoffs, framed as 1D/BEM/similarity-law intuition rather than CFD.
- **Minor JS hardening**: removed accidental global variables in the pressure/shear calculations.

## Good next upgrades

1. **Unit mode toggle**
   - SI now; a toggle for mm/cm/m, kPa/Pa, water/air presets would make it friendlier.
2. **Preset examples**
   - “Swimming pool wall,” “honey between plates,” “sink jump,” “garden hose,” “drone body.”
3. **Misconception cards**
   - Examples: “pressure is not force,” “viscosity is not density,” “laminar does not mean slow in every context.”
4. **Screenshot export**
   - Button to save each canvas as PNG for notes/slides.
5. **Teacher mode**
   - Hide formulas first, ask the intuition question, then reveal the equation.
6. **Fluid machinery presets**
   - Add presets for small fan, propeller, pump impeller, and turbine rotor so VA can compare geometry families without touching every slider.
7. **Data export**
   - Export the sweep curve as CSV for notes or follow-up sizing studies.

## Content guardrails

- Keep each section to one dominant idea.
- Every formula should have: variables, slider, visual consequence, and one everyday analogy.
- Do not over-polish into a textbook. The charm is that the physics moves when VA drags a control.

## Morning demo script

1. Start with hydrostatics: drag depth from 0 to 10 m; point out linear pressure arrows.
2. Move to viscosity: reduce gap and watch shear stress jump.
3. Hydraulic jump: lower velocity until Fr falls below 1; the jump warning flips.
4. Internal flow: increase pipe speed; Re and pressure loss climb fast.
5. External flow: switch shape from streamlined to blunt; same speed/area, different drag.
6. Fluid Machinery Studio: raise rpm and pitch, then point out thrust/power growth, efficiency limits, and warnings.

If VA only has 90 seconds, show hydrostatics + external flow. They are the clearest “see it immediately” cards.
