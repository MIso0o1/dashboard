"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { Widget } from "@/types/dashboard"

interface InvestmentWidgetProps {
  widget: Widget
}

export function InvestmentWidget({ widget }: InvestmentWidgetProps) {
  const data = Array.isArray(widget.data) ? widget.data : []

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            formatter={(value) => [`$${value}`, "Portfolio Value"]}
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "0 8px 32px -8px rgba(217, 119, 6, 0.2)",
              backdropFilter: "blur(10px)",
              color: "hsl(var(--popover-foreground))",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#d97706"
            strokeWidth={3}
            name="Portfolio Value"
            dot={{ fill: "#d97706", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: "#f59e0b", stroke: "#d97706", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
