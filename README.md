# xaviers.website

My site. Dark background, green highlights, tries to fit on one screen on desktop.

**Live:** [xaviers.website](https://xaviers.website)

## What's here

- profile (photo or letter — you can switch in config)
- short intro + a few tags
- high school / subjects
- github + email links
- where I am + Perth time
- minecraft server with a copy button
- a notes blurb (not a todo list or "what I'm working on")

Card hover stuff, nothing crazy. Respects reduced motion if your OS does.

## Tech

Vite + React + Lucide icons. Static files only — hosted on GitHub Pages. All the text/links live in `src/config/site.js`. Pushing to `main` runs the deploy workflow.

```bash
npm install
npm run dev
```

[http://localhost:5173](http://localhost:5173) — `npm run build` spits out `dist/` if you want to check the production bundle.

## License

Public repo for reference. Don't clone the whole thing and ship it as yours without asking.
