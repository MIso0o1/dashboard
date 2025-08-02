"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditWidgetDataDialog } from "@/components/edit-widget-data-dialog"
import type { Widget } from "@/types/dashboard"

interface EditWidgetDialogProps {
  widget: Widget
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (updates: Partial<Widget>) => void
}

export function EditWidgetDialog({ widget, open, onOpenChange, onUpdate }: EditWidgetDialogProps) {
  const [title, setTitle] = useState(widget.title)
  const [chartType, setChartType] = useState(widget.chartType || "bar")
  const [showDataDialog, setShowDataDialog] = useState(false)

  useEffect(() => {
    setTitle(widget.title)
    setChartType(widget.chartType || "bar")
  }, [widget])

  const handleSubmit = () => {
    onUpdate({ title, chartType })
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Widget</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Widget Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            {(widget.type === "finance" || widget.type === "health" || widget.type === "investment") && (
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
            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1 gradient-bg hover:opacity-90 shadow-lg">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setShowDataDialog(true)}>
                Edit Data
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditWidgetDataDialog
        widget={widget}
        open={showDataDialog}
        onOpenChange={setShowDataDialog}
        onUpdate={onUpdate}
      />
    </>
  )
}
