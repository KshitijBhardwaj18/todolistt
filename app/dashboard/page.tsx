"use client";

import { useState, useEffect } from "react";
import { TodoList } from "@/components/todo-list";
import { CreateTodoForm } from "@/components/create-todo-form";
import { TodoFilters } from "@/components/todo-filters";
import { TodoStats } from "@/components/todo-stats";
import { toast } from "sonner";

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: string;
  category: string | null;
  dueDate: Date | null;
  order: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      toast.error("Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      setTodos(todos.map((t) => (t.id === id ? data.todo : t)));
      toast.success("Todo updated");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      setTodos(todos.filter((t) => t.id !== id));
      toast.success("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const handleReorder = (reorderedTodos: Todo[]) => {
    setTodos(reorderedTodos);
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      (todo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesPriority = !filterPriority || todo.priority === filterPriority;
    const matchesCategory = !filterCategory || todo.category === filterCategory;
    const matchesCompleted = showCompleted || !todo.completed;

    return matchesSearch && matchesPriority && matchesCategory && matchesCompleted;
  });

  const categories = Array.from(
    new Set(todos.map((t) => t.category).filter(Boolean))
  ) as string[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-muted-foreground">
            Manage your todos with AI-powered assistance
          </p>
        </div>
      </div>

      <TodoStats todos={todos} />

      <CreateTodoForm onSuccess={handleCreateTodo} />

      <TodoFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterPriority={filterPriority}
        onPriorityChange={setFilterPriority}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        showCompleted={showCompleted}
        onShowCompletedChange={setShowCompleted}
        categories={categories}
      />

      <TodoList
        todos={filteredTodos}
        isLoading={isLoading}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
        onReorder={handleReorder}
      />
    </div>
  );
}
