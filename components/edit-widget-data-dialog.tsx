"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus } from "lucide-react"
import type { Widget } from "@/types/dashboard"

interface EditWidgetDataDialogProps {
  widget: Widget
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (updates: Partial<Widget>) => void
}

export function EditWidgetDataDialog({ widget, open, onOpenChange, onUpdate }: EditWidgetDataDialogProps) {
  const [data, setData] = useState(widget.data)

  useEffect(() => {
    setData(widget.data)
  }, [widget.data])

  const handleSubmit = () => {
    onUpdate({ data })
    onOpenChange(false)
  }

  const renderDataEditor = () => {
    if (widget.type === "finance" && Array.isArray(data)) {
      return (
        <div className="space-y-4">
          <Label>Financial Categories</Label>
          {data.map((item: any, index: number) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Category name"
                value={item.name || ""}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index] = { ...item, name: e.target.value }
                  setData(newData)
                }}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={item.value || ""}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index] = { ...item, value: Number.parseFloat(e.target.value) || 0 }
                  setData(newData)
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newData = data.filter((_: any, i: number) => i !== index)
                  setData(newData)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              setData([...data, { name: "New Category", value: 0 }])
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      )
    }

    if (widget.type === "health" && Array.isArray(data)) {
      return (
        <div className="space-y-4">
          <Label>Health Data</Label>
          {data.map((item: any, index: number) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Day"
                value={item.day || ""}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index] = { ...item, day: e.target.value }
                  setData(newData)
                }}
              />
              <Input
                type="number"
                placeholder="Steps"
                value={item.steps || ""}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index] = { ...item, steps: Number.parseInt(e.target.value) || 0 }
                  setData(newData)
                }}
              />
              <Input
                type="number"
                placeholder="Calories"
                value={item.calories || ""}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index] = { ...item, calories: Number.parseInt(e.target.value) || 0 }
                  setData(newData)
                }}
              />
            </div>
          ))}
        </div>
      )
    }

    if (widget.type === "investment" && Array.isArray(data)) {
      return (
        <div className="space-y-4">
          <Label>Investment Data</Label>
          {data.map((item: any, index: number) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Month"
                value={item.month || ""}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index] = { ...item, month: e.target.value }
                  setData(newData)
                }}
              />
              <Input
                type="number"
                placeholder="Portfolio Value"
                value={item.value || ""}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index] = { ...item, value: Number.parseFloat(e.target.value) || 0 }
                  setData(newData)
                }}
              />
            </div>
          ))}
        </div>
      )
    }

    if (widget.type === "metric" && typeof data === "object" && !Array.isArray(data)) {
      return (
        <div className="space-y-4">
          <Label>Metric Values</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Total Savings ($)</Label>
              <Input
                type="number"
                value={data.totalSavings || ""}
                onChange={(e) => setData({ ...data, totalSavings: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs">Monthly Income ($)</Label>
              <Input
                type="number"
                value={data.monthlyIncome || ""}
                onChange={(e) => setData({ ...data, monthlyIncome: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs">Completed Tasks</Label>
              <Input
                type="number"
                value={data.completedTasks || ""}
                onChange={(e) => setData({ ...data, completedTasks: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs">Avg Daily Steps</Label>
              <Input
                type="number"
                value={data.avgSteps || ""}
                onChange={(e) => setData({ ...data, avgSteps: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>
      )
    }

    return <div className="text-center text-muted-foreground">No data editor available for this widget type</div>
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Widget Data - {widget.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {renderDataEditor()}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1 gradient-bg hover:opacity-90 shadow-lg">
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
