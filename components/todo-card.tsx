"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import {
  MoreVertical,
  Trash2,
  Edit,
  GripVertical,
  Calendar as CalendarIcon,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

type Todo = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: string;
  category: string | null;
  dueDate: Date | null;
  order: number;
};

type TodoCardProps = {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
};

export function TodoCard({ todo, onUpdate, onDelete }: TodoCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || "",
    priority: todo.priority,
    category: todo.category || "",
    dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "low":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
      default:
        return "";
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const handleSave = () => {
    onUpdate(todo.id, {
      title: editData.title,
      description: editData.description || null,
      priority: editData.priority,
      category: editData.category || null,
      dueDate: editData.dueDate,
    });
    setIsEditOpen(false);
  };

  const handleAiSuggestions = async () => {
    try {
      const response = await fetch("/api/ai/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editData.title,
          description: editData.description,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEditData({
          ...editData,
          category: data.category || editData.category,
          priority: data.priority || editData.priority,
        });
        toast.success("AI suggestions applied!");
      }
    } catch (error) {
      toast.error("Failed to get AI suggestions");
    }
  };

  return (
    <>
      <Card ref={setNodeRef} style={style} className={todo.completed ? "opacity-60" : ""}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing mt-1"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>

            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) =>
                onUpdate(todo.id, { completed: checked as boolean })
              }
              className="mt-1"
            />

            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className={getPriorityColor(todo.priority)}>
                  {todo.priority}
                </Badge>

                {todo.category && (
                  <Badge variant="secondary">{todo.category}</Badge>
                )}

                {todo.dueDate && (
                  <Badge
                    variant="outline"
                    className={isOverdue ? "border-red-500 text-red-700 dark:text-red-400" : ""}
                  >
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {format(new Date(todo.dueDate), "MMM d")}
                  </Badge>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-400"
                  onClick={() => onDelete(todo.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Make changes to your task</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={editData.priority}
                  onValueChange={(value) => setEditData({ ...editData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">🔴 High</SelectItem>
                    <SelectItem value="medium">🟡 Medium</SelectItem>
                    <SelectItem value="low">🟢 Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editData.dueDate ? format(editData.dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={editData.dueDate || undefined}
                    onSelect={(date) => setEditData({ ...editData, dueDate: date || null })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              variant="outline"
              onClick={handleAiSuggestions}
              className="w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Suggestions
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
