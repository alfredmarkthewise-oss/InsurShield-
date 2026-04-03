"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowRight,
  ArrowUpDown,
  FileText,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { ConfidenceRing } from "@/components/confidence-ring";
import { useAppStore } from "@/store/app-store";
import type { PlanStatus } from "@/lib/mock-data";

const statusFilters: { value: PlanStatus | "all"; label: string }[] = [
  { value: "all", label: "All Plans" },
  { value: "approved", label: "Approved" },
  { value: "processing", label: "Processing" },
  { value: "needs_revision", label: "Needs Revision" },
  { value: "rejected", label: "Rejected" },
  { value: "draft", label: "Draft" },
];

export default function PlansPage() {
  const { plans } = useAppStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PlanStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "confidence">("date");

  const filtered = plans
    .filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.id.toLowerCase().includes(q) ||
          p.clientInitials.toLowerCase().includes(q) ||
          p.insuranceCarrier.toLowerCase().includes(q) ||
          p.diagnosisLabel.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "confidence") return b.confidenceScore - a.confidenceScore;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Treatment Plans</h1>
          <p className="text-sm text-text-tertiary mt-0.5">
            {plans.length} total plans · {plans.filter((p) => p.status === "approved").length} approved
          </p>
        </div>
        <Link
          href="/new-plan"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          New Plan
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search by ID, client, carrier, diagnosis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-surface-raised text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <Filter className="w-4 h-4 text-text-tertiary flex-shrink-0 mr-1" />
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === f.value
                  ? "bg-accent/10 text-accent"
                  : "text-text-tertiary hover:text-text-secondary hover:bg-surface-overlay"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <button
          onClick={() => setSortBy(sortBy === "date" ? "confidence" : "date")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-text-secondary hover:border-border-hover transition-colors"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {sortBy === "date" ? "By Date" : "By Confidence"}
        </button>
      </div>

      {/* Plans Table */}
      <div className="rounded-lg border border-border bg-surface-raised overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[1fr_120px_140px_100px_100px_40px] gap-4 px-4 py-2.5 border-b border-border text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
          <span>Plan / Client</span>
          <span>Carrier</span>
          <span>Diagnosis</span>
          <span>Confidence</span>
          <span>Status</span>
          <span />
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-text-tertiary">No plans match your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((plan) => {
              const date = new Date(plan.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
              return (
                <Link
                  key={plan.id}
                  href={`/plans/${plan.id}`}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_120px_140px_100px_100px_40px] gap-2 sm:gap-4 items-center px-4 py-3 hover:bg-surface-overlay transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-text-primary font-mono">
                          {plan.id}
                        </span>
                        <span className="text-xs text-text-tertiary">{date}</span>
                      </div>
                      <p className="text-xs text-text-secondary">
                        {plan.clientInitials} · Age {plan.clientAge} · {plan.schoolDistrict}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-text-secondary">{plan.insuranceCarrier}</span>
                  <span className="text-xs text-text-secondary font-mono">
                    {plan.diagnosisCode} <span className="text-text-tertiary font-sans">({plan.diagnosisLabel.split(" ")[0]})</span>
                  </span>
                  <div>
                    <ConfidenceRing score={plan.confidenceScore} size={32} strokeWidth={3} />
                  </div>
                  <StatusBadge status={plan.status} />
                  <ArrowRight className="w-3.5 h-3.5 text-text-tertiary hidden sm:block" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
