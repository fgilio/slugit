# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

slugit is a URL-based slug generator PWA. Input a string via URL path (e.g., `slugit.dev/Hello World`) and get the slugified output (`hello-world`). Works offline via Service Worker.

## Architecture

- **Frontend**: Single `index.html` with inline CSS/JS, no build step
- **API**: Vercel serverless function at `api/index.js`
- **PWA**: Service Worker (`service-worker.js`) caches static assets for offline use

The `slugify` function is duplicated in both `index.html` and `api/index.js` - keep them in sync when modifying.

## Development

No local dev server configured - deploy to Vercel or serve files statically. The `now.json` configures Vercel deployment with routing.

## Deployment

Deployed to Vercel (slugit.dev). Push to master triggers deployment.

```bash
vercel          # Preview deployment
vercel --prod   # Production deployment
```

## Key Files

- `index.html` - Entire frontend (HTML, CSS, JS inline)
- `api/index.js` - Serverless slug API endpoint
- `service-worker.js` - PWA caching (update `staticAssetsCacheName` version when changing cached assets)
- `now.json` - Vercel config and routing
