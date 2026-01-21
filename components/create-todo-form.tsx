"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { CalendarIcon, Sparkles, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

type Todo = {
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

export function CreateTodoForm({ onSuccess }: { onSuccess: (todo: Todo) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [useAi, setUseAi] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    dueDate: null as Date | null,
  });

  const handleAiCategorize = async () => {
    if (!formData.title) return;

    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          ...formData,
          category: data.category || formData.category,
          priority: data.priority || formData.priority,
        });
        toast.success("AI suggestions applied!", {
          description: `Category: ${data.category}, Priority: ${data.priority}`,
        });
      }
    } catch (error) {
      console.error("AI categorization failed:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Auto-categorize with AI if enabled
      let aiData = null;
      if (useAi && !formData.category) {
        try {
          const aiResponse = await fetch("/api/ai/categorize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: formData.title,
              description: formData.description,
            }),
          });
          if (aiResponse.ok) {
            aiData = await aiResponse.json();
          }
        } catch (error) {
          console.error("AI categorization failed:", error);
        }
      }

      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: formData.category || aiData?.category || null,
          priority: aiData?.priority || formData.priority,
        }),
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      onSuccess(data.todo);
      toast.success(
        aiData ? "Todo created with AI suggestions! ✨" : "Todo created!"
      );
      
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        category: "",
        dueDate: null,
      });
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to create todo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {!isOpen ? (
          <Button onClick={() => setIsOpen(true)} className="w-full" size="lg">
            + Create New Task
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Create New Task</h3>
              <div className="flex items-center gap-2">
                <Badge variant={useAi ? "default" : "outline"} className="cursor-pointer" onClick={() => setUseAi(!useAi)}>
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Mode
                </Badge>
              </div>
            </div>

            <Input
              placeholder="Task title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔴 High</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="low">🟢 Low</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Category (optional)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(formData.dueDate, "PPP") : "Due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate || undefined}
                    onSelect={(date) => setFormData({ ...formData, dueDate: date || null })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {useAi && formData.title && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAiCategorize}
                disabled={isAiLoading}
                className="w-full"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting AI suggestions...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Suggestions
                  </>
                )}
              </Button>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Task"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  setFormData({
                    title: "",
                    description: "",
                    priority: "medium",
                    category: "",
                    dueDate: null,
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
