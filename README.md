# Wang Tianhong · Personal Website

A bilingual portfolio for 王天虹 / Wang Tianhong, known as Nolan, hosted at https://nolanwangth.github.io/.

The homepage introduces three directions, then education, experience and collaboration, and contact details. Each direction links to its own page with related projects and keywords; project lists do not repeat on the homepage. The experience and collaboration section lists KA-RaceIng (Season 2024), AUO, Dongfeng Yueda Kia, KEYENCE, and XCMG without role descriptions. Associations are supplied by the owner and encompass collaboration, internships, and employment.

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

## Experience marks

All five marks are transparent SVGs sourced from the organizations' official websites. Their original geometry is preserved; CSS displays them in monochrome for consistent contrast in each theme. No background extraction or AI redrawing is needed.

- KA-RaceIng: [official site](https://www.ka-raceing.de/), [SVG](https://www.ka-raceing.de/assets/karaceinglogo.svg).
- AUO: [official site](https://auo.com/), [SVG](https://auo.com/template/images/common/auo-logo.svg).
- Kia: [official brand page](https://worldwide.kia.com/en/brand/our-brand/brand-elements/brand-logo-story), black RGB SVG from its [official logo download](https://worldwide.kia.com/asset/image/brand/our-brand/brand-elements/brand-logo-story/KiaBrandLogo.zip). Listed as Dongfeng Yueda Kia to match the owner's historical experience.
- KEYENCE: [official site](https://www.keyence.com/), [SVG](https://www.keyence.com/img/core/logo_header_01.svg).
- XCMG: [official site](https://www.xcmgglobal.com/), [SVG](https://www.xcmgglobal.com/resources/web/img/logo.svg).

These marks identify the owner's experience and do not represent an endorsement.
