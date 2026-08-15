# (#!/bin/bash

# ============================================================
# SAB VENTURES - Complete GitHub Deployment Script
# ============================================================
# This script will:
# 1. Initialize git repository (if not already)
# 2. Add all files
# 3. Commit with a timestamp message
# 4. Create GitHub repo via API (optional)
# 5. Push to GitHub
# ============================================================

# ---------- CONFIGURATION ----------
GITHUB_USERNAME="acquayeisaacmcdonald-bit"
REPO_NAME="sab-ventures-website"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
BRANCH="main"
ADMIN_PASSWORD="sabventures2026"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================================${NC}"
echo -e "${BLUE}  🛍️  SAB VENTURES - GitHub Deployment Script${NC}"
echo -e "${BLUE}============================================================${NC}"
echo ""

# ---------- CHECK IF GIT IS INSTALLED ----------
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install Git first:${NC}"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

echo -e "${GREEN}✅ Git is installed.${NC}"
echo ""

# ---------- CHECK IF GITHUB CLI IS INSTALLED (optional) ----------
if command -v gh &> /dev/null; then
    echo -e "${GREEN}✅ GitHub CLI (gh) is installed.${NC}"
    GH_AVAILABLE=true
else
    echo -e "${YELLOW}⚠️  GitHub CLI (gh) not installed.${NC}"
    echo "   If you want to create the repo automatically, install it:"
    echo "   https://cli.github.com/"
    GH_AVAILABLE=false
fi
echo ""

# ---------- CHECK IF GIT IS INITIALIZED ----------
if [ -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git is already initialized.${NC}"
    echo "   Do you want to reinitialize? (y/n)"
    read -r REINIT
    if [[ "$REINIT" =~ ^[Yy]$ ]]; then
        rm -rf .git
        echo -e "${GREEN}✅ Removed old .git folder.${NC}"
        git init
        echo -e "${GREEN}✅ Git reinitialized.${NC}"
    else
        echo -e "${BLUE}ℹ️  Keeping existing git configuration.${NC}"
    fi
else
    echo -e "${BLUE}ℹ️  Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}✅ Git initialized.${NC}"
fi
echo ""

# ---------- CHECK REMOTE ----------
if git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}⚠️  Remote 'origin' already exists.${NC}"
    echo "   Current remote: $(git remote get-url origin)"
    echo "   Do you want to update it? (y/n)"
    read -r UPDATE_REMOTE
    if [[ "$UPDATE_REMOTE" =~ ^[Yy]$ ]]; then
        git remote set-url origin "$REPO_URL"
        echo -e "${GREEN}✅ Remote updated to: $REPO_URL${NC}"
    fi
else
    echo -e "${BLUE}ℹ️  Adding remote origin...${NC}"
    git remote add origin "$REPO_URL"
    echo -e "${GREEN}✅ Remote added: $REPO_URL${NC}"
fi
echo ""

# ---------- CREATE GITHUB REPO (via API if gh is available) ----------
if [ "$GH_AVAILABLE" = true ] && gh auth status &> /dev/null; then
    echo -e "${BLUE}ℹ️  Creating GitHub repository...${NC}"
    if gh repo view "$GITHUB_USERNAME/$REPO_NAME" &> /dev/null; then
        echo -e "${YELLOW}⚠️  Repository already exists: $REPO_NAME${NC}"
    else
        gh repo create "$REPO_NAME" --public --description "SAB Ventures - Wholesale & Retail Website" --source=. --remote=origin --push
        echo -e "${GREEN}✅ Repository created: $REPO_URL${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping automatic repo creation.${NC}"
    echo "   Please create the repository manually at:"
    echo "   https://github.com/new"
    echo "   Repository name: $REPO_NAME"
    echo ""
    echo -e "${BLUE}ℹ️  Press ENTER when the repo is created...${NC}"
    read -r
fi
echo ""

# ---------- ADD FILES ----------
echo -e "${BLUE}ℹ️  Adding files to git...${NC}"

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo -e "${BLUE}ℹ️  Creating .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# OS files
.DS_Store
Thumbs.db

# Editor files
*.swp
*.swo
*~
.idea/
.vscode/

# Temporary files
*.tmp
*.log

# Environment files
.env
.env.local
.env.*.local

# Node modules (if any)
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
