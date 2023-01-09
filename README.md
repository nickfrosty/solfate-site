# Solfate Website

## Local Development

> Note: This site is meant to deployed as a static site.

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

Generate a full static, production version of the site. Including refreshing the podcast RSS feed:

```bash
yarn generate
```

## Solfate Podcast

The [Solfate Podcast](https://solfate.com/podcast) is hosted here in this repo and publicly available via the RSS feed at https://solfate.com/podcast/rss.xml (thanks to the good ole' open standards of RSS 😀)

- each episode is a markdown file located in the `content/podcast/episodes` directory
- each file is named with the `int` count of the episode number
- the RSS feed is generated at build time from these markdown files
  - via the `scripts/generatePodcastRss.js` file, and
  - the `yarn podcast:rss` script
- the generated RSS feed is output to `public/podcast/rss.xml` (which is git ignored to support generating at build time)
