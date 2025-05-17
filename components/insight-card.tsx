import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface InsightCardProps {
  pattern: string
  insight: string
  recommendation: string
  severity?: "high" | "medium" | "low"
}

export default function InsightCard({ pattern, insight, recommendation, severity = "medium" }: InsightCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden mb-6",
        severity === "high"
          ? "border-l-4 border-l-red-400"
          : severity === "medium"
            ? "border-l-4 border-l-yellow-400"
            : "border-l-4 border-l-green-400",
      )}
    >
      <CardHeader className="pb-0 pt-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                severity === "high" ? "bg-red-100" : severity === "medium" ? "bg-yellow-100" : "bg-green-100",
              )}
            >
              <Lightbulb
                className={cn(
                  "h-5 w-5",
                  severity === "high" ? "text-red-600" : severity === "medium" ? "text-yellow-600" : "text-green-600",
                )}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{pattern}</h3>
              <p className="text-gray-600 mt-1">{insight}</p>
            </div>
          </div>
          <div
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              severity === "high"
                ? "bg-red-100 text-red-800"
                : severity === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800",
            )}
          >
            {severity === "high" ? "High Priority" : severity === "medium" ? "Medium Priority" : "Low Priority"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div
          className={cn(
            "p-4 rounded-lg",
            severity === "high" ? "bg-red-50" : severity === "medium" ? "bg-yellow-50" : "bg-green-50",
          )}
        >
          <div className="flex items-start">
            <div>
              <p className="font-medium text-gray-900 mb-1">Recommendation:</p>
              <p className="text-gray-700">{recommendation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
