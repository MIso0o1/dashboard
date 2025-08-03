"use client"

import { useState } from "react"
import { BarChart3, Home, Plus, Settings, Target } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddWidgetDialog } from "@/components/add-widget-dialog"
import { WidgetCategoryBrowser } from "@/components/widget-category-browser"
import { SettingsDialog } from "@/components/settings-dialog"
import type { Widget } from "@/types/dashboard"

interface DashboardSettings {
  dashboardName: string
  autoSave: boolean
  showGridLines: boolean
  compactMode: boolean
  animationsEnabled: boolean
  defaultChartType: "bar" | "line" | "pie"
  refreshInterval: number
}

interface DashboardSidebarProps {
  onAddWidget: (widget: Omit<Widget, "id">) => void
  widgets: Widget[]
  onClearAllWidgets: () => void
  onImportWidgets: (widgets: Widget[]) => void
  settings: DashboardSettings
  onUpdateSettings: (settings: DashboardSettings) => void
}

export function DashboardSidebar({
  onAddWidget,
  widgets,
  onClearAllWidgets,
  onImportWidgets,
  settings,
  onUpdateSettings,
}: DashboardSidebarProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showCategoryBrowser, setShowCategoryBrowser] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <Sidebar className="border-r border-slate-200/50 glass-effect">
        <SidebarHeader>
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg text-white shadow-lg">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">{settings.dashboardName}</span>
              <span className="text-xs text-blue-600 font-medium">Drag & customize</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="custom-scrollbar">
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-700 font-semibold">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setShowSettings(true)}
                    className="hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-700 font-semibold">
              Add Widgets
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/50 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 rounded-lg"
                  onClick={() => setShowCategoryBrowser(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Widget Library
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/50 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 rounded-lg"
                  onClick={() => setShowAddDialog(true)}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Create Custom Widget
                </Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-700 font-semibold">
              Dashboard Stats
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/50">
                  <span className="text-slate-600 font-medium">Total Widgets</span>
                  <Badge className="status-info">{widgets.length}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/50">
                  <span className="text-slate-600 font-medium">Auto Save</span>
                  <Badge className={settings.autoSave ? "status-success" : "status-warning"}>
                    {settings.autoSave ? "On" : "Off"}
                  </Badge>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="w-full gradient-bg hover:opacity-90 shadow-lg rounded-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Quick Add Widget
          </Button>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <AddWidgetDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAddWidget={onAddWidget} />
      <WidgetCategoryBrowser
        open={showCategoryBrowser}
        onOpenChange={setShowCategoryBrowser}
        onAddWidget={onAddWidget}
      />
      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        widgets={widgets}
        onClearAllWidgets={onClearAllWidgets}
        onImportWidgets={onImportWidgets}
        settings={settings}
        onUpdateSettings={onUpdateSettings}
      />
    </>
  )
}
