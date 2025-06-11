import React, { useState } from "react";
import {
  Target,
  Settings,
  Recycle,
  Zap,
  BarChart3,
  Brain,
  HelpCircle,
  Bell,
  Monitor,
  FileText,
  Lightbulb,
} from "lucide-react";
import { FileUploadArea } from "../components/ui/FileUploadArea";
import { MetricsPanel } from "../components/ui/MetricsPanel";
import { FeatureCard } from "../components/ui/FeatureCard";
import { ThreeDViewer } from "../components/ui/ThreeDViewer";
import { AnalysisPanel } from "../components/ui/AnalysisPanel";

export default function Index() {
  const [activeTab, setActiveTab] = useState<
    "viewer" | "analysis" | "recommendations"
  >("viewer");
  const [notification, setNotification] = useState<string | null>(null);

  const features = [
    {
      title: "تحليل دقيق",
      description:
        "تحليل شامل للتصميم باستخدام خوارزميات الذكاء الاصطناعي المتقدمة",
      icon: <Target />,
      gradient: "bg-gradient-blue",
    },
    {
      title: "آليات التفكيك",
      description: "تحديد أفضل نقاط التفكيك وتحسين العمليات الآلية",
      icon: <Settings />,
      gradient: "bg-gradient-purple",
    },
    {
      title: "استدامة بيئية",
      description: "تقييم الأثر البيئي وتحسين قابلية إعادة التدوير",
      icon: <Recycle />,
      gradient: "bg-gradient-green",
    },
    {
      title: "محاكاة سريعة",
      description: "محاكاة فورية لعمليات التفكيك والتجميع",
      icon: <Zap />,
      gradient: "bg-gradient-warning",
    },
    {
      title: "تقارير مفصلة",
      description: "تقارير شاملة مع إحصائيات دقيقة ورسوم بيانية",
      icon: <BarChart3 />,
      gradient: "bg-gradient-blue",
    },
    {
      title: "تعلم تلقائي",
      description: "تحسين مستمر للتوصيات بناءً على البيانات المحللة",
      icon: <Brain />,
      gradient: "bg-gradient-purple",
    },
  ];

  const tabs = [
    {
      id: "viewer",
      label: "عارض التصميم",
      icon: <Monitor className="h-4 w-4" />,
    },
    {
      id: "analysis",
      label: "التحليل المفصل",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      id: "recommendations",
      label: "التوصيات",
      icon: <Lightbulb className="h-4 w-4" />,
    },
  ];

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFileUpload = (files: FileList) => {
    showNotification(`تم رفع ${files.length} ملف بنجاح`);
  };

  const handleStartAnalysis = () => {
    showNotification("بدء تحليل التصميم بالذكاء الاصطناعي");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "viewer":
        return (
          <div className="space-y-4">
            <ThreeDViewer modelType="product" />
            <div className="glass-panel p-4">
              <h3 className="text-white font-semibold mb-3">معلومات التصميم</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">اسم الملف:</span>
                  <span className="text-white mr-2">product_design_v2.dwg</span>
                </div>
                <div>
                  <span className="text-white/60">الحجم:</span>
                  <span className="text-white mr-2">2.4 MB</span>
                </div>
                <div>
                  <span className="text-white/60">تاريخ الإنشاء:</span>
                  <span className="text-white mr-2">2024-01-15</span>
                </div>
                <div>
                  <span className="text-white/60">الإصدار:</span>
                  <span className="text-white mr-2">2.0</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "analysis":
        return (
          <div className="glass-panel p-6 h-full">
            <h3 className="text-white font-semibold text-xl mb-6">
              التحليل التفصيلي
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">توزيع المواد</h4>
                <div className="space-y-2">
                  {[
                    {
                      material: "بلاستيك ABS",
                      percentage: 45,
                      color: "bg-blue-500",
                    },
                    { material: "معدن", percentage: 30, color: "bg-gray-500" },
                    { material: "مطاط", percentage: 15, color: "bg-green-500" },
                    {
                      material: "زجاج",
                      percentage: 10,
                      color: "bg-purple-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 space-x-reverse"
                    >
                      <div className={`w-4 h-4 rounded ${item.color}`}></div>
                      <span className="text-white/80 text-sm flex-1">
                        {item.material}
                      </span>
                      <span className="text-white font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">نقاط التفكيك</h4>
                <div className="space-y-3">
                  {[
                    {
                      point: "الوصلة الرئيسية",
                      difficulty: "سهل",
                      time: "30 ثانية",
                    },
                    {
                      point: "البراغي الجانبية",
                      difficulty: "متوسط",
                      time: "45 ثانية",
                    },
                    {
                      point: "اللوحة الأمامية",
                      difficulty: "صعب",
                      time: "2 دقيقة",
                    },
                  ].map((item, index) => (
                    <div key={index} className="glass-card p-3">
                      <div className="font-medium text-white text-sm">
                        {item.point}
                      </div>
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>الصعوبة: {item.difficulty}</span>
                        <span>الوقت: {item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "recommendations":
        return (
          <div className="glass-panel p-6 h-full">
            <h3 className="text-white font-semibold text-xl mb-6">
              التوصيات والتحسينات
            </h3>

            <div className="space-y-4">
              {[
                {
                  title: "تحسين نقطة التفكيك الرئيسية",
                  description:
                    "يمكن تقليل وقت التفكيك بـ 40% عبر استخدام وصلة قابلة للانفصال",
                  priority: "عالية",
                  impact: "40% تحسن في الكفاءة",
                },
                {
                  title: "استبدال المادة اللاصقة",
                  description:
                    "استخدام مادة لاصقة قابلة للذوبان لتسهيل عملية إعادة التدوير",
                  priority: "متوسطة",
                  impact: "25% تحسن في إعادة التدوير",
                },
                {
                  title: "إضافة علامات التفكيك",
                  description: "إضافة علامات بصرية لتوجيه عملية التفكيك الآلي",
                  priority: "منخفضة",
                  impact: "15% تحسن في السرعة",
                },
              ].map((rec, index) => (
                <div key={index} className="glass-card p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="text-white font-medium">{rec.title}</h4>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        rec.priority === "عالية"
                          ? "bg-red-500/20 text-red-300"
                          : rec.priority === "متوسطة"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">{rec.description}</p>
                  <div className="text-blue-300 text-sm font-medium">
                    {rec.impact}
                  </div>
                  <button className="btn-secondary">تطبيق التوصية</button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main p-6 space-y-6">
      {/* Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 notification">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Bell className="h-5 w-5 text-blue-400" />
            <span className="text-white">{notification}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="text-center space-y-4 animate-fade-in">
        <div className="flex items-center justify-center space-x-3 space-x-reverse">
          <div className="w-16 h-16 bg-gradient-blue rounded-full flex items-center justify-center text-3xl animate-float">
            🤖
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            نظام الذكاء الاصطناعي للتصميم ذاتي التفكيك
          </h1>
        </div>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">
          منصة متطورة لتحليل وتصميم المنتجات ذات التفكيك الذاتي باستخدام تقنيات
          الذكاء الاصطناعي والتعلم الآلي
        </p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* File Upload */}
          <div className="animate-slide-in-right">
            <FileUploadArea onFileUpload={handleFileUpload} />
          </div>

          {/* Analysis Panel */}
          <div
            className="animate-slide-in-right"
            style={{ animationDelay: "0.1s" }}
          >
            <AnalysisPanel
              onStartAnalysis={handleStartAnalysis}
              onCreateNewDesign={() => showNotification("إنشاء تصميم جديد")}
            />
          </div>

          {/* Metrics */}
          <div
            className="animate-slide-in-right"
            style={{ animationDelay: "0.2s" }}
          >
            <MetricsPanel />
          </div>
        </div>

        {/* Main Workspace */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <div className="glass-panel p-2 flex space-x-2 space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button flex items-center space-x-2 space-x-reverse ${
                  activeTab === tab.id ? "tab-active" : "tab-inactive"
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">{renderTabContent()}</div>
        </div>
      </div>

      {/* Feature Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          الميزات الرئيسية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
                onClick={() => showNotification(`تفعيل ميزة: ${feature.title}`)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Floating Help Button */}
      <div
        className="floating-help"
        onClick={() => showNotification("مساعدة: مرحباً! كيف يمكنني مساعدتك؟")}
      >
        <HelpCircle />
      </div>
    </div>
  );
}
