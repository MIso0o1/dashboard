"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DraggableWidgetGrid } from "@/components/draggable-widget-grid"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Widget } from "@/types/dashboard"

interface DashboardContentProps {
  widgets: Widget[]
  onUpdateWidget: (id: string, updates: Partial<Widget>) => void
  onDeleteWidget: (id: string) => void
  onReorderWidgets: (widgets: Widget[]) => void
}

export function DashboardContent({ widgets, onUpdateWidget, onDeleteWidget, onReorderWidgets }: DashboardContentProps) {
  return (
    <SidebarInset className="animated-bg dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sky-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-sky-200 dark:bg-slate-600" />
        <div className="flex flex-col flex-1">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">My Dashboard</h1>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            Drag widgets to reorder • Click ⋯ to customize
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
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
