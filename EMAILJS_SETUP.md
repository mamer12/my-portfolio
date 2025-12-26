# EmailJS Setup Guide

## Steps to Configure EmailJS

### 1. Create EmailJS Account
- Go to [https://www.emailjs.com](https://www.emailjs.com)
- Sign up for a free account (100 emails/month)

### 2. Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the authentication steps
5. Copy your **Service ID**

### 3. Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Portfolio Contact from {{from_name}}

From: {{from_name}}
Email: {{reply_to}}

Message:
{{message}}
```

4. Save and copy your **Template ID**

### 4. Get Public Key
1. Go to **Account** > **General**
2. Find your **Public Key** (also called User ID)
3. Copy it

### 5. Configure Environment Variables
1. Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

2. Replace the placeholder values with your actual credentials

### 6. Restart Development Server
```bash
npm run dev
```

## Testing
1. Go to your contact section
2. Click "Send me a message"
3. Fill out the form
4. Click "Send it over"
5. Check your email for the message

## Troubleshooting

### "Failed to send message"
- Verify all environment variables are set correctly
- Check that your EmailJS service is active
- Ensure template ID matches your template
- Check browser console for detailed errors

### Not receiving emails
- Check spam folder
- Verify email service connection in EmailJS dashboard
- Test the template directly in EmailJS dashboard

### Rate limits
- Free tier: 100 emails/month
- Upgrade if needed at EmailJS dashboard
