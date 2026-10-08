# Wang Tianhong · Personal Website

A bilingual portfolio for 王天虹 / Wang Tianhong, known as Nolan, hosted at https://nolanwangth.github.io/.

The homepage introduces three directions, then education, engineering experience, and contact details. Each direction links to its own page with related projects and keywords; project lists do not repeat on the homepage. KA-RaceIng is listed separately from education as engineering experience from Season 2024.

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
- `assets/tianhong-wang.jpg`: unchanged owner-supplied portrait, displayed at its original aspect ratio through a transparent CSS alpha mask
- `assets/portrait-mask.svg`: self-contained alpha mask extracted with built-in imagegen, with a small inward edge adjustment to remove white JPEG fringe; only its transparency is used. The visible face, hair, clothing, and color pixels come from the original JPEG. A muted CSS backdrop changes with the theme.
- `assets/portrait-edit.json`: background extraction prompt and rendering provenance
- `assets/direction-robotics-cutout.webp`, `assets/direction-ai-cutout.webp`, `assets/direction-systems-cutout.webp`: transparent conceptual artwork for the three homepage directions, with CSS lighting adapted to each theme; project rows remain text only
- `assets/artwork-prompts.json`: prompts used with the built-in imagegen tool; website images are optimized as WebP

The page defaults to dark mode and English. Theme, language, and animation pause preferences are stored locally when browser storage is available and carry across the direction pages. Motion respects the system's reduced-motion setting and can be paused on every page.

GitHub Pages publishes the `main` branch from the repository root after a push. Local commits alone do not publish changes.

The portrait and personal content are supplied for this portfolio; no blanket reuse license is granted for those assets. OpenVLA is labeled as a reproduction project.

## University marks

Small university marks identify education entries. Sources:

- Westlake University: [official English website](https://en.westlake.edu.cn/), using its public [color logo](https://en.westlake.edu.cn/images/header_icon_color.png).
- KIT: SVG mark from the [official homepage](https://www.kit.edu/).
- CUMT: current emblem from the [official university museum article](https://bwg.cumt.edu.cn/info/1059/3195.htm), [image](https://bwg.cumt.edu.cn/__local/6/29/E6/6FF4AEE7D0735B21C08EB1C26EF_51041430_11D2F.jpg).

University marks are attributed to their institutions. KA-RaceIng links to its general homepage; Season 2024 refers to Nolan's experience, rather than the current team roster.

School marks sit directly on the page background. The KIT dark variant preserves the original SVG geometry and green accent with light lettering; the CUMT mark is clipped to its circular outline.

## Names

Chinese: 王天虹. Pinyin: Wang Tianhong. English name: Nolan. The website retains its original `nolan.` wordmark.
