import React, { useState } from "react";
import {
  Brain,
  Play,
  Settings,
  BarChart3,
  FileText,
  Lightbulb,
} from "lucide-react";

interface AnalysisPanelProps {
  onStartAnalysis?: () => void;
  onCreateNewDesign?: () => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  onStartAnalysis,
  onCreateNewDesign,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    onStartAnalysis?.();

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const settings = [
    { label: "تحليل تلقائي", enabled: true },
    { label: "تحسين المواد", enabled: true },
    { label: "محاكاة التفكيك", enabled: false },
    { label: "تقييم البيئة", enabled: true },
    { label: "حساب التكاليف", enabled: false },
  ];

  return (
    <div className="space-y-6">
      {/* Control Buttons */}
      <div className="space-y-3">
        <button
          className={`btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse ${
            isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>جاري التحليل...</span>
            </>
          ) : (
            <>
              <Brain className="h-5 w-5" />
              <span>تحليل بالذكاء الاصطناعي</span>
            </>
          )}
        </button>

        <button
          className="btn-secondary w-full flex items-center justify-center space-x-2 space-x-reverse"
          onClick={onCreateNewDesign}
        >
          <Play className="h-5 w-5" />
          <span>إنشاء تصميم جديد</span>
        </button>
      </div>

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="glass-panel p-4 space-y-3">
          <h4 className="text-white font-medium flex items-center space-x-2 space-x-reverse">
            <Brain className="h-5 w-5 animate-pulse" />
            <span>التحليل قيد التشغيل</span>
          </h4>

          <div className="space-y-2">
            {[
              "تحليل الهيكل الهندسي",
              "تحديد نقاط التفكيك",
              "تقييم المواد",
              "حساب الكفاءة",
              "إنتاج التوصيات",
            ].map((step, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 space-x-reverse text-white/80 text-sm"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Panel */}
      <div className="glass-panel p-4 space-y-4">
        <h4 className="text-white font-medium flex items-center space-x-2 space-x-reverse">
          <Settings className="h-5 w-5" />
          <span>إعدادات التحليل</span>
        </h4>

        <div className="space-y-3">
          {settings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-white/80 text-sm">{setting.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={setting.enabled}
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      {analysisComplete && (
        <div className="glass-panel p-4 space-y-4 animate-fade-in">
          <h4 className="text-white font-medium flex items-center space-x-2 space-x-reverse">
            <BarChart3 className="h-5 w-5" />
            <span>إحصائيات سريعة</span>
          </h4>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="glass-card p-3">
              <div className="text-2xl font-bold text-blue-400">12</div>
              <div className="text-xs text-white/60">نقاط التفكيك</div>
            </div>
            <div className="glass-card p-3">
              <div className="text-2xl font-bold text-green-400">5</div>
              <div className="text-xs text-white/60">أنواع المواد</div>
            </div>
            <div className="glass-card p-3">
              <div className="text-2xl font-bold text-yellow-400">3.2</div>
              <div className="text-xs text-white/60">دقائق للتفكيك</div>
            </div>
            <div className="glass-card p-3">
              <div className="text-2xl font-bold text-purple-400">87%</div>
              <div className="text-xs text-white/60">كفاءة التصميم</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="btn-secondary w-full flex items-center justify-center space-x-2 space-x-reverse">
          <FileText className="h-4 w-4" />
          <span>تصدير التقرير</span>
        </button>

        <button className="btn-secondary w-full flex items-center justify-center space-x-2 space-x-reverse">
          <Lightbulb className="h-4 w-4" />
          <span>عرض التوصيات</span>
        </button>
      </div>
    </div>
  );
};
