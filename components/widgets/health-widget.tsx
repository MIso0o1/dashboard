"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { Widget } from "@/types/dashboard"

interface HealthWidgetProps {
  widget: Widget
}

export function HealthWidget({ widget }: HealthWidgetProps) {
  const data = Array.isArray(widget.data) ? widget.data : []

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #cbd5e1",
              borderRadius: "12px",
              boxShadow: "0 8px 32px -8px rgba(5, 150, 105, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          />
          <Legend />
          <Bar dataKey="steps" fill="#059669" name="Steps" radius={[3, 3, 0, 0]} />
          <Bar dataKey="calories" fill="#10b981" name="Calories" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
