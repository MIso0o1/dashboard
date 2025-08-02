"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"
import type { Widget } from "@/types/dashboard"

const SOPHISTICATED_COLORS = [
  "#1e40af", // Blue 800
  "#3b82f6", // Blue 500
  "#6366f1", // Indigo 500
  "#8b5cf6", // Violet 500
  "#a855f7", // Purple 500
  "#ec4899", // Pink 500
  "#059669", // Emerald 600
  "#d97706", // Amber 600
]

interface FinanceWidgetProps {
  widget: Widget
}

export function FinanceWidget({ widget }: FinanceWidgetProps) {
  const data = Array.isArray(widget.data) ? widget.data : []

  if (widget.chartType === "pie") {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#1e40af"
              dataKey="value"
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={SOPHISTICATED_COLORS[index % SOPHISTICATED_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #cbd5e1",
                borderRadius: "12px",
                boxShadow: "0 8px 32px -8px rgba(30, 64, 175, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            formatter={(value) => [`$${value}`, "Amount"]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #cbd5e1",
              borderRadius: "12px",
              boxShadow: "0 8px 32px -8px rgba(30, 64, 175, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          />
          <Legend />
          <Bar dataKey="value" fill="#1e40af" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
