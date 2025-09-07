# Testimonials Setup Guide

## Overview
The testimonials section on the About page is now dynamic and pulls data from Sanity CMS. This allows you to easily add, edit, and manage testimonials without touching the code.

## Sanity Schema
The testimonial schema includes:
- **Name**: Person's name
- **Location**: Where they're from (optional)
- **Quote**: The testimonial text
- **Category**: Type of person (reader, journalist, academic, etc.)
- **Rating**: 1-5 star rating (optional)
- **Featured**: Whether to show prominently
- **Published At**: When it was published

## Categories
- `reader` - General readers
- `journalist` - Media professionals
- `academic` - Teachers, researchers
- `community_leader` - Local leaders
- `youth` - Young people
- `rural_voice` - Rural community members

## Adding Testimonials
1. Go to your Sanity Studio
2. Create a new "Testimonial" document
3. Fill in the required fields
4. Set "Featured" to true to show on About page
5. Publish the document

## Seeding Sample Data
To add sample testimonials, run:
```bash
cd paltan
node scripts/seedTestimonials.js
```

Make sure to:
1. Update the project ID in the script
2. Add your Sanity API token to environment variables
3. Run the script from the paltan directory

## Features
- **Dynamic loading**: Testimonials load from Sanity
- **Category icons**: Different icons for different types of people
- **Star ratings**: Visual rating display
- **Responsive design**: Works on all devices
- **Smooth animations**: Framer Motion animations
- **Fallback**: Shows message when no testimonials exist

## Customization
You can customize:
- Category icons in `TestimonialsSection.tsx`
- Category colors in the same file
- Number of testimonials shown (currently 6)
- Query filters in `queries.ts`
