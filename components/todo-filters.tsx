"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type TodoFiltersProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterPriority: string | null;
  onPriorityChange: (priority: string | null) => void;
  filterCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  showCompleted: boolean;
  onShowCompletedChange: (show: boolean) => void;
  categories: string[];
};

export function TodoFilters({
  searchQuery,
  onSearchChange,
  filterPriority,
  onPriorityChange,
  filterCategory,
  onCategoryChange,
  showCompleted,
  onShowCompletedChange,
  categories,
}: TodoFiltersProps) {
  const hasFilters = filterPriority || filterCategory || !showCompleted;

  const clearFilters = () => {
    onPriorityChange(null);
    onCategoryChange(null);
    onShowCompletedChange(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={filterPriority || "all"}
          onValueChange={(value) => onPriorityChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterCategory || "all"}
          onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="outline" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-completed"
          checked={showCompleted}
          onCheckedChange={(checked) => onShowCompletedChange(checked as boolean)}
        />
        <Label
          htmlFor="show-completed"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show completed tasks
        </Label>
      </div>
    </div>
  );
}
