# Deployment Guide - Square Grid Sales

## Step 1: Set Up GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click "Sign up"
3. Follow the steps to create your free account
4. Verify your email address

## Step 2: Create a New Repository

1. Log in to GitHub
2. Click the green "New" button (or go to https://github.com/new)
3. Repository name: `square-grid-sales` (or whatever you prefer)
4. **IMPORTANT:** Leave everything else unchecked - no README, no .gitignore, no license
5. Click "Create repository"

## Step 3: Upload Your Files to GitHub

After creating the repository, GitHub will show you commands. Open your terminal in the `square-grid-sales` folder and run these commands ONE AT A TIME:

```bash
git init
```
Press Enter. You should see "Initialized empty Git repository..."

```bash
git add .
```
Press Enter.

```bash
git commit -m "Initial commit"
```
Press Enter.

```bash
git branch -M main
```
Press Enter.

```bash
git remote add origin https://github.com/YOUR-USERNAME/square-grid-sales.git
```
**REPLACE YOUR-USERNAME with your actual GitHub username**, then press Enter.

```bash
git push -u origin main
```
Press Enter. You may need to sign in to GitHub. Follow the prompts.

## Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" (if you haven't already)
3. Choose "Continue with GitHub"
4. After signing in, click "Add New..." → "Project"
5. You'll see your GitHub repositories - select `square-grid-sales`
6. Vercel will auto-detect it's a Vite project
7. Click "Deploy"
8. Wait 1-2 minutes for the build to complete
9. You'll get a live URL like `square-grid-sales.vercel.app`

## Done!

Your site is now live! When visitors:
1. Select squares
2. Add their initials
3. Click "Pay with Venmo" or "Pay with Cash App"
4. They'll be taken to your payment app with the amount pre-filled

## Troubleshooting

**If git commands don't work:**
- You may need to install Git first: https://git-scm.com/downloads

**If GitHub asks for authentication:**
- Follow the prompts to sign in
- You may need to generate a Personal Access Token

**If deployment fails on Vercel:**
- Check that all files uploaded to GitHub correctly
- Vercel should auto-detect the framework as "Vite"
