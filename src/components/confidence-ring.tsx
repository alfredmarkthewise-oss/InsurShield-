"use client";

interface ConfidenceRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ConfidenceRing({ score, size = 48, strokeWidth = 4 }: ConfidenceRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - score * circumference;
  const percentage = Math.round(score * 100);

  const getColor = () => {
    if (score >= 0.95) return "#22c55e";
    if (score >= 0.80) return "#6366f1";
    if (score >= 0.60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-semibold text-text-primary">
        {percentage}%
      </span>
    </div>
  );
}
