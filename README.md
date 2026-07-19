<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2E0000,100:800000&height=180&section=header&text=Scroll%20Kill&fontSize=50&fontColor=ffffff&fontFamily=Lexend&animation=fadeIn&fontAlignY=38" width="100%" alt="Scroll Kill banner"/>

<!-- Extension icon -->
<img src="./assets/icon.png" width="96" height="96" alt="Scroll Kill icon"/>

### Kill the reels. Keep the feed.

A tiny Chrome extension that strips Instagram Reels out of your feed, so scrolling stays scrolling instead of a two-hour black hole.

<br/>

![CI](https://github.com/akimov-256/Scroll-Kill/actions/workflows/ci.yml/badge.svg)
![Latest Release](https://img.shields.io/github/v/release/akimov-256/Scroll-Kill?label=release&color=blue)
![Manifest Version](https://img.shields.io/badge/manifest-v3-informational)
![Platform](https://img.shields.io/badge/platform-Chrome-yellow?logo=googlechrome&logoColor=white)
![Last Commit](https://img.shields.io/github/last-commit/akimov-256/Scroll-Kill)
![Repo Size](https://img.shields.io/github/repo-size/akimov-256/Scroll-Kill)

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.gif" width="100%" height="4px"/>

</div>

## What it does

Instagram buries Reels into every feed, every explore tab, every corner it can. Scroll Kill watches the page as you scroll and quietly hides any Reel it finds — no ads to click through, no settings buried three menus deep, just a switch.

- 🚫 Hides Reels from your main feed in real time
- ⚡ Lightweight — a single `MutationObserver`, no polling, no bloat
- 🎛️ One-click toggle from the toolbar popup
- 🔒 Zero permissions requested beyond running on Instagram

## Installation

Not on the Chrome Web Store yet, so it's a manual load for now:

1. Download the latest release zip from the [Releases page](../../releases), or clone this repo
2. Open `chrome://extensions` in Chrome
3. Turn on **Developer mode** (top right)
4. Click **Load unpacked** and select the extension folder
5. Pin it to your toolbar and flip the switch

## How it works

`contentScript.js` runs on any Instagram page and watches the DOM for changes. Every time new content loads in — which on Instagram is constantly — it scans for links pointing to `/reel/` and hides them before you get a chance to fall into one.

```js
document.querySelectorAll('a[href*="/reel/"]:not([data-reel-hidden])')
```

That's really the whole trick. No AI, no heuristics, just a selector and a `MutationObserver` doing the boring, reliable thing.

## Development

```powershell
npm install
npm run lint
```

CI runs on every push and pull request to `main`:

| Job | What it checks |
|---|---|
| `validate-manifest` | `manifest.json` is valid, targets Manifest V3, and every referenced file actually exists |
| `lint` | ESLint over all source files |
| `package` | Builds a versioned `.zip` of the extension and uploads it as a build artifact |
| `release` | If `manifest.json`'s version was bumped, tags and publishes a GitHub Release with the zip attached |

To cut a new release, bump `"version"` in `manifest.json` and push to `main` — CI takes care of the rest.

## Contributing

Found a page layout Scroll Kill doesn't catch? Instagram changes its DOM often enough that selectors can go stale. Open an issue with the page you were on, or send a PR — `contentScript.js` is short enough to read in a minute.

<div align="center">
<br/>
  
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2E0000,100:800000&height=100&section=footer" width="100%"/>

</div>
