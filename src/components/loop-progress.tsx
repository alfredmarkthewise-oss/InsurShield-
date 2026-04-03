"use client";

import { FileText, ShieldCheck, Search, CheckCircle2 } from "lucide-react";
import type { LoopStage } from "@/lib/mock-data";

const stages: { key: LoopStage; label: string; icon: React.ElementType }[] = [
  { key: "drafting", label: "Drafter Agent", icon: FileText },
  { key: "scrubbing", label: "Scrubber Agent", icon: ShieldCheck },
  { key: "auditing", label: "Auditor Agent", icon: Search },
  { key: "complete", label: "Complete", icon: CheckCircle2 },
];

interface LoopProgressProps {
  currentStage: LoopStage;
  iterations: number;
}

export function LoopProgress({ currentStage, iterations }: LoopProgressProps) {
  const currentIdx = stages.findIndex((s) => s.key === currentStage);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
          Ralphloop Progress
        </h3>
        <span className="text-xs text-text-tertiary font-mono">
          Iteration {iterations}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {stages.map((stage, idx) => {
          const isActive = idx === currentIdx;
          const isComplete = idx < currentIdx;
          const Icon = stage.icon;

          return (
            <div key={stage.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1 gap-1.5">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                    isComplete
                      ? "bg-success/20 text-success"
                      : isActive
                      ? "bg-accent/20 text-accent ring-2 ring-accent/30"
                      : "bg-surface-overlay text-text-tertiary"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
                </div>
                <span
                  className={`text-[10px] font-medium text-center ${
                    isComplete
                      ? "text-success"
                      : isActive
                      ? "text-accent"
                      : "text-text-tertiary"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {idx < stages.length - 1 && (
                <div
                  className={`h-px flex-shrink-0 w-6 mx-0.5 transition-colors duration-300 ${
                    idx < currentIdx ? "bg-success" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
