"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, TrendingUp } from "lucide-react";

type Todo = {
  completed: boolean;
  dueDate: Date | null;
};

export function TodoStats({ todos }: { todos: Todo[] }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const overdue = todos.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: Circle,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
