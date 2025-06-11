import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* 404 Animation */}
        <div className="animate-float">
          <div className="text-8xl md:text-9xl font-bold text-white/20 mb-4">
            404
          </div>
        </div>

        {/* Glass Panel */}
        <div className="glass-panel p-8 space-y-6">
          <div className="w-20 h-20 bg-gradient-blue rounded-full flex items-center justify-center mx-auto text-4xl">
            🤖
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">الصفحة غير موجودة</h1>
            <p className="text-white/80 text-lg">
              عذراً، لا يمكن العثور على الصفحة التي تبحث عنها
            </p>
            <p className="text-white/60 text-sm">
              ربما تم نقل الصفحة أو حذفها، أو قمت بكتابة عنوان خاطئ
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Home className="h-5 w-5" />
              <span>العودة للصفحة الرئيسية</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="btn-secondary w-full flex items-center justify-center space-x-2 space-x-reverse"
            >
              <ArrowRight className="h-5 w-5" />
              <span>العودة للصفحة السابقة</span>
            </button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="glass-card p-4 text-right">
          <h3 className="text-white font-medium mb-2">تحتاج مساعدة؟</h3>
          <p className="text-white/70 text-sm">
            يمكنك الوصول إلى جميع ميزات النظام من الصفحة الرئيسية
          </p>
        </div>
      </div>
    </div>
  );
}
