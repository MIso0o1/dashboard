"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2, Download, Upload } from "lucide-react"
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

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  widgets: Widget[]
  onClearAllWidgets: () => void
  onImportWidgets: (widgets: Widget[]) => void
  settings: DashboardSettings
  onUpdateSettings: (settings: DashboardSettings) => void
}

export function SettingsDialog({
  open,
  onOpenChange,
  widgets,
  onClearAllWidgets,
  onImportWidgets,
  settings,
  onUpdateSettings,
}: SettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState<DashboardSettings>(settings)

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings)
    onOpenChange(false)
  }

  const handleExportData = () => {
    const exportData = {
      widgets,
      settings: localSettings,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dashboard-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string)
        if (importData.widgets && Array.isArray(importData.widgets)) {
          onImportWidgets(importData.widgets)
        }
        if (importData.settings) {
          setLocalSettings(importData.settings)
        }
      } catch (error) {
        console.error("Failed to import data:", error)
        alert("Failed to import data. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  const getWidgetStats = () => {
    const stats = {
      total: widgets.length,
      finance: widgets.filter((w) => w.type === "finance").length,
      todo: widgets.filter((w) => w.type === "todo").length,
      health: widgets.filter((w) => w.type === "health").length,
      investment: widgets.filter((w) => w.type === "investment").length,
      metric: widgets.filter((w) => w.type === "metric").length,
    }
    return stats
  }

  const stats = getWidgetStats()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Dashboard Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">General Settings</CardTitle>
                <CardDescription>Configure basic dashboard preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dashboardName">Dashboard Name</Label>
                  <Input
                    id="dashboardName"
                    value={localSettings.dashboardName}
                    onChange={(e) => setLocalSettings({ ...localSettings, dashboardName: e.target.value })}
                    placeholder="My Dashboard"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Save</Label>
                    <p className="text-sm text-muted-foreground">Automatically save changes</p>
                  </div>
                  <Switch
                    checked={localSettings.autoSave}
                    onCheckedChange={(checked) => setLocalSettings({ ...localSettings, autoSave: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">Data Refresh Interval (seconds)</Label>
                  <Select
                    value={localSettings.refreshInterval.toString()}
                    onValueChange={(value) =>
                      setLocalSettings({ ...localSettings, refreshInterval: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                      <SelectItem value="600">10 minutes</SelectItem>
                      <SelectItem value="0">Manual only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultChartType">Default Chart Type</Label>
                  <Select
                    value={localSettings.defaultChartType}
                    onValueChange={(value: "bar" | "line" | "pie") =>
                      setLocalSettings({ ...localSettings, defaultChartType: value })
                    }
                  >
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={localSettings.theme}
                    onValueChange={(value: "light" | "dark" | "system") =>
                      setLocalSettings({ ...localSettings, theme: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Grid Lines</Label>
                    <p className="text-sm text-muted-foreground">Display grid lines for widget alignment</p>
                  </div>
                  <Switch
                    checked={localSettings.showGridLines}
                    onCheckedChange={(checked) => setLocalSettings({ ...localSettings, showGridLines: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing between widgets</p>
                  </div>
                  <Switch
                    checked={localSettings.compactMode}
                    onCheckedChange={(checked) => setLocalSettings({ ...localSettings, compactMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable smooth animations and transitions</p>
                  </div>
                  <Switch
                    checked={localSettings.animationsEnabled}
                    onCheckedChange={(checked) => setLocalSettings({ ...localSettings, animationsEnabled: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Management</CardTitle>
                <CardDescription>Import, export, and manage your dashboard data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={handleExportData} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Dashboard
                  </Button>
                  <div>
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" id="import-file" />
                    <Button asChild variant="outline" className="w-full flex items-center gap-2 bg-transparent">
                      <label htmlFor="import-file" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                        Import Dashboard
                      </label>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Widget Statistics</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Total</span>
                      <Badge variant="secondary">{stats.total}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Finance</span>
                      <Badge variant="secondary">{stats.finance}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Tasks</span>
                      <Badge variant="secondary">{stats.todo}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Health</span>
                      <Badge variant="secondary">{stats.health}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Investment</span>
                      <Badge variant="secondary">{stats.investment}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Metrics</span>
                      <Badge variant="secondary">{stats.metric}</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-destructive">Danger Zone</Label>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear all widgets? This action cannot be undone.")) {
                        onClearAllWidgets()
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All Widgets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Dashboard Pro</CardTitle>
                <CardDescription>Information about your dashboard application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Version:</span>
                    <span>1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Last Updated:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Total Widgets:</span>
                    <span>{stats.total}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Drag and drop widget reordering</li>
                    <li>• 20+ pre-built widget templates</li>
                    <li>• Customizable charts and data</li>
                    <li>• Import/export dashboard configurations</li>
                    <li>• Responsive design for all devices</li>
                    <li>• Real-time data updates</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Keyboard Shortcuts</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Toggle Sidebar:</span>
                      <Badge variant="outline">Ctrl + B</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Add Widget:</span>
                      <Badge variant="outline">Ctrl + N</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Settings:</span>
                      <Badge variant="outline">Ctrl + ,</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Created By</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">Michal Šomský</span>
                  <a
                    href="mailto:michal.somsky@protonmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    michal.somsky@protonmail.com
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings} className="gradient-bg hover:opacity-90 shadow-lg">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
