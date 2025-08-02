"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { Widget } from "@/types/dashboard"

interface TodoWidgetProps {
  widget: Widget
  onUpdate: (updates: Partial<Widget>) => void
}

export function TodoWidget({ widget, onUpdate }: TodoWidgetProps) {
  const [newTask, setNewTask] = useState("")

  const toggleTask = (taskId: string) => {
    const updatedData = widget.data.map((task: any) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    )
    onUpdate({ data: updatedData })
  }

  const addTask = () => {
    if (newTask.trim()) {
      const updatedData = [...widget.data, { id: Date.now().toString(), text: newTask, completed: false }]
      onUpdate({ data: updatedData })
      setNewTask("")
    }
  }

  // Update getThemeColors to handle lifestyle widgets with green colors
  const getThemeColors = () => {
    switch (widget.type) {
      case "health":
        return {
          buttonBg: "bg-orange-500 hover:bg-orange-600",
          inputFocus: "focus:ring-orange-500 focus:border-orange-500",
        }
      case "lifestyle":
        return {
          buttonBg: "bg-emerald-500 hover:bg-emerald-600",
          inputFocus: "focus:ring-emerald-500 focus:border-emerald-500",
        }
      default:
        return {
          buttonBg: "bg-purple-500 hover:bg-purple-600",
          inputFocus: "focus:ring-purple-500 focus:border-purple-500",
        }
    }
  }

  const colors = getThemeColors()

  return (
    <div className="space-y-2 h-full flex flex-col">
      <div className="flex gap-2">
        <Input
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className={`text-sm ${colors.inputFocus}`}
        />
        <Button size="sm" onClick={addTask} className={colors.buttonBg}>
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto space-y-2">
        {widget.data.map((task: any) => (
          <div key={task.id} className="flex items-center space-x-2">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
            <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
