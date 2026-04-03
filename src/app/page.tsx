"use client";

import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { StatusBadge } from "@/components/status-badge";
import { ConfidenceRing } from "@/components/confidence-ring";
import { LoopProgress } from "@/components/loop-progress";
import { useAppStore } from "@/store/app-store";
import { dashboardStats } from "@/lib/mock-data";

export default function Dashboard() {
  const { plans } = useAppStore();
  const recentPlans = plans.slice(0, 4);
  const processingPlan = plans.find((p) => p.status === "processing");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>
          <p className="text-sm text-text-tertiary mt-0.5">
            Welcome back, Dr. Chen. Here&apos;s your authorization overview.
          </p>
        </div>
        <Link
          href="/new-plan"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
        >
          <Zap className="w-3.5 h-3.5" />
          New Plan
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Plans"
          value={dashboardStats.totalPlans}
          subtitle="All time"
          icon={FileText}
          trend={{ value: "8 this month", positive: true }}
        />
        <StatsCard
          label="Approval Rate"
          value={`${dashboardStats.approvalRate}%`}
          subtitle="Last 30 days"
          icon={CheckCircle2}
          accent="success"
          trend={{ value: "2.1%", positive: true }}
        />
        <StatsCard
          label="Avg Processing"
          value={dashboardStats.avgProcessingTime}
          subtitle="Per plan"
          icon={Clock}
          trend={{ value: "1.2 min faster", positive: true }}
        />
        <StatsCard
          label="Hours Saved"
          value={dashboardStats.savedHours}
          subtitle="vs. manual submission"
          icon={TrendingUp}
          accent="success"
        />
      </div>

      {/* Active Processing */}
      {processingPlan && (
        <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-4 h-4 text-accent loop-spin" />
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                Active Processing — {processingPlan.id}
              </h2>
              <p className="text-xs text-text-tertiary">
                {processingPlan.clientInitials} · {processingPlan.insuranceCarrier} · {processingPlan.diagnosisLabel}
              </p>
            </div>
            <Link
              href={`/plans/${processingPlan.id}`}
              className="ml-auto text-xs text-accent hover:text-accent-hover font-medium flex items-center gap-1"
            >
              View Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <LoopProgress
            currentStage={processingPlan.currentStage}
            iterations={processingPlan.loopIterations}
          />
        </div>
      )}

      {/* Recent Plans & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Plans Table */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-surface-raised overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-text-primary">Recent Plans</h2>
            <Link
              href="/plans"
              className="text-xs text-accent hover:text-accent-hover font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentPlans.map((plan) => (
              <Link
                key={plan.id}
                href={`/plans/${plan.id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-surface-overlay transition-colors"
              >
                <ConfidenceRing score={plan.confidenceScore} size={36} strokeWidth={3} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">{plan.id}</span>
                    <span className="text-xs text-text-tertiary">·</span>
                    <span className="text-xs text-text-secondary">{plan.clientInitials}</span>
                  </div>
                  <p className="text-xs text-text-tertiary truncate">
                    {plan.insuranceCarrier} · {plan.diagnosisLabel} · {plan.cptCodes.length} CPT codes
                  </p>
                </div>
                <StatusBadge status={plan.status} />
                <ArrowRight className="w-3.5 h-3.5 text-text-tertiary" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-4">
          {/* Approval Breakdown */}
          <div className="p-4 rounded-lg border border-border bg-surface-raised">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              This Month
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  <span className="text-sm text-text-secondary">Approved</span>
                </div>
                <span className="text-sm font-semibold text-text-primary">{dashboardStats.approvedThisMonth}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                  <span className="text-sm text-text-secondary">Pending Review</span>
                </div>
                <span className="text-sm font-semibold text-text-primary">{dashboardStats.pendingReview}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5 text-danger" />
                  <span className="text-sm text-text-secondary">Rejected</span>
                </div>
                <span className="text-sm font-semibold text-text-primary">{dashboardStats.rejectedThisMonth}</span>
              </div>
            </div>
          </div>

          {/* Engine Performance */}
          <div className="p-4 rounded-lg border border-border bg-surface-raised">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Ralphloop Performance
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-tertiary">Avg. Iterations</span>
                  <span className="text-xs font-mono text-text-secondary">{dashboardStats.avgLoopIterations}</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-700"
                    style={{ width: `${(dashboardStats.avgLoopIterations / 5) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-tertiary">First-Pass Rate</span>
                  <span className="text-xs font-mono text-text-secondary">18%</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
                  <div className="h-full rounded-full bg-success transition-all duration-700" style={{ width: "18%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-tertiary">Confidence Threshold</span>
                  <span className="text-xs font-mono text-text-secondary">0.98</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
                  <div className="h-full rounded-full bg-purple-500 transition-all duration-700" style={{ width: "98%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="p-4 rounded-lg border border-border bg-surface-raised">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
              Quick Actions
            </h3>
            <div className="space-y-2 text-xs text-text-tertiary">
              <div className="flex items-center justify-between">
                <span>Command Palette</span>
                <div className="flex gap-0.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-mono">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-mono">K</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>New Plan</span>
                <div className="flex gap-0.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-mono">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-mono">N</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
