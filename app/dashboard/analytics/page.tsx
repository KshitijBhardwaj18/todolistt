"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, TrendingUp, Target, Calendar } from "lucide-react";
import { toast } from "sonner";

type Todo = {
  id: string;
  completed: boolean;
  priority: string;
  category: string | null;
  dueDate: Date | null;
  createdAt: Date;
};

export default function AnalyticsPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        toast.error("Failed to load analytics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const highPriority = todos.filter((t) => t.priority === "high" && !t.completed).length;
  const mediumPriority = todos.filter((t) => t.priority === "medium" && !t.completed).length;
  const lowPriority = todos.filter((t) => t.priority === "low" && !t.completed).length;

  const overdue = todos.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  const dueSoon = todos.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    const days = Math.ceil((new Date(t.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days >= 0 && days <= 3;
  }).length;

  const categoryStats = todos.reduce((acc, todo) => {
    const cat = todo.category || "Uncategorized";
    if (!acc[cat]) {
      acc[cat] = { total: 0, completed: 0 };
    }
    acc[cat].total++;
    if (todo.completed) acc[cat].completed++;
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const topCategories = Object.entries(categoryStats)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your productivity and progress</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your productivity and progress</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-3xl font-bold">{total}</p>
              </div>
              <Circle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">{completed}</p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold">{pending}</p>
              </div>
              <Clock className="h-10 w-10 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold">{completionRate}%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">🔴 High Priority</p>
                <p className="text-2xl font-bold">{highPriority}</p>
                <p className="text-xs text-muted-foreground mt-1">pending tasks</p>
              </div>
              <Target className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">🟡 Medium Priority</p>
                <p className="text-2xl font-bold">{mediumPriority}</p>
                <p className="text-xs text-muted-foreground mt-1">pending tasks</p>
              </div>
              <Target className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">🟢 Low Priority</p>
                <p className="text-2xl font-bold">{lowPriority}</p>
                <p className="text-xs text-muted-foreground mt-1">pending tasks</p>
              </div>
              <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Due Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue Tasks</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{overdue}</p>
                <p className="text-xs text-muted-foreground mt-1">need immediate attention</p>
              </div>
              <Calendar className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Soon (3 days)</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{dueSoon}</p>
                <p className="text-xs text-muted-foreground mt-1">upcoming deadlines</p>
              </div>
              <Calendar className="h-10 w-10 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks by Category</CardTitle>
          <CardDescription>Your top categories and completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          {topCategories.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No categories yet. Start organizing your tasks!
            </p>
          ) : (
            <div className="space-y-4">
              {topCategories.map(([category, stats]) => {
                const categoryRate = Math.round((stats.completed / stats.total) * 100);
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground">
                        {stats.completed}/{stats.total} ({categoryRate}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all"
                        style={{ width: `${categoryRate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Productivity Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Productivity Insights</CardTitle>
          <CardDescription>AI-powered recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completionRate >= 70 && (
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Great job! 🎉
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    You're maintaining a {completionRate}% completion rate. Keep up the excellent work!
                  </p>
                </div>
              </div>
            )}

            {overdue > 0 && (
              <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                <Clock className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">
                    Attention needed
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    You have {overdue} overdue task{overdue > 1 ? "s" : ""}. Consider prioritizing them today.
                  </p>
                </div>
              </div>
            )}

            {highPriority > 3 && (
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <Target className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900 dark:text-orange-100">
                    High priority workload
                  </p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    You have {highPriority} high-priority tasks. Break them down into smaller steps for better progress.
                  </p>
                </div>
              </div>
            )}

            {completionRate >= 70 && overdue === 0 && highPriority <= 3 && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    You're on track! 🌟
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your task management is excellent. You're organized and making steady progress.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
