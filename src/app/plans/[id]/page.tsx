"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Copy,
  RefreshCw,
  Clock,
  Hash,
  MapPin,
  Building2,
  Stethoscope,
  FileCode2,
  Target,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { StatusBadge } from "@/components/status-badge";
import { ConfidenceRing } from "@/components/confidence-ring";
import { LoopProgress } from "@/components/loop-progress";
import { AuditTimeline } from "@/components/audit-timeline";
import { CPT_CODES } from "@/lib/mock-data";

export default function PlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getPlanById } = useAppStore();
  const plan = getPlanById(params.id as string);

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-sm text-text-tertiary">Plan not found</p>
        <Link href="/plans" className="text-sm text-accent hover:text-accent-hover mt-2">
          Back to plans
        </Link>
      </div>
    );
  }

  const createdDate = new Date(plan.createdAt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const updatedDate = new Date(plan.updatedAt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 mt-0.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-overlay transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-semibold text-text-primary font-mono">{plan.id}</h1>
            <StatusBadge status={plan.status} />
            <ConfidenceRing score={plan.confidenceScore} size={32} strokeWidth={3} />
          </div>
          <p className="text-sm text-text-tertiary mt-0.5">
            {plan.clientInitials} · Age {plan.clientAge} · {plan.insuranceCarrier} · {plan.diagnosisLabel}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-text-secondary hover:border-border-hover transition-colors">
            <Copy className="w-3 h-3" />
            Copy
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-text-secondary hover:border-border-hover transition-colors">
            <Download className="w-3 h-3" />
            Export
          </button>
          {plan.status === "needs_revision" && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors">
              <RefreshCw className="w-3 h-3" />
              Resubmit
            </button>
          )}
        </div>
      </div>

      {/* Ralphloop Progress */}
      <div className="p-4 rounded-lg border border-border bg-surface-raised">
        <LoopProgress currentStage={plan.currentStage} iterations={plan.loopIterations} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Treatment Goals */}
          <div className="p-4 rounded-lg border border-border bg-surface-raised space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-semibold text-text-primary">Treatment Goals</h2>
              <span className="text-xs text-text-tertiary ml-auto">{plan.goals.length} goals</span>
            </div>

            {plan.goals.length === 0 ? (
              <p className="text-xs text-text-tertiary py-4 text-center">No goals defined yet</p>
            ) : (
              <div className="space-y-3">
                {plan.goals.map((goal, idx) => (
                  <div key={goal.id} className="p-3 rounded-md border border-border bg-surface space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-text-primary leading-relaxed">{goal.description}</p>
                    </div>
                    <div className="flex items-center gap-4 pl-7 text-xs">
                      <div>
                        <span className="text-text-tertiary">Baseline: </span>
                        <span className="text-text-secondary font-medium">{goal.baseline}</span>
                      </div>
                      <div>
                        <span className="text-text-tertiary">Target: </span>
                        <span className="text-text-secondary font-medium">{goal.target}</span>
                      </div>
                      <div>
                        <span className="text-text-tertiary">Timeframe: </span>
                        <span className="text-text-secondary font-medium">{goal.timeframe}</span>
                      </div>
                      <span
                        className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          goal.status === "met"
                            ? "bg-success/10 text-success"
                            : goal.status === "in_progress"
                            ? "bg-accent/10 text-accent"
                            : "bg-zinc-500/10 text-text-tertiary"
                        }`}
                      >
                        {goal.status === "in_progress" ? "In Progress" : goal.status === "met" ? "Met" : "Not Started"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Timeline */}
          <div className="p-4 rounded-lg border border-border bg-surface-raised">
            {plan.auditLog.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-text-tertiary">No audit entries yet. Submit the plan to begin processing.</p>
              </div>
            ) : (
              <AuditTimeline entries={plan.auditLog} />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Plan Details */}
          <div className="p-4 rounded-lg border border-border bg-surface-raised space-y-3">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Plan Details</h3>
            <div className="space-y-2.5">
              <DetailRow icon={Hash} label="Plan ID" value={plan.id} mono />
              <DetailRow icon={Clock} label="Created" value={createdDate} />
              <DetailRow icon={Clock} label="Updated" value={updatedDate} />
              <DetailRow icon={Stethoscope} label="Diagnosis" value={`${plan.diagnosisCode} — ${plan.diagnosisLabel}`} />
              <DetailRow icon={Building2} label="Carrier" value={plan.insuranceCarrier} />
              <DetailRow icon={MapPin} label="District" value={plan.schoolDistrict} />
              <DetailRow icon={MapPin} label="Location" value={plan.serviceLocation} />
            </div>
          </div>

          {/* CPT Codes */}
          <div className="p-4 rounded-lg border border-border bg-surface-raised space-y-3">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-3.5 h-3.5 text-text-tertiary" />
              <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider">CPT Codes</h3>
            </div>
            {plan.cptCodes.length === 0 ? (
              <p className="text-xs text-text-tertiary">No CPT codes selected</p>
            ) : (
              <div className="space-y-1.5">
                {plan.cptCodes.map((code) => {
                  const cptInfo = CPT_CODES.find((c) => c.code === code);
                  return (
                    <div key={code} className="flex items-start gap-2 p-2 rounded-md bg-surface">
                      <span className="text-xs font-mono text-accent font-medium">{code}</span>
                      <span className="text-xs text-text-tertiary">{cptInfo?.description}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Loop Stats */}
          <div className="p-4 rounded-lg border border-border bg-surface-raised space-y-3">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
              Ralphloop Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-md bg-surface text-center">
                <p className="text-lg font-semibold text-text-primary">{plan.loopIterations}</p>
                <p className="text-[10px] text-text-tertiary">Iterations</p>
              </div>
              <div className="p-2 rounded-md bg-surface text-center">
                <p className="text-lg font-semibold text-text-primary">
                  {Math.round(plan.confidenceScore * 100)}%
                </p>
                <p className="text-[10px] text-text-tertiary">Confidence</p>
              </div>
              <div className="p-2 rounded-md bg-surface text-center">
                <p className="text-lg font-semibold text-text-primary">{plan.auditLog.length}</p>
                <p className="text-[10px] text-text-tertiary">Audit Entries</p>
              </div>
              <div className="p-2 rounded-md bg-surface text-center">
                <p className="text-lg font-semibold text-text-primary">{plan.goals.length}</p>
                <p className="text-[10px] text-text-tertiary">Goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-3.5 h-3.5 text-text-tertiary mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-text-tertiary">{label}</p>
        <p className={`text-xs text-text-secondary ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}
