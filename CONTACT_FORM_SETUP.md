# Contact Form Setup Guide

This document explains how to set up the contact form functionality with email sending capabilities.

## Environment Variables Setup

Create or update your `.env.local` file in the root of the project with the following variables:

```env
# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_app_password

# Recipient Email
TO_EMAIL=ccagency.mn@gmail.com

# Site Name (Optional)
SITE_NAME=CCAgency
```

### Gmail Specific Setup

If you're using Gmail as your SMTP provider:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to your Google Account settings
   - Navigate to Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
   - Use this password as your `SMTP_PASS`

### Using a Different SMTP Provider

If you're using a different email provider, update the SMTP settings accordingly:

- **SendGrid**: `SMTP_HOST=smtp.sendgrid.net`, `SMTP_PORT=587`, `SMTP_SECURE=false`
- **Outlook/Hotmail**: `SMTP_HOST=smtp-mail.outlook.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`
- **Yahoo**: `SMTP_HOST=smtp.mail.yahoo.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`

## Testing the Contact Form

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to any page that includes the ContactForm component

3. Fill out the form with:
   - Name: Your name
   - Email: A valid email address
   - Phone: Your phone number
   - Message: A test message

4. Click "문의 보내기" (Send Inquiry)

5. Check the console for any errors and verify that the email was sent successfully

## API Endpoint

The contact form submits to `/api/contact` which handles:

- Rate limiting (5 requests per minute per IP)
- Form validation
- Email sending via Nodemailer
- Success/error response handling

## Frontend Component

The [ContactForm](../src/components/ContactForm.tsx) component handles:

- Form state management
- Client-side validation
- API communication
- User feedback (success/error messages)