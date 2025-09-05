"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Widget } from "@/types/dashboard"
import { FinanceWidget } from "@/components/widgets/finance-widget"
import { TodoWidget } from "@/components/widgets/todo-widget"
import { HealthWidget } from "@/components/widgets/health-widget"
import { InvestmentWidget } from "@/components/widgets/investment-widget"
import { MetricWidget } from "@/components/widgets/metric-widget"
import { EditWidgetDialog } from "@/components/edit-widget-dialog"

interface WidgetCardProps {
  widget: Widget
  onUpdate: (updates: Partial<Widget>) => void
  onDelete: () => void
}

export function WidgetCard({ widget, onUpdate, onDelete }: WidgetCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Edit clicked for widget:", widget.id)
    setShowEditDialog(true)
    setShowDropdown(false)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Delete clicked for widget:", widget.id)
    onDelete()
    setShowDropdown(false)
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Three dots clicked for widget:", widget.id)
    setShowDropdown(!showDropdown)
  }

  const renderWidgetContent = () => {
    switch (widget.type) {
      case "finance":
        return <FinanceWidget widget={widget} />
      case "todo":
        return <TodoWidget widget={widget} onUpdate={onUpdate} />
      case "health":
        return <HealthWidget widget={widget} />
      case "investment":
        return <InvestmentWidget widget={widget} />
      case "metric":
        return <MetricWidget widget={widget} />
      case "lifestyle":
        return <TodoWidget widget={widget} onUpdate={onUpdate} />
      default:
        return <div className="p-4 text-center text-muted-foreground">Unknown widget type</div>
    }
  }

  const getCardHeight = () => {
    switch (widget.type) {
      case "todo":
        return "h-80"
      case "metric":
        return "h-64"
      case "lifestyle":
        return "h-80"
      default:
        return "h-80"
    }
  }

  const getCardStyle = () => {
    switch (widget.type) {
      case "finance":
        return "finance-card"
      case "health":
        return "health-card"
      case "todo":
        return "productivity-card"
      case "investment":
        return "investment-card"
      case "lifestyle":
        return "lifestyle-card"
      case "metric":
        return "enhanced-card"
      default:
        return "enhanced-card"
    }
  }

  return (
    <>
      <Card className={`${getCardHeight()} flex flex-col hover-lift ${getCardStyle()}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 flex-shrink-0 glass-effect rounded-t-xl">
          <CardTitle className="text-sm font-bold truncate text-slate-800">
            {widget.title}
          </CardTitle>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 flex-shrink-0 hover:bg-white/50 focus-glow"
              onClick={toggleDropdown}
            >
              <MoreHorizontal className="h-4 w-4 text-slate-600" />
            </Button>
            {showDropdown && (
              <div className="absolute right-0 top-8 bg-white border shadow-xl z-[9999] rounded-md min-w-[8rem] p-1">
                <button
                  onClick={handleEditClick}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-white/50 text-slate-700 cursor-pointer rounded-sm"
                >
                  <Edit className="h-4 w-4 text-blue-600" />
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50/50 cursor-pointer rounded-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-2 bg-white/30">
          {renderWidgetContent()}
        </CardContent>
      </Card>

      <EditWidgetDialog widget={widget} open={showEditDialog} onOpenChange={setShowEditDialog} onUpdate={onUpdate} />
    </>
  )
}