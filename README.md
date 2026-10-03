Nick Waggoner's personal website, built with Next.js App Router and Tailwind CSS.
The homepage uses the dark Sweetie 16 Night Notebook design.

## Updating the homepage

Edit `src/data/portfolio.js` to update the introduction, social links, projects,
YouTube uploads, and writing. Cards are rendered by shared components in
`src/components/portfolio`. The page and notebook styles live in
`src/app/page.js` and `src/app/notebook.module.css`.

The header occupies the notebook's taller blank top margin. Its underline is
the first horizontal paper rule, with subsequent rules spanning the full
viewport every 32px. The red line continues through the header and the entire
page. The red margin sits 200px
from the left on desktop screens at least 1280px wide and moves near the edge
on smaller screens. Content stays to its right. Adjust `--rule-spacing`,
`--rule-color`, `--margin-color`, and `--paper-margin` in the notebook stylesheet
to tune the paper without changing content or adding image assets.

- Add a project object with a unique `id`, title, description, category, status,
  and `links: [{ label, href }]`. Set `featured: true` on the lead project only.
- Put cover images in `public/images/projects` and set `image` to their public
  path, with useful `imageAlt` text. Without an image, cards show a decorative
  notebook illustration or their title. RPP uses a gameplay poster and video;
  Polygon Drifter uses a gameplay screenshot.
- For RPP footage, put a short silent MP4 in `public/videos`, set `previewVideo`
  to its public path, and set `image` to a poster still. The video autoplays muted
  and loops, with native pause controls. Visitors who prefer reduced motion
  start on the poster and can play manually. If autoplay is blocked, the same
  controls remain available. The native download option is hidden where the
  browser supports `controlsList="nodownload"`; this does not prevent copying
  public media. Keep essential information in card text.
  The current five-second highlight is a silent H.264 MP4 at 1280x720 with
  fast-start metadata, reduced from the 23.5 MB source to about 1.9 MB. Its
  poster is `public/images/projects/rock-paper-planes-poster.jpg`.
- Add Steam, repository, trailer, or other destinations to a project's `links`
  array when those pages are available. No layout changes are needed.
- Keep `videos` ordered newest first. The homepage displays the first three.
  This is a curated list, not a live YouTube or LinkedIn API integration. Use
  `https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg` for a YouTube thumbnail, or a
  local public image path. No embedded player loads on page view.
- Writing entries need only a title, description, and link. No blog route or
  publishing system is required.
- Use LinkedIn for contact. Do not add email addresses, `mailto:` links, or
  email contact forms to the page, metadata, or public content data.

Parried's cover is from its published itch.io page and the project is credited
as a collaboration with Glacier15. Keep that credit when editing the card.

## Brand assets

The Paper Plane header mark is `public/icons/paper-plane.svg`. The browser icon
uses the same geometry on a dark rounded background for contrast in both light
and dark browser tabs. `src/app/layout.js` declares SVG/PNG and Apple touch icons;
`src/app/favicon.ico` contains 16px, 32px, and 48px versions.

After editing the SVG, regenerate the raster and ICO assets with
`node scripts/generate-brand-icons.mjs`. This uses the existing Sharp dependency
provided by Next.js. `public/icons/paper-plane.png` is a transparent 512px export
for reuse. The previous N asset is retained but is no longer linked by the page.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The development server updates as you edit `src/app/page.js` and its components.

This project uses `next/font` to self-host Space Grotesk and the homepage's
Caveat handwriting font. Production builds need access to Google Fonts.

## Dependency maintenance

Use Node 22 and `npm ci` to reproduce the locked dependency tree. Run
`npm run verify` for the full dependency audit (including development packages),
dependency tree validation, lint, production build, and HTTP smoke checks.
The audit explicitly requests online advisories; an unavailable registry is a
failed check, not evidence of a clean tree.

The same checks run on pull requests and selected branch pushes. Follow the
audit, trace, remove or update, and re-audit loop in
[DEPENDENCY_UPLIFT.md](./DEPENDENCY_UPLIFT.md) when findings change.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
