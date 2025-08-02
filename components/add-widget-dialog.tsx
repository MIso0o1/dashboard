"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Widget, WidgetType } from "@/types/dashboard"

interface AddWidgetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddWidget: (widget: Omit<Widget, "id">) => void
}

export function AddWidgetDialog({ open, onOpenChange, onAddWidget }: AddWidgetDialogProps) {
  const [title, setTitle] = useState("")
  const [type, setType] = useState<WidgetType>("finance")
  const [chartType, setChartType] = useState("bar")

  const handleSubmit = () => {
    if (!title) return

    const newWidget: Omit<Widget, "id"> = {
      title,
      type,
      chartType,
      data: getDefaultData(type),
      position: { x: 0, y: 0, w: 6, h: 4 },
    }

    onAddWidget(newWidget)
    onOpenChange(false)
    setTitle("")
    setType("finance")
    setChartType("bar")
  }

  const getDefaultData = (widgetType: WidgetType) => {
    switch (widgetType) {
      case "finance":
        return [
          { name: "Category 1", value: 100 },
          { name: "Category 2", value: 200 },
        ]
      case "todo":
        return [{ id: "1", text: "Sample task", completed: false }]
      case "health":
        return [
          { day: "Mon", steps: 5000, calories: 2000 },
          { day: "Tue", steps: 7000, calories: 2200 },
        ]
      case "investment":
        return [
          { month: "Jan", value: 1000 },
          { month: "Feb", value: 1100 },
        ]
      case "metric":
        return {
          value1: 100,
          value2: 200,
          value3: 300,
          value4: 400,
        }
      case "lifestyle":
        return [{ id: "1", text: "Sample habit", completed: false }]
      default:
        return []
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Widget</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Widget Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter widget title"
            />
          </div>
          <div>
            <Label htmlFor="type">Widget Type</Label>
            <Select value={type} onValueChange={(value: WidgetType) => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="todo">Todo List</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="metric">Metrics</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(type === "finance" || type === "health" || type === "investment" || type === "lifestyle") && (
            <div>
              <Label htmlFor="chartType">Chart Type</Label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button onClick={handleSubmit} className="w-full">
            Add Widget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
