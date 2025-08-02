"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, CheckSquare, Heart, TrendingUp, Target, Clock, Briefcase, Dumbbell } from "lucide-react"
import type { Widget, WidgetType } from "@/types/dashboard"

interface WidgetTemplate {
  id: string
  name: string
  description: string
  icon: any
  type: WidgetType
  chartType?: "bar" | "line" | "pie"
  defaultData: any
  category: string
}

const widgetTemplates: WidgetTemplate[] = [
  // Finance Category
  {
    id: "monthly-budget",
    name: "Monthly Budget",
    description: "Track your monthly spending by category",
    icon: DollarSign,
    type: "finance",
    chartType: "pie",
    category: "finance",
    defaultData: [
      { name: "Housing", value: 1200 },
      { name: "Food", value: 600 },
      { name: "Transportation", value: 400 },
      { name: "Entertainment", value: 200 },
      { name: "Utilities", value: 300 },
    ],
  },
  {
    id: "expense-tracker",
    name: "Expense Tracker",
    description: "Monitor daily expenses with bar chart",
    icon: DollarSign,
    type: "finance",
    chartType: "bar",
    category: "finance",
    defaultData: [
      { name: "Week 1", value: 450 },
      { name: "Week 2", value: 380 },
      { name: "Week 3", value: 520 },
      { name: "Week 4", value: 410 },
    ],
  },
  {
    id: "savings-goal",
    name: "Savings Goal",
    description: "Track progress towards savings goals",
    icon: Target,
    type: "metric",
    category: "finance",
    defaultData: {
      currentSavings: 5000,
      savingsGoal: 10000,
      monthlyContribution: 500,
      progressPercent: 50,
    },
  },

  // Productivity Category
  {
    id: "daily-tasks",
    name: "Daily Tasks",
    description: "Manage your daily to-do list",
    icon: CheckSquare,
    type: "todo",
    category: "productivity",
    defaultData: [
      { id: "1", text: "Review morning emails", completed: false },
      { id: "2", text: "Team standup meeting", completed: true },
      { id: "3", text: "Complete project proposal", completed: false },
      { id: "4", text: "Grocery shopping", completed: false },
    ],
  },
  {
    id: "project-tracker",
    name: "Project Tracker",
    description: "Track project milestones and deadlines",
    icon: Briefcase,
    type: "todo",
    category: "productivity",
    defaultData: [
      { id: "1", text: "Design mockups", completed: true },
      { id: "2", text: "Frontend development", completed: false },
      { id: "3", text: "Backend API", completed: false },
      { id: "4", text: "Testing & QA", completed: false },
    ],
  },
  {
    id: "time-tracker",
    name: "Time Tracker",
    description: "Monitor time spent on different activities",
    icon: Clock,
    type: "finance",
    chartType: "pie",
    category: "productivity",
    defaultData: [
      { name: "Work", value: 8 },
      { name: "Exercise", value: 1 },
      { name: "Learning", value: 2 },
      { name: "Leisure", value: 3 },
    ],
  },

  // Health & Fitness Category
  {
    id: "fitness-tracker",
    name: "Fitness Tracker",
    description: "Track daily steps and calories",
    icon: Heart,
    type: "health",
    chartType: "bar",
    category: "health",
    defaultData: [
      { day: "Mon", steps: 8500, calories: 2200 },
      { day: "Tue", steps: 12000, calories: 2400 },
      { day: "Wed", steps: 6800, calories: 2100 },
      { day: "Thu", steps: 15000, calories: 2600 },
      { day: "Fri", steps: 9200, calories: 2300 },
    ],
  },
  {
    id: "workout-log",
    name: "Workout Log",
    description: "Log your weekly workouts",
    icon: Dumbbell,
    type: "health",
    category: "health",
    defaultData: [
      { id: "1", text: "Monday - Chest & Triceps", completed: true },
      { id: "2", text: "Wednesday - Back & Biceps", completed: false },
      { id: "3", text: "Friday - Legs & Shoulders", completed: false },
      { id: "4", text: "Sunday - Cardio", completed: false },
    ],
  },
  {
    id: "health-metrics",
    name: "Health Metrics",
    description: "Monitor key health indicators",
    icon: Heart,
    type: "metric",
    category: "health",
    defaultData: {
      weight: 70,
      bodyFat: 15,
      avgHeartRate: 72,
      sleepHours: 7.5,
    },
  },

  // Investment Category
  {
    id: "portfolio-performance",
    name: "Portfolio Performance",
    description: "Track investment portfolio over time",
    icon: TrendingUp,
    type: "investment",
    chartType: "line",
    category: "investment",
    defaultData: [
      { month: "Jan", value: 10000 },
      { month: "Feb", value: 10500 },
      { month: "Mar", value: 9800 },
      { month: "Apr", value: 11200 },
      { month: "May", value: 12100 },
      { month: "Jun", value: 11800 },
    ],
  },
  {
    id: "stock-allocation",
    name: "Stock Allocation",
    description: "View portfolio allocation by asset type",
    icon: TrendingUp,
    type: "finance",
    chartType: "pie",
    category: "investment",
    defaultData: [
      { name: "Stocks", value: 60 },
      { name: "Bonds", value: 25 },
      { name: "Real Estate", value: 10 },
      { name: "Cash", value: 5 },
    ],
  },

  // Lifestyle Category
  {
    id: "habit-tracker",
    name: "Habit Tracker",
    description: "Track daily habits and routines",
    icon: Target,
    type: "lifestyle", // Changed from "health" to "lifestyle"
    category: "lifestyle",
    defaultData: [
      { id: "1", text: "Drink 8 glasses of water", completed: true },
      { id: "2", text: "Read for 30 minutes", completed: false },
      { id: "3", text: "Meditate for 10 minutes", completed: true },
      { id: "4", text: "No social media before noon", completed: false },
    ],
  },
  {
    id: "mood-tracker",
    name: "Mood Tracker",
    description: "Monitor your daily mood patterns",
    icon: Heart,
    type: "lifestyle", // Changed from "health" to "lifestyle"
    chartType: "line",
    category: "lifestyle",
    defaultData: [
      { day: "Mon", steps: 7, calories: 8 },
      { day: "Tue", steps: 8, calories: 7 },
      { day: "Wed", steps: 6, calories: 6 },
      { day: "Thu", steps: 9, calories: 8 },
      { day: "Fri", steps: 8, calories: 9 },
    ],
  },
]

