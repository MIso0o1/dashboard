"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DraggableWidgetGrid } from "@/components/draggable-widget-grid"

import type { Widget } from "@/types/dashboard"

interface DashboardContentProps {
  widgets: Widget[]
  onUpdateWidget: (id: string, updates: Partial<Widget>) => void
  onDeleteWidget: (id: string) => void
  onReorderWidgets: (widgets: Widget[]) => void
}

export function DashboardContent({ widgets, onUpdateWidget, onDeleteWidget, onReorderWidgets }: DashboardContentProps) {
  return (
    <SidebarInset className="animated-bg">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sky-200/50 bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1 hover:bg-blue-100 text-blue-700 hover:text-blue-800" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-sky-200" />
        <div className="flex flex-col flex-1">
          <h1 className="text-lg font-bold text-slate-800">My Dashboard</h1>
          <p className="text-sm text-blue-600 font-medium">
            Drag widgets to reorder • Click ⋯ to customize
          </p>
        </div>
        <div className="flex items-center gap-2">

        </div>
      </header>

      <div className="flex-1 p-6">
        <DraggableWidgetGrid
          widgets={widgets}
          onUpdateWidget={onUpdateWidget}
          onDeleteWidget={onDeleteWidget}
          onReorderWidgets={onReorderWidgets}
        />
      </div>
    </SidebarInset>
  )
}
