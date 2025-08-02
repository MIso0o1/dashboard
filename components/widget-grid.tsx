"use client"

import type { Widget } from "@/types/dashboard"
import { WidgetCard } from "@/components/widget-card"

interface WidgetGridProps {
  widgets: Widget[]
  onUpdateWidget: (id: string, updates: Partial<Widget>) => void
  onDeleteWidget: (id: string) => void
}

export function WidgetGrid({ widgets, onUpdateWidget, onDeleteWidget }: WidgetGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={`${
            widget.type === "metric"
              ? "md:col-span-2 lg:col-span-3 xl:col-span-4"
              : widget.type === "health"
                ? "md:col-span-2 lg:col-span-2"
                : "col-span-1"
          }`}
        >
          <WidgetCard
            widget={widget}
            onUpdate={(updates) => onUpdateWidget(widget.id, updates)}
            onDelete={() => onDeleteWidget(widget.id)}
          />
        </div>
      ))}
    </div>
  )
}