const categories = [
  {
    id: "finance",
    name: "Finance",
    icon: DollarSign,
    colors: {
      bg: "bg-blue-500",
      bgLight: "bg-slate-800",
      bgHover: "hover:bg-slate-700",
      text: "text-white",
      textLight: "text-slate-300",
      border: "border-slate-600",
      badge: "bg-blue-100 text-blue-800 border-blue-200",
      tabActive: "data-[state=active]:bg-blue-500 data-[state=active]:text-white",
      tabHover: "hover:bg-blue-100 hover:text-blue-700",
    },
  },
  {
    id: "productivity",
    name: "Tasks",
    icon: CheckSquare,
    colors: {
      bg: "bg-purple-500",
      bgLight: "bg-slate-800",
      bgHover: "hover:bg-slate-700",
      text: "text-white",
      textLight: "text-slate-300",
      border: "border-slate-600",
      badge: "bg-purple-100 text-purple-800 border-purple-200",
      tabActive: "data-[state=active]:bg-purple-500 data-[state=active]:text-white",
      tabHover: "hover:bg-purple-100 hover:text-purple-700",
    },
  },
  {
    id: "health",
    name: "Health",
    icon: Heart,
    colors: {
      bg: "bg-red-500",
      bgLight: "bg-slate-800",
      bgHover: "hover:bg-slate-700",
      text: "text-white",
      textLight: "text-slate-300",
      border: "border-slate-600",
      badge: "bg-red-100 text-red-800 border-red-200",
      tabActive: "data-[state=active]:bg-red-500 data-[state=active]:text-white",
      tabHover: "hover:bg-red-100 hover:text-red-700",
    },
  },
  {
    id: "investment",
    name: "Invest",
    icon: TrendingUp,
    colors: {
      bg: "bg-amber-500",
      bgLight: "bg-slate-800",
      bgHover: "hover:bg-slate-700",
      text: "text-white",
      textLight: "text-slate-300",
      border: "border-slate-600",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      tabActive: "data-[state=active]:bg-amber-500 data-[state=active]:text-white",
      tabHover: "hover:bg-amber-100 hover:text-amber-700",
    },
  },
  {
    id: "lifestyle",
    name: "Life",
    icon: Target,
    colors: {
      bg: "bg-emerald-500",
      bgLight: "bg-slate-800",
      bgHover: "hover:bg-slate-700",
      text: "text-white",
      textLight: "text-slate-300",
      border: "border-slate-600",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      tabActive: "data-[state=active]:bg-emerald-500 data-[state=active]:text-white",
      tabHover: "hover:bg-emerald-100 hover:text-emerald-700",
    },
  },
]

interface WidgetCategoryBrowserProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddWidget: (widget: Omit<Widget, "id">) => void
}

export function WidgetCategoryBrowser({ open, onOpenChange, onAddWidget }: WidgetCategoryBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState("finance")

  const handleAddWidget = (template: WidgetTemplate) => {
    const newWidget: Omit<Widget, "id"> = {
      title: template.name,
      type: template.type,
      chartType: template.chartType,
      data: template.defaultData,
      position: { x: 0, y: 0, w: 6, h: 4 },
    }
    onAddWidget(newWidget)
    onOpenChange(false)
  }

  const filteredTemplates = widgetTemplates.filter((template) => template.category === selectedCategory)
  const currentCategory = categories.find((cat) => cat.id === selectedCategory)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] w-[95vw] bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Widget Library</DialogTitle>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-slate-800">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={`flex flex-col items-center gap-1 p-3 text-xs transition-all text-slate-300 ${category.colors.tabActive} ${category.colors.tabHover}`}
              >
                <category.icon className="h-4 w-4 flex-shrink-0" />
                <span className="text-center leading-tight font-medium">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <ScrollArea className="h-[500px] pr-4 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer hover-lift transition-all ${category.colors.bgLight} ${category.colors.border} ${category.colors.bgHover}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${category.colors.bg} text-white shadow-sm`}>
                              <template.icon className="h-4 w-4" />
                            </div>
                            <CardTitle className={`text-sm font-semibold ${category.colors.text}`}>
                              {template.name}
                            </CardTitle>
                          </div>
                          <Badge className={category.colors.badge}>{category.name}</Badge>
                        </div>
                        <CardDescription className={`text-xs ${category.colors.textLight}`}>
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button
                          size="sm"
                          className={`w-full ${category.colors.bg} hover:opacity-90 text-white shadow-sm`}
                          onClick={() => handleAddWidget(template)}
                        >
                          Add to Dashboard
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
