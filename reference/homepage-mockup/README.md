# Homepage mockup: the approved visual target

Approved by the client on Oct 16, 2026. Build the homepage to match it.

## Files

| File | What it is |
| --- | --- |
| `homepage-desktop.png` | The approved desktop design at 1440 px. The visual target. |
| `homepage-phone.png` | The approved phone design at 390 px. The visual target. |
| `homepage-desktop.html`, `homepage-phone.html` | Static HTML of the same designs. Use them for exact sizes, colors, spacing and copy. Not production code: no components, inline styles only. |
| `images/model-3d-home.jpg`, `images/model-3d-wine-selected.jpg` | Stills of the 3D district model. Placeholders for the live 3D explorer. |
| `fix-brief.md` | Earlier fixes for the district map: orientation, base image, 3D port, navigation. Still applies. Where it and this README differ, this README wins. |

## Rules

1. **Copy is approved.** Use the text in the mockup word for word. Take district names, colors and facts from `data/districts.json`. If anything there differs from the mockup, tell me which; don't silently pick one.
2. **The district explorer is live, not an image.** The dark "District explorer" band (3D view, toolbar, district card, district list) is the React Three Fiber port described in `fix-brief.md`, Fix 3. Selecting a district in the list or on the model updates the card. Until the 3D component is ready, show the 2D map (Fix 1 and 2) in that frame, never the JPG stills.
3. **Navigation.** Desktop: wordmark · The Plan · Districts · Site Tour · Connected Community · About (dropdown: Chelan & the Region, Stewardship, Planning Framework, Research Library) · Partner with Us button. Header 64 px, one line. Below 1,100 px: wordmark plus a menu button that opens a full-screen panel, as in the phone mockup. No link text may wrap.
4. **Interim logo.** The five-petal outline SVG next to the wordmark is in the HTML. Make it one `Logo` component so a real logo can replace it later in one place.
5. **Placeholders stay visible.** "[SOURCE TO CONFIRM]" on the ~160 acres fact and the "[TOUR VIDEO STILL]" box are deliberate. Keep them as clearly marked placeholders; don't invent a source or an image.
6. **Source chips.** Every figure carries its small mono chip (source · date · confidence). Make this one reusable `SourceChip` component.
7. **Migration chart.** Bars to scale from the data: King County −10.50%, Chelan County +11.95% (net migration, ages 65–69, 2010–2020, UW–Madison Applied Population Lab, Moderate). Keep the caveat sentence. Build it as a component that reads its numbers from a data file, not hard-coded widths.
8. **Design tokens.** Paper #F5F3ED, surface #FBFAF6, surface-2 #EFECE4, ink #1D2621, ink-2 #4A5650, ink-3 #646E68, rule #DCD8CD, Orchard Green #2F5D46, Basalt #22372C, Basalt-2 #2B4436, on-basalt #F5F3ED / #B9C4BC, Harvest Amber #E0AE4F (on dark) / #B5791C marks / #8F5E12 text, Lake #3E6E8E. Fonts: Source Serif 4 (headlines), Inter (UI and body), IBM Plex Mono (labels, sources) via `next/font`. These match `docs/04-design-direction.md`.
9. **No hidden content.** Nothing starts at opacity 0 or waits for a scroll animation. The page must read fully with JavaScript off, except the 3D view.
10. **Light theme first.** The mockup is the light theme. A dark theme is optional and comes later; don't let the operating system's dark mode switch the site to a design nobody has approved.
