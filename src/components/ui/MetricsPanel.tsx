import React from "react";
import { Settings, RotateCcw, Zap } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

interface MetricsPanelProps {
  metrics?: Metric[];
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  const defaultMetrics: Metric[] = [
    {
      label: "كفاءة التفكيك",
      value: 87,
      icon: <Settings className="h-5 w-5" />,
      color: "from-blue-400 to-blue-600",
      bgGradient: "bg-gradient-blue",
    },
    {
      label: "قابلية إعادة التدوير",
      value: 94,
      icon: <RotateCcw className="h-5 w-5" />,
      color: "from-green-400 to-green-600",
      bgGradient: "bg-gradient-green",
    },
    {
      label: "سرعة التفكيك",
      value: 76,
      icon: <Zap className="h-5 w-5" />,
      color: "from-yellow-400 to-orange-500",
      bgGradient: "bg-gradient-warning",
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  const getProgressColor = (value: number): string => {
    if (value >= 80) return "bg-gradient-to-r from-green-400 to-green-600";
    if (value >= 60) return "bg-gradient-to-r from-yellow-400 to-orange-500";
    return "bg-gradient-to-r from-red-400 to-red-600";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-lg mb-4">نتائج التحليل</h3>

      {displayMetrics.map((metric, index) => (
        <div
          key={index}
          className="metric-card animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className={`p-2 rounded-lg ${metric.bgGradient} text-white`}>
                {metric.icon}
              </div>
              <span className="text-white font-medium">{metric.label}</span>
            </div>
            <span className="text-white font-bold text-lg">
              {metric.value}%
            </span>
          </div>

          <div className="progress-bar">
            <div
              className={`progress-fill ${getProgressColor(metric.value)}`}
              style={{
                width: `${metric.value}%`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      ))}
    </div>
  );
};
