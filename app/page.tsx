"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { Widget } from "@/types/dashboard"

interface DashboardSettings {
  dashboardName: string
  theme: "light" | "dark" | "system"
  autoSave: boolean
  showGridLines: boolean
  compactMode: boolean
  animationsEnabled: boolean
  defaultChartType: "bar" | "line" | "pie"
  refreshInterval: number
}

const defaultSettings: DashboardSettings = {
  dashboardName: "Dashboard Pro",
  theme: "system",
  autoSave: true,
  showGridLines: false,
  compactMode: false,
  animationsEnabled: true,
  defaultChartType: "bar",
  refreshInterval: 300,
}

const initialWidgets: Widget[] = [
  {
    id: "1",
    type: "finance",
    title: "Monthly Expenses",
    data: [
      { name: "Food", value: 800 },
      { name: "Rent", value: 1200 },
      { name: "Transport", value: 300 },
      { name: "Entertainment", value: 200 },
    ],
    chartType: "pie",
    position: { x: 0, y: 0, w: 6, h: 4 },
  },
  {
    id: "2",
    type: "todo",
    title: "Today's Tasks",
    data: [
      { id: "1", text: "Review dashboard designs", completed: true },
      { id: "2", text: "Update financial records", completed: false },
      { id: "3", text: "Call insurance company", completed: false },
      { id: "4", text: "Grocery shopping", completed: true },
    ],
    position: { x: 6, y: 0, w: 6, h: 4 },
  },
  {
    id: "3",
    type: "health",
    title: "Weekly Activity",
    data: [
      { day: "Mon", steps: 8500, calories: 2200 },
      { day: "Tue", steps: 12000, calories: 2400 },
      { day: "Wed", steps: 6800, calories: 2100 },
      { day: "Thu", steps: 15000, calories: 2600 },
      { day: "Fri", steps: 9200, calories: 2300 },
      { day: "Sat", steps: 18000, calories: 2800 },
      { day: "Sun", steps: 5000, calories: 2000 },
    ],
    chartType: "bar",
    position: { x: 0, y: 4, w: 8, h: 4 },
  },
  {
    id: "4",
    type: "investment",
    title: "Portfolio Performance",
    data: [
      { month: "Jan", value: 10000 },
      { month: "Feb", value: 10500 },
      { month: "Mar", value: 9800 },
      { month: "Apr", value: 11200 },
      { month: "May", value: 12100 },
      { month: "Jun", value: 11800 },
    ],
    chartType: "line",
    position: { x: 8, y: 4, w: 4, h: 4 },
  },
  {
    id: "5",
    type: "metric",
    title: "Key Metrics",
    data: {
      totalSavings: 25000,
      monthlyIncome: 5500,
      completedTasks: 28,
      avgSteps: 10500,
    },
    position: { x: 0, y: 8, w: 12, h: 2 },
  },
]

export default function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets)
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("dashboard-settings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error("Failed to load settings:", error)
      }
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("dashboard-settings", JSON.stringify(settings))
  }, [settings])

  const addWidget = (widget: Omit<Widget, "id">) => {
    const newWidget: Widget = {
      ...widget,
      id: Date.now().toString(),
    }
    setWidgets((prev) => [...prev, newWidget])
  }

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    setWidgets((prev) => prev.map((widget) => (widget.id === id ? { ...widget, ...updates } : widget)))
  }

  const deleteWidget = (id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id))
  }

  const reorderWidgets = (newWidgets: Widget[]) => {
    setWidgets(newWidgets)
  }

  const clearAllWidgets = () => {
    setWidgets([])
  }

  const importWidgets = (importedWidgets: Widget[]) => {
    setWidgets(importedWidgets)
  }

  const updateSettings = (newSettings: DashboardSettings) => {
    setSettings(newSettings)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar
          onAddWidget={addWidget}
          widgets={widgets}
          onClearAllWidgets={clearAllWidgets}
          onImportWidgets={importWidgets}
          settings={settings}
          onUpdateSettings={updateSettings}
        />
        <DashboardContent
          widgets={widgets}
          onUpdateWidget={updateWidget}
          onDeleteWidget={deleteWidget}
          onReorderWidgets={reorderWidgets}
        />
      </div>
    </SidebarProvider>
  )
}
