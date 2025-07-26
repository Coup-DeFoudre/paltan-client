# RSS Feed Feature

This directory contains the RSS Feed feature for The Paltan website. The feature allows users to browse latest news from various sources with a fallback mechanism for reliability.

## Components

- `page.tsx` - The main RSS feed page component
- `loading.tsx` - Loading state component
- `not-found.tsx` - Error state component

## Utility Functions

The RSS feed feature uses the following utility functions:

- `lib/rssFeed.ts` - Core RSS parsing functionality using fast-xml-parser
- `lib/rssFallback.ts` - Fallback mechanism to try multiple RSS sources

## Features

- Displays RSS feed items grouped by date
- Extracts and displays images from feed items when available
- Formats dates in a user-friendly manner
- Provides direct links to original content
- Auto-refreshes hourly to keep content fresh
- Fallback mechanism for reliable content delivery

## How It Works

1. The page attempts to fetch RSS data from a primary source
2. If the primary source fails, it automatically tries backup sources
3. Data is grouped by date for easier browsing
4. Images are extracted from various RSS formats (media:content, enclosure, or HTML content)
5. Error states are handled gracefully with user-friendly messages

## Configuration

To add or modify RSS sources, edit the `RSS_FEED_URLS` array in `lib/rssFallback.ts`.
