"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
        return "finance-card dark:bg-slate-800 dark:border-blue-500/30"
      case "health":
        return "health-card dark:bg-slate-800 dark:border-orange-500/30"
      case "todo":
        return "productivity-card dark:bg-slate-800 dark:border-purple-500/30"
      case "investment":
        return "investment-card dark:bg-slate-800 dark:border-amber-500/30"
      case "lifestyle":
        return "lifestyle-card dark:bg-slate-800 dark:border-emerald-500/30"
      case "metric":
        return "enhanced-card dark:bg-slate-800 dark:border-slate-600"
      default:
        return "enhanced-card dark:bg-slate-800 dark:border-slate-600"
    }
  }

  return (
    <>
      <Card className={`${getCardHeight()} flex flex-col hover-lift ${getCardStyle()}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 flex-shrink-0 glass-effect dark:glass-dark rounded-t-xl">
          <CardTitle className="text-sm font-bold truncate text-slate-800 dark:text-slate-100">
            {widget.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 flex-shrink-0 hover:bg-white/50 dark:hover:bg-slate-700/50 focus-glow"
              >
                <MoreHorizontal className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="glass-effect dark:glass-dark border-white/20 dark:border-slate-600/20 shadow-xl"
            >
              <DropdownMenuItem
                onClick={() => setShowEditDialog(true)}
                className="hover:bg-white/50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
              >
                <Edit className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-2 bg-white/30 dark:bg-slate-800/30">
          {renderWidgetContent()}
        </CardContent>
      </Card>

      <EditWidgetDialog widget={widget} open={showEditDialog} onOpenChange={setShowEditDialog} onUpdate={onUpdate} />
    </>
  )
}
