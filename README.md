# AI-Powered Todo List Application 🚀

A modern, full-stack todo list application with AI-powered categorization and smart task management built with Next.js 14, TypeScript, MongoDB, and Google Gemini AI.

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure signup/login with NextAuth.js
- ✅ **CRUD Operations** - Create, read, update, and delete todos
- 🎯 **Priority Levels** - High, Medium, Low priority management
- 📁 **Categories** - Organize tasks by category
- 📅 **Due Dates** - Set and track task deadlines
- 🔄 **Drag & Drop** - Reorder tasks with smooth animations

### AI-Powered Features
- 🤖 **AI Categorization** - Automatic task categorization using Google Gemini
- ⚡ **Priority Detection** - Smart priority suggestions based on task content
- 💡 **Smart Suggestions** - AI-generated subtasks and recommendations

### Advanced Features
- 🔍 **Search & Filter** - Find tasks quickly with powerful filters
- 📊 **Analytics Dashboard** - Track productivity with detailed insights
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🌙 **Dark Mode** - Full dark mode support
- ⚡ **Real-time Updates** - Instant feedback with optimistic UI updates

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Prisma ORM
- **Authentication:** NextAuth.js
- **AI:** Google Gemini API (Free tier)
- **Drag & Drop:** dnd-kit
- **Date Handling:** date-fns
- **Notifications:** Sonner

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Google Gemini API key (free at https://aistudio.google.com/app/apikey)

### Installation

1. **Clone and install dependencies:**

\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables:**

Create a \`.env\` file in the root directory:

\`\`\`env
# MongoDB Database URL
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/todolist?retryWrites=true&w=majority"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google Gemini API Key
GEMINI_API_KEY="your-gemini-api-key-here"
\`\`\`

3. **Generate Prisma Client:**

\`\`\`bash
npx prisma generate
\`\`\`

4. **Run the development server:**

\`\`\`bash
npm run dev
\`\`\`

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" and get your connection string
4. Replace \`<username>\`, \`<password>\`, and \`<cluster>\` in your \`.env\` file

### Local MongoDB

\`\`\`env
DATABASE_URL="mongodb://localhost:27017/todolist"
\`\`\`

## 🤖 Google Gemini API Setup

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your \`.env\` file as \`GEMINI_API_KEY\`

**Note:** The Gemini API is completely free with generous rate limits (60 requests/minute).

## 🔐 NextAuth Secret

Generate a secure secret for NextAuth:

\`\`\`bash
openssl rand -base64 32
\`\`\`

Add the output to your \`.env\` as \`NEXTAUTH_SECRET\`.

## 📦 Project Structure

\`\`\`
todolist/
├── app/
│   ├── (auth)/                 # Auth pages (login, signup)
│   ├── dashboard/              # Main dashboard
│   │   ├── analytics/          # Analytics page
│   │   └── page.tsx            # Todo list page
│   ├── api/
│   │   ├── auth/               # NextAuth routes
│   │   ├── todos/              # Todo CRUD routes
│   │   └── ai/                 # AI endpoints
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── todo-list.tsx           # Todo list with drag-drop
│   ├── todo-card.tsx           # Individual todo card
│   ├── create-todo-form.tsx    # Todo creation form
│   ├── todo-filters.tsx        # Search and filter
│   ├── todo-stats.tsx          # Statistics cards
│   └── dashboard-nav.tsx       # Navigation bar
├── lib/
│   ├── db.ts                   # Prisma client
│   ├── auth.ts                 # NextAuth config
│   └── gemini.ts               # AI helper functions
├── prisma/
│   └── schema.prisma           # Database schema
└── types/
    └── next-auth.d.ts          # TypeScript types
\`\`\`

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables:**
   - In Vercel project settings, add all environment variables from \`.env\`
   - Update \`NEXTAUTH_URL\` to your production URL

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live in minutes!

### Environment Variables for Production

\`\`\`env
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-app.vercel.app"
GEMINI_API_KEY="your-gemini-api-key"
\`\`\`

## 📝 Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npx prisma generate\` - Generate Prisma Client
- \`npx prisma studio\` - Open Prisma Studio (database GUI)

## 🎯 Key Features Showcase

### AI-Powered Categorization
When creating a task, the AI automatically suggests:
- **Category** (Work, Personal, Shopping, Health, etc.)
- **Priority** (High, Medium, Low)
- **Tags** for better organization

### Analytics Dashboard
Track your productivity with:
- Completion rate percentage
- Tasks by priority breakdown
- Overdue and upcoming tasks
- Category-wise progress
- AI-powered productivity insights

### Smart Task Management
- **Drag & Drop**: Reorder tasks intuitively
- **Quick Actions**: Complete, edit, or delete with ease
- **Filters**: Search and filter by priority, category, or completion status
- **Due Dates**: Visual indicators for overdue tasks

## 🔒 Security

- Passwords hashed with bcrypt
- Protected API routes with NextAuth middleware
- MongoDB ObjectId for secure references
- Environment variables for sensitive data
- CSRF protection with NextAuth

## 🤝 Contributing

This project was built as a coding interview demonstration. Feel free to fork and enhance!

## 📄 License

MIT License - feel free to use this project for learning or interviews.

## 🎓 Interview Highlights

**Why this project demonstrates full-stack skills:**

1. **Modern Architecture** - Next.js 14 App Router with Server Components
2. **Type Safety** - Full TypeScript implementation
3. **Database Design** - Well-structured MongoDB schema with Prisma
4. **Authentication** - Production-ready auth with NextAuth.js
5. **AI Integration** - Real-world AI API integration (Google Gemini)
6. **UI/UX** - Professional design with shadcn/ui and Tailwind
7. **State Management** - Optimistic updates and real-time sync
8. **Advanced Features** - Drag-drop, filters, analytics
9. **Production Ready** - Proper error handling, loading states, responsive design
10. **Fast Development** - Built efficiently with reusable components

## 📧 Contact

Built with ❤️ for technical interviews

---

**Made with Next.js 14 + TypeScript + MongoDB + Gemini AI**
