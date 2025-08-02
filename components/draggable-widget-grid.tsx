"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { Widget } from "@/types/dashboard"
import { WidgetCard } from "@/components/widget-card"

interface DraggableWidgetGridProps {
  widgets: Widget[]
  onUpdateWidget: (id: string, updates: Partial<Widget>) => void
  onDeleteWidget: (id: string) => void
  onReorderWidgets: (widgets: Widget[]) => void
}

export function DraggableWidgetGrid({
  widgets,
  onUpdateWidget,
  onDeleteWidget,
  onReorderWidgets,
}: DraggableWidgetGridProps) {
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const dragCounter = useRef(0)

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    setDraggedWidget(widgetId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", widgetId)

    // Add some visual feedback
    const target = e.target as HTMLElement
    target.style.opacity = "0.6"
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement
    target.style.opacity = "1"
    setDraggedWidget(null)
    setDragOverIndex(null)
    dragCounter.current = 0
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    dragCounter.current++
    setDragOverIndex(index)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--
    if (dragCounter.current === 0) {
      setDragOverIndex(null)
    }
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (!draggedWidget) return

    const draggedIndex = widgets.findIndex((w) => w.id === draggedWidget)
    if (draggedIndex === -1 || draggedIndex === dropIndex) return

    const newWidgets = [...widgets]
    const [draggedItem] = newWidgets.splice(draggedIndex, 1)
    newWidgets.splice(dropIndex, 0, draggedItem)

    onReorderWidgets(newWidgets)
    setDragOverIndex(null)
    dragCounter.current = 0
  }

  const getGridItemClass = (widget: Widget) => {
    switch (widget.type) {
      case "metric":
        return "md:col-span-2 lg:col-span-3 xl:col-span-4"
      case "health":
        return "md:col-span-2 lg:col-span-2"
      default:
        return "col-span-1"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {widgets.map((widget, index) => (
        <div
          key={widget.id}
          className={`${getGridItemClass(widget)} transition-all duration-300 ${
            dragOverIndex === index ? "scale-105 ring-2 ring-sky-400 ring-opacity-50" : ""
          } ${draggedWidget === widget.id ? "opacity-60" : ""}`}
          draggable
          onDragStart={(e) => handleDragStart(e, widget.id)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
        >
          <div className="relative">
            {dragOverIndex === index && (
              <div className="absolute inset-0 bg-sky-100/80 border-2 border-dashed border-sky-400 rounded-xl z-10 flex items-center justify-center backdrop-blur-sm">
                <span className="text-sm font-semibold text-sky-700 bg-white px-3 py-1 rounded-full shadow-sm">
                  Drop here
                </span>
              </div>
            )}
            <WidgetCard
              widget={widget}
              onUpdate={(updates) => onUpdateWidget(widget.id, updates)}
              onDelete={() => onDeleteWidget(widget.id)}
            />
          </div>
        </div>
      ))}

      {widgets.length === 0 && (
        <div className="col-span-full flex items-center justify-center h-64 border-2 border-dashed border-sky-300 rounded-xl bg-sky-50/50">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-slate-700 font-medium mb-2">No widgets yet</p>
            <p className="text-sm text-sky-600">Add widgets from the sidebar to get started</p>
          </div>
        </div>
      )}
    </div>
  )
}
