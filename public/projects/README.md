# Project images

One folder per project, named after its `slug` in `src/data/projects.ts`:

```
public/projects/loumari-parfum/
  cover.webp      portfolio card and top of the case study
  desktop.webp    gallery, desktop view
  mobile.webp     gallery, mobile view
```

WebP, 1600 px wide. Screenshots around 2:1 are cropped from the top into a
16/10 frame.

Files are picked up at build time. Without `cover.webp` a typographic plate
takes the same space. `npm run validate` rejects any other filename and flags a
folder that matches no project.
