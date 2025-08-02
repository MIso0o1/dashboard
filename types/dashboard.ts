export type WidgetType = "finance" | "todo" | "health" | "investment" | "metric" | "lifestyle"

export interface Widget {
  id: string
  type: WidgetType
  title: string
  data: any
  chartType?: "bar" | "line" | "pie"
  position: {
    x: number
    y: number
    w: number
    h: number
  }
}
