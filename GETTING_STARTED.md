# 🚀 Getting Started - Quick Reference

## 📋 What You Need (5 minutes total)

### 1. MongoDB Database (2 minutes)
**Option A: MongoDB Atlas (Recommended)**
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up → Create FREE cluster → Get connection string
- Format: `mongodb+srv://user:pass@cluster.mongodb.net/todolist`

**Option B: Local MongoDB**
```bash
brew install mongodb-community  # macOS
brew services start mongodb-community
# Connection string: mongodb://localhost:27017/todolist
```

### 2. Google Gemini API Key (1 minute) - FREE!
- Visit: https://aistudio.google.com/app/apikey
- Sign in → Create API key → Copy it
- Starts with "AIza..."
- **No credit card required!**

### 3. NextAuth Secret (30 seconds)
```bash
openssl rand -base64 32
```
Copy the output

## ⚡ Installation (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Edit .env with your values
# DATABASE_URL="mongodb+srv://..."  # Your MongoDB connection
# NEXTAUTH_SECRET="..."             # From openssl command
# NEXTAUTH_URL="http://localhost:3000"
# GEMINI_API_KEY="AIza..."         # Your Gemini key

# 4. Generate Prisma Client
npx prisma generate

# 5. Start development server
npm run dev
```

## 🌐 Open Your Browser

Visit: http://localhost:3000

## ✅ First Steps

1. Click "Get Started Free"
2. Create an account
3. Create your first task
4. Click "Get AI Suggestions" to test AI features
5. Explore Analytics page

## 🎯 Quick Feature Test

Create these tasks to demo AI:
- "Prepare presentation for client" → AI suggests: Work, High
- "Buy milk and eggs" → AI suggests: Shopping, Medium
- "Schedule doctor appointment" → AI suggests: Health, Low

## 📁 Project Files Overview

```
Key Files:
├── app/dashboard/page.tsx       → Main todo list page
├── components/create-todo-form.tsx → Create todos with AI
├── lib/gemini.ts                → AI integration
├── app/api/todos/route.ts       → Todo API endpoints
├── prisma/schema.prisma         → Database schema
└── .env                         → Your configuration
```

## 🐛 Troubleshooting

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Cannot connect to database"
- Check DATABASE_URL in .env
- Verify MongoDB cluster is running
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0)

### "AI not working"
- Verify GEMINI_API_KEY is correct
- Check you have internet connection
- Ensure key starts with "AIza"

### "Authentication error"
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your current URL

## 📖 Full Documentation

- **README.md** - Complete feature list and tech stack
- **SETUP_GUIDE.md** - Detailed setup instructions
- **DEPLOYMENT_CHECKLIST.md** - Production deployment
- **PROJECT_SUMMARY.md** - Project overview for interview

## 🚀 Deploy to Production

See **DEPLOYMENT_CHECKLIST.md** for step-by-step Vercel deployment.

## 🎓 Interview Demo Ready?

1. ✅ App running locally
2. ✅ Can create/edit/delete todos
3. ✅ AI categorization working
4. ✅ Analytics page showing data
5. ✅ Mobile responsive

**You're ready!** Good luck! 💪

---

**Need help?** All documentation is in this directory:
- Quick setup → **This file**
- Detailed setup → **SETUP_GUIDE.md**
- Deployment → **DEPLOYMENT_CHECKLIST.md**
- Tech overview → **PROJECT_SUMMARY.md**
- User guide → **README.md**
