import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  accent?: "default" | "success" | "warning" | "danger";
}

const accentColors = {
  default: "text-accent bg-accent/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  danger: "text-danger bg-danger/10",
};

export function StatsCard({
  label,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent = "default",
}: StatsCardProps) {
  return (
    <div className="relative group p-4 rounded-lg border border-border bg-surface-raised hover:border-border-hover transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl font-semibold text-text-primary">{value}</p>
          {subtitle && (
            <p className="text-xs text-text-tertiary">{subtitle}</p>
          )}
          {trend && (
            <p
              className={`text-xs font-medium ${
                trend.positive ? "text-success" : "text-danger"
              }`}
            >
              {trend.positive ? "+" : ""}
              {trend.value}
            </p>
          )}
        </div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${accentColors[accent]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shimmer" />
    </div>
  );
}
