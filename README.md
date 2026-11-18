# Kinetic House

A demo website for a fictional small-group fitness studio, built by [MyClickAid](https://myclickaid.com) for its portfolio gallery.

**Live demo:** https://kinetic-house-demo.derin-obasa.workers.dev/

> **A fictional gym.** Kinetic House, its coaches, classes, prices and reviews are made up for this demo. Nothing is actually booked and no form sends any data.

## What it shows

- **Home page:** a bold animated hero with a "live today" panel, a scrolling ticker, animated stats, a class-size comparison, hover-to-open program lanes, coach cards, membership plans, a photo wall, member notes and a bring-a-friend block.
- **Live class status:** the hero shows the classes that are on now or next, with spots left, based on the weekly schedule and the visitor's local time.
- **Schedule:** a weekly timetable with class capacity dots and effort levels, filtered by day and by type of training (strength, conditioning, mobility, boxing, open gym).
- **Free trial booking:** pick a class with spots left, get a demo booking code and download a calendar file (.ics).
- **Membership:** drop-in, 3x a week and unlimited plans, with a plan calculator to compare them.
- **About:** the coaches, the studio and an FAQ.
- **Details:** an open-now badge, scroll animations, reduced-motion support and keyboard-friendly menus.

## Built with

- [Next.js](https://nextjs.org/) (App Router, JavaScript, static export)
- [Tailwind CSS](https://tailwindcss.com/) v4
- Fonts: Bebas Neue and Inter, self-hosted with `@fontsource`
- Hosted on Cloudflare

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To create the production build (a static site in the `out` folder):

```bash
npm run build
```

## Project structure

```
app/
  _components/   Header, Footer, LiveToday, ScheduleClient, TrialForm, PlanCards, PlanCalculator, CoachCards, ...
  _lib/          data.js, schedule.js, pictures.js
  _styles/       globals.css
  schedule/  trial/  membership/  about/
public/          Photos (.webp)
```

## Photos

Photos are optional. Every slot works as a placeholder until you add an image. Put the files in `public/` and register them in `app/_lib/pictures.js`.

| Slot                   | File                                                                | Size                   |
| ---------------------- | ------------------------------------------------------------------- | ---------------------- |
| Hero background        | `kh-hero.webp`                                                      | 2400 × 1350, landscape |
| Programs               | `kh-program-strength.webp`, `-conditioning`, `-mobility`, `-boxing` | 1200 × 1500, portrait  |
| Coaches                | `kh-coach-cole.webp`, `-priya`, `-aisha`, `-marcus`                 | 1200 × 1500, portrait  |
| Photo wall, large tile | `kh-floor-1.webp`                                                   | 1600 × 1600, square    |
| Photo wall             | `kh-floor-2.webp` to `kh-floor-5.webp`                              | 1200 × 1200, square    |
| Photo wall, wide       | `kh-floor-6.webp`                                                   | 1800 × 900, wide       |
| Bring a friend         | `kh-friend.webp`                                                    | 1600 × 1000, landscape |

## Deployment

The site is a static export (`output: "export"` in `next.config.mjs`) and deploys to Cloudflare from this repository. Every push to the main branch rebuilds and redeploys it.

## About MyClickAid

MyClickAid is a bespoke web design studio. This site is one of several demo projects that show what a custom-designed website can look like for different kinds of businesses.
