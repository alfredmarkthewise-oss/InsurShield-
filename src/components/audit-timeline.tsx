"use client";

import { FileText, ShieldCheck, Search, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import type { AuditEntry } from "@/lib/mock-data";

const agentConfig = {
  drafter: { icon: FileText, color: "text-accent", bg: "bg-accent/10", label: "Drafter" },
  scrubber: { icon: ShieldCheck, color: "text-purple-400", bg: "bg-purple-400/10", label: "Scrubber" },
  auditor: { icon: Search, color: "text-amber-400", bg: "bg-amber-400/10", label: "Auditor" },
};

const resultIcon = {
  pass: { icon: CheckCircle2, color: "text-success" },
  fail: { icon: XCircle, color: "text-danger" },
  warning: { icon: AlertTriangle, color: "text-warning" },
};

export function AuditTimeline({ entries }: { entries: AuditEntry[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
        Audit Trail
      </h3>
      <div className="relative space-y-0">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border" />

        {entries.map((entry, idx) => {
          const agent = agentConfig[entry.agent];
          const result = resultIcon[entry.result];
          const AgentIcon = agent.icon;
          const ResultIcon = result.icon;
          const time = new Date(entry.timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });

          return (
            <div key={entry.id} className="relative flex gap-3 py-2.5 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
              {/* Node */}
              <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-lg ${agent.bg} flex-shrink-0`}>
                <AgentIcon className={`w-3.5 h-3.5 ${agent.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${agent.color}`}>{agent.label}</span>
                  <span className="text-[10px] text-text-tertiary font-mono">{time}</span>
                  <ResultIcon className={`w-3 h-3 ml-auto flex-shrink-0 ${result.color}`} />
                </div>
                <p className="text-sm text-text-secondary mt-0.5">{entry.action}</p>
                <p className="text-xs text-text-tertiary mt-1 leading-relaxed">{entry.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
