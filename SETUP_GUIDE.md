# 🚀 Quick Setup Guide

## Step 1: Get MongoDB Database (2 minutes)

### Option A: MongoDB Atlas (Recommended - Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a free cluster (select any region)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. It looks like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

### Option B: Local MongoDB

```bash
# Install MongoDB locally
brew install mongodb-community  # macOS
# or download from mongodb.com

# Start MongoDB
brew services start mongodb-community
```

## Step 2: Get Google Gemini API Key (1 minute)

1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Get API Key" → "Create API key"
4. Copy the key (starts with "AIza...")

**✅ This is 100% FREE - No credit card required!**

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Edit `.env` and fill in your values:

```env
# Replace with your MongoDB connection string from Step 1
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/todolist?retryWrites=true&w=majority"

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-here"

# Keep as-is for local development
NEXTAUTH_URL="http://localhost:3000"

# Replace with your Gemini API key from Step 2
GEMINI_API_KEY="AIza..."
```

## Step 4: Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and paste it as your `NEXTAUTH_SECRET` in `.env`

## Step 5: Install & Run

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

## 🎯 First Steps After Running

1. Click "Sign Up" to create an account
2. Create your first task
3. Try the AI categorization by clicking "Get AI Suggestions"
4. Check the Analytics page to see your productivity insights

## 🐛 Troubleshooting

### "Error: Invalid `prisma.user.create()`"

- Check your `DATABASE_URL` is correct
- Make sure MongoDB cluster is running
- Verify network access is allowed in MongoDB Atlas

### "AI suggestions not working"

- Verify `GEMINI_API_KEY` is set correctly
- Check the key starts with "AIza"
- Ensure you're not hitting rate limits (60 req/min)

### "NextAuth error"

- Make sure `NEXTAUTH_SECRET` is generated and set
- Check `NEXTAUTH_URL` matches your current URL

## 📦 Production Deployment to Vercel

1. Push your code to GitHub

2. Go to https://vercel.com and import your repo

3. Add these environment variables in Vercel:
   - `DATABASE_URL` - Your MongoDB Atlas connection string
   - `NEXTAUTH_SECRET` - Your generated secret
   - `NEXTAUTH_URL` - Your Vercel URL (e.g., https://your-app.vercel.app)
   - `GEMINI_API_KEY` - Your Gemini API key

4. Click "Deploy" - Done! 🚀

## 🎓 Interview Demo Tips

### Key Features to Showcase:

1. **AI Categorization**: Create a task like "Buy groceries" and watch AI suggest "Shopping" category
2. **Drag & Drop**: Show smooth reordering of tasks
3. **Analytics**: Navigate to the analytics page for productivity insights
4. **Filters**: Demo search and filter by priority/category
5. **Responsive Design**: Show mobile view
6. **Real-time Updates**: Create/complete tasks and show instant feedback

### Technical Talking Points:

- "Using Next.js 14 App Router with Server Components for optimal performance"
- "TypeScript throughout for type safety and better DX"
- "MongoDB with Prisma for type-safe database queries"
- "Google Gemini AI for free, production-ready AI features"
- "shadcn/ui for consistent, accessible component design"
- "NextAuth.js for secure, session-based authentication"
- "Optimistic UI updates for instant user feedback"

## 🔥 Quick Test Data

Create these sample tasks to showcase features:

1. "Prepare presentation for Monday meeting" → AI suggests: Work, High priority
2. "Buy milk and eggs" → AI suggests: Shopping, Medium priority
3. "Schedule dentist appointment" → AI suggests: Health, Low priority
4. "Review pull requests" → AI suggests: Work, Medium priority

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

---

**Need help?** Check the main README.md for detailed documentation.

**Ready for your interview?** Good luck! You've got this! 💪
