import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  gradient?: string;
  isActive?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  onClick,
  gradient = "bg-gradient-purple",
  isActive = false,
}) => {
  return (
    <div
      className={`feature-card ${isActive ? "ring-2 ring-white/40" : ""}`}
      onClick={onClick}
    >
      <div
        className={`w-16 h-16 ${gradient} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl`}
      >
        {icon}
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>

      <p className="text-white/70 text-sm leading-relaxed">{description}</p>

      <div className="mt-4 pt-4 border-t border-white/20">
        <button className="btn-secondary w-full">تفعيل الميزة</button>
      </div>
    </div>
  );
};
