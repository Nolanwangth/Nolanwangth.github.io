# Tianhong Wang · Personal Website

A bilingual portfolio for Tianhong Wang (Nolan), hosted at https://nolanwangth.github.io/.

The page introduces robotics, artificial intelligence, and enterprise systems before presenting six selected projects as names and keywords. Each direction links to its own page with related projects and keywords. Education, KA-RaceIng experience, and two email contacts follow.

## Preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/. No dependencies or build step are required.

## Editing

- `index.html`: homepage structure, links, and English fallback content
- `robotics.html`, `ai.html`, `systems.html`: independent direction pages
- `content.js`: English and Chinese copy, including accessible labels; keep English copy aligned with the HTML fallback
- `style.css`: complete dark and light palettes, responsive layout, and CSS motion
- `preferences.js`: restore the saved theme before the stylesheet loads
- `script.js`: theme/language controls, local preference storage, scroll reveals, and the animated canvas
- `assets/tianhong-wang.jpg`: owner-supplied portrait, displayed at its original aspect ratio

The page defaults to dark mode and English. Theme and language preferences are stored locally when browser storage is available. Motion respects the system's reduced-motion setting and can be paused from the opening section.

GitHub Pages publishes the `main` branch from the repository root after a push. Local commits alone do not publish changes.

The portrait and personal content are supplied for this portfolio; no blanket reuse license is granted for those assets. OpenVLA is labeled as a reproduction project.
