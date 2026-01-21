import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckSquare, Sparkles, BarChart3, Calendar } from "lucide-react";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <CheckSquare className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            AI-Powered
            <br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Task Management
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your todos smarter with AI-powered categorization, priority detection, and insights.
            Get more done, effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg w-fit mb-4">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Categorization</h3>
            <p className="text-muted-foreground">
              Automatically categorize and prioritize your tasks using Google Gemini AI.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg w-fit mb-4">
              <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Planning</h3>
            <p className="text-muted-foreground">
              Set due dates, priorities, and organize tasks with drag-and-drop simplicity.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
            <p className="text-muted-foreground">
              Track your productivity with detailed analytics and AI-powered recommendations.
            </p>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Built with modern technologies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Next.js 14", "TypeScript", "MongoDB", "Prisma", "Gemini AI", "Tailwind CSS"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white dark:bg-gray-800 border rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
