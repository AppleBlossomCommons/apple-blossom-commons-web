# Apple Blossom Commons Website: Claude Code handoff pack

This folder is the starting point for building the Apple Blossom Commons website in Claude Code. It carries everything decided so far in the Cowork research project: the brief, the approved sitemap, content rules, the design direction, the 3D district model and the build plan.

Claude Code can't see the Cowork project, its documents or its memory. **This folder is how it learns the project.**

## What's inside

| Path | What it is |
|---|---|
| `CLAUDE.md` | The standing brief. Claude Code reads it automatically at the start of every session |
| `docs/` | Nine short reference documents (brief, sitemap, content tiers, design, 3D model, tour, partners, build plan, open items) |
| `data/districts.json` | Facts for the ten districts (one source for every page) |
| `data/district-geometry-v1.json` | District outlines for the 2D map and the 3D model |
| `reference/3d-district-model-prototype.html` | The working 3D prototype. Open it in a browser to see it |
| `reference/districts-sheet-greyscale.jpg` | The masterplan base image used under the 3D model |
| `.claude/skills/` | Three design skills that load automatically in this folder: emil-design-eng, web-design-guidelines, r3f-best-practices |

## How to use it in Claude Code

### 1. Put the folder on your computer

1. Unzip `abc-website-handoff.zip`.
2. Move the unzipped folder somewhere permanent, for example `Documents/apple-blossom-commons-web`. This folder becomes the website project.

### 2. Open it in Claude Code

- **Claude desktop app:** open the **Code** tab, start a new session, and choose the `apple-blossom-commons-web` folder as the project folder.
- **Or a terminal:** `cd ~/Documents/apple-blossom-commons-web`, then run `claude`.

Claude Code reads `CLAUDE.md` on its own, so you don't need to paste anything.

### 3. Install the two design plugins (one time)

In the Claude Code message box, type each line and follow the prompts:

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
/plugin
```

The last command opens the plugin browser. Choose **Discover**, find **Impeccable** and install it. After installing, type `/impeccable init`.

### 4. Send the kickoff message

Copy this into Claude Code as your first message:

> Read CLAUDE.md and every file in docs/. Then give me a short summary of what you understand the project to be, list anything that's unclear or contradictory, and propose how you'd do Phase 0 from docs/08-build-plan.md, step by step, explaining each tool in plain language. Don't install or create anything until I approve the plan.

Claude Code will play the brief back, raise questions, and propose Phase 0. Approve it, and it will set up the Next.js app in this folder and show you the site running on your computer.

### 5. Work one phase at a time

Follow `docs/08-build-plan.md`. For each piece, ask Claude Code to propose the approach, approve it, let it build, and look at the result in your browser. Good habits:

- Start each new session with: *"Read CLAUDE.md and docs/08-build-plan.md, tell me where we left off, and what's next."*
- Before calling a page done: *"Run the web-design-guidelines review on this page"* or *"/impeccable audit"*.
- If something in `docs/` is out of date, ask Claude Code to update the doc in the same change.

## Keeping Cowork and Claude Code in sync

- **Research and content decisions stay in Cowork** (the Apple Blossom Commons project). Code stays in Claude Code.
- When a fact changes in Cowork (for example, the hotel key count is resolved), ask Cowork for an updated `docs/` file or `data/districts.json`, drop it into this folder, and tell Claude Code what changed.
- When the site makes a decision Cowork should know about (for example, the video host is chosen), tell Cowork so the project record stays current.

## The Virtual Site Tour code

The tour app isn't in this pack. Download the code files (not the videos) from Google Drive → "ABC Virtual Site Tour" into `reference/virtual-site-tour/` before Phase 3. `docs/06-virtual-site-tour.md` explains the rest.

*Pack prepared Oct 16, 2026.*
