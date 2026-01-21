"use client";

import { useState } from "react";
import { TodoCard } from "./todo-card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox } from "lucide-react";

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

type TodoListProps = {
  todos: Todo[];
  isLoading: boolean;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onReorder: (todos: Todo[]) => void;
};

export function TodoList({ todos, isLoading, onUpdate, onDelete, onReorder }: TodoListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over.id);

      const reordered = arrayMove(todos, oldIndex, newIndex);
      
      // Update order property for each todo
      const withNewOrder = reordered.map((todo, index) => ({
        ...todo,
        order: index,
      }));

      onReorder(withNewOrder);

      // Update orders in backend
      withNewOrder.forEach((todo) => {
        onUpdate(todo.id, { order: todo.order });
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            Create your first task to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
