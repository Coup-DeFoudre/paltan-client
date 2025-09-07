# Contact Form Email Setup Guide

## Overview
The contact form now sends real emails to your inbox! Just like the readers submission form, you can configure the email settings from Sanity Studio.

## Quick Setup (5 minutes)

### Step 1: Go to Sanity Studio
1. Open your Sanity Studio
2. Look for **"Contact Form Settings"** in the sidebar
3. Create a new document

### Step 2: Configure Email Settings
Fill in these fields:

#### Basic Settings:
- **Recipient Email**: `your-email@example.com` (where you want to receive contact form emails)
- **Enable Contact Form**: ✅ Yes

#### Email Service (Choose One):

**Option A: Gmail/SMTP (Recommended for beginners)**
- **Email Service**: `Nodemailer (SMTP)`
- **SMTP Host**: `smtp.gmail.com`
- **SMTP Port**: `587`
- **Use SSL**: ✅ Yes
- **SMTP Username**: `your-gmail@gmail.com`
- **SMTP Password**: `your-app-password` (not your regular password!)

**Option B: SendGrid (Professional)**
- **Email Service**: `SendGrid`
- **SendGrid API Key**: `your-sendgrid-api-key`

**Option C: Resend (Modern)**
- **Email Service**: `Resend`
- **Resend API Key**: `your-resend-api-key`

### Step 3: Gmail App Password (if using Gmail)
1. Go to Google Account settings
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate password for "Mail"
5. Use this password (not your regular Gmail password)

### Step 4: Test the Form
1. Go to `/contact` on your website
2. Fill out the form
3. Click "Send Message"
4. Check your email inbox!

## Email Template
The emails will look professional with:
- Hindi headers and labels
- Contact information clearly displayed
- Formatted message content
- Source identification

## Troubleshooting

### Common Issues:
1. **"Email settings not configured"** → Check Sanity Studio settings
2. **"Contact form not available"** → Enable the form in Sanity
3. **SMTP authentication failed** → Check Gmail app password
4. **API key invalid** → Verify SendGrid/Resend API key

### Debug Steps:
1. Check browser console for errors
2. Check server logs for email service errors
3. Verify Sanity settings are saved
4. Test with different email services

## Security Notes
- Never commit API keys to code
- Use environment variables for production
- Gmail app passwords are safer than regular passwords
- Consider rate limiting for production use

## Done! 🎉
Your contact form now sends real emails just like the readers submission form!
