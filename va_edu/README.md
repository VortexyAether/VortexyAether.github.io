# VA Fluid Lab Night

Two concrete overnight deliverables:

1. **VA Fluid Lab** — a no-dependency static educational page for fluid mechanics.
2. **Fluid Machinery Studio** — a browser-based preliminary design GUI for open-source fluid machinery sizing intuition.

## Run the fluid education site

```bash
cd /Users/va/.openclaw/workspace/va-fluid-lab-night
python3 -m http.server 8765
```

Open: <http://localhost:8765>

You can also open `index.html` directly in a browser.

## What the site covers

- Hydrostatics / hydraulic statics: pressure grows with depth, `p = p0 + rho g h`
- Hydrostatics add-on: piezometer/manometer head visualization and common misconception note
- Viscosity: Couette and Poiseuille profiles, `tau = mu du/dy`
- Hydraulic jump: Froude number and sequent depth relation
- Internal flow: Reynolds number, laminar/turbulent regimes, roughness-aware pipe pressure loss estimate
- External flow: drag equation, shape/Cd intuition, wake/separation picture, external-flow Reynolds estimate
- Korean-first learning path, misconception notes, and mini check questions
- Fluid Machinery Studio: chord, pitch, radius, rpm, flow speed, and blade count inputs with thrust, torque, power, efficiency, warnings, and rpm sweep curves

Everything is local HTML/CSS/JS. No build step, no npm, no network.

## Use Fluid Machinery Studio

Open the site and jump to `Fluid Machinery Studio`.

The studio is not a CFD solver and does not run an OpenFOAM workflow. It is an educational/preliminary design calculator using simple 1D/BEM/meanline/similarity-law style estimates to build performance intuition.

Archived side experiment: `tools/drone-cfd-scout/` remains in the repo as old generated work, but it is not the main morning deliverable.
