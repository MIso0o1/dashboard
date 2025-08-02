"use client"

import { DollarSign, CheckCircle, Activity, TrendingUp } from "lucide-react"
import type { Widget } from "@/types/dashboard"

interface MetricWidgetProps {
  widget: Widget
}

export function MetricWidget({ widget }: MetricWidgetProps) {
  const metrics = [
    {
      label: "Total Savings",
      value: `$${widget.data.totalSavings?.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "text-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      change: "+12%",
      changeColor: "text-emerald-600",
    },
    {
      label: "Monthly Income",
      value: `$${widget.data.monthlyIncome?.toLocaleString() || "0"}`,
      icon: TrendingUp,
      color: "text-indigo-700",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-500",
      change: "+5%",
      changeColor: "text-emerald-600",
    },
    {
      label: "Tasks Completed",
      value: widget.data.completedTasks || "0",
      icon: CheckCircle,
      color: "text-emerald-700",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-500",
      change: "+8",
      changeColor: "text-emerald-600",
    },
    {
      label: "Avg Daily Steps",
      value: widget.data.avgSteps?.toLocaleString() || "0",
      icon: Activity,
      color: "text-amber-700",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      iconBg: "bg-amber-500",
      change: "+2.1k",
      changeColor: "text-emerald-600",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 h-full p-2">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`flex flex-col justify-between p-4 rounded-xl ${metric.bgColor} hover-lift border border-white/50 shadow-sm transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-lg ${metric.iconBg} shadow-md`}>
              <metric.icon className="h-4 w-4 text-white" />
            </div>
            <div className={`text-xs font-semibold px-2 py-1 rounded-full bg-white/60 ${metric.changeColor}`}>
              {metric.change}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide leading-tight">{metric.label}</p>
            <p className={`text-2xl font-bold ${metric.color} leading-none`}>{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
