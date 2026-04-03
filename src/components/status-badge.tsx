import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileEdit,
  Loader2,
} from "lucide-react";
import type { PlanStatus } from "@/lib/mock-data";

const statusConfig: Record<
  PlanStatus,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  draft: {
    label: "Draft",
    color: "text-text-tertiary",
    bg: "bg-zinc-500/10",
    icon: FileEdit,
  },
  processing: {
    label: "Processing",
    color: "text-accent",
    bg: "bg-accent-muted",
    icon: Loader2,
  },
  approved: {
    label: "Approved",
    color: "text-success",
    bg: "bg-success-muted",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    color: "text-danger",
    bg: "bg-danger-muted",
    icon: XCircle,
  },
  needs_revision: {
    label: "Needs Revision",
    color: "text-warning",
    bg: "bg-warning-muted",
    icon: AlertTriangle,
  },
};

export function StatusBadge({ status }: { status: PlanStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}
    >
      <Icon
        className={`w-3 h-3 ${status === "processing" ? "animate-spin" : ""}`}
      />
      {config.label}
    </span>
  );
}
