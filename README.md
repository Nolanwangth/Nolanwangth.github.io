# Tianhong Wang · Personal Website

An English-language personal portfolio for Tianhong Wang (Nolan), hosted at https://nolanwangth.github.io/.

## Content

- Current PhD profile and portrait
- Selected robotics, language model, and local-first AI projects
- 11 public repositories across four filterable categories
- Education at Westlake University, KIT, and China University of Mining and Technology
- KA-RaceIng Formula Student experience: joined in 2024, Autonomous System / Velocity Estimation

## Local preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No dependencies or build step required.

## Editing

- `index.html`: profile, education, experience, and selected projects
- `style.css`: responsive layout and visual styling
- `script.js`: category filtering and user-controlled demo playback
- `projects.json`: project catalog; run `python3 scripts/render_projects.py` after edits
- `assets/tianhong-wang.jpg`: owner-supplied portrait

The project catalog is a curated snapshot, not a live GitHub API feed. Changing repository metadata does not automatically rewrite the website. GitHub Pages publishes the `main` branch from the repository root after each push.

## Sources and attribution

Education and personal background were supplied by the site owner. Project summaries are based on public GitHub READMEs as of October 8, 2026. Reproductions, research adaptations, and forks are identified rather than represented as original upstream models.

- GitHub: https://github.com/Nolanwangth
- Westlake AI department: https://en-soe.westlake.edu.cn/OurSchool/departmentcenter/departmentAI/
- KIT: https://www.kit.edu/english/
- CUMT: https://www.cumt.edu.cn/
- KA-RaceIng team roster: https://www.ka-raceing.de/team.html (select Season 2024)
- OpenVLA demonstration: `resources/19--successTrue--taskpick_up_the_black_bowl_on_the_wooden_cabinet_and_p.gif` in https://github.com/Nolanwangth/openvla. The still image is its first frame. Upstream OpenVLA: https://github.com/openvla/openvla.

The portrait and personal content are provided for this portfolio; no blanket reuse license is granted for those assets.
