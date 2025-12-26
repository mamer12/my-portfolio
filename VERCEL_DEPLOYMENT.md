# Vercel Deployment Guide

## Step 1: Commit Your Changes to Git

```bash
# Check what files have changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Add EmailJS contact form integration"

# Push to GitHub
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Import your repository:**
   - Click "Add New" → "Project"
   - Select your `my-portfolio` repository
   - Click "Import"

3. **Configure Environment Variables:**
   Before deploying, click on "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_rzwzhri` |
   | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_59rqtm6` |
   | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `8YDFEnFQFZOMFojLI` |

   Make sure to select **"Production", "Preview", and "Development"** environments for each variable.

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete (2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# During deployment, you'll be asked to set environment variables
# Enter the values when prompted:
# - NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_rzwzhri
# - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_59rqtm6
# - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=8YDFEnFQFZOMFojLI
```

## Step 3: Add Environment Variables to Existing Project

If you've already deployed and need to add environment variables:

1. Go to your project on [vercel.com](https://vercel.com)
2. Click "Settings" → "Environment Variables"
3. Add each variable:
   - **Key**: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - **Value**: `service_rzwzhri`
   - **Environments**: Check all (Production, Preview, Development)
   - Click "Save"
4. Repeat for the other two variables
5. Go to "Deployments" tab → Click "..." on latest deployment → "Redeploy"

## Step 4: Verify Deployment

1. Visit your deployed site
2. Navigate to the Contact section
3. Test the contact form by sending yourself a message
4. Check your email at `mamer.ma1234@gmail.com`

## Troubleshooting

### Contact form not working after deployment

**Issue**: Form shows error "Failed to send message"

**Solution**: 
- Verify all 3 environment variables are set in Vercel dashboard
- Make sure variables are available in Production environment
- Redeploy after adding variables
- Check browser console for specific errors

### Environment variables not loading

**Issue**: Variables showing as `undefined`

**Solution**:
- All EmailJS variables MUST start with `NEXT_PUBLIC_` prefix
- Variables must be set before build time
- Redeploy after adding variables (they don't apply retroactively)

### Build fails

**Issue**: Deployment fails during build

**Solution**:
```bash
# Test build locally first
npm run build

# If it works locally, check Vercel build logs for specific errors
```

## Custom Domain (Optional)

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Future Updates

To update your site after making changes:

```bash
# Make your changes locally
# Test locally: npm run dev

# Commit and push
git add .
git commit -m "Your update message"
git push origin main

# Vercel will automatically deploy the changes
```

## Your Environment Variables (Keep Private)

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_rzwzhri
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_59rqtm6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=8YDFEnFQFZOMFojLI
```

⚠️ **Note**: While these are "public" keys (used in browser), don't share them publicly to avoid spam/abuse of your EmailJS account.
