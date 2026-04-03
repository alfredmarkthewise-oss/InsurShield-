export type PlanStatus = "draft" | "processing" | "approved" | "rejected" | "needs_revision";
export type LoopStage = "drafting" | "scrubbing" | "auditing" | "complete";

export interface TreatmentPlan {
  id: string;
  clientInitials: string;
  clientAge: number;
  diagnosisCode: string;
  diagnosisLabel: string;
  insuranceCarrier: string;
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
  confidenceScore: number;
  loopIterations: number;
  currentStage: LoopStage;
  cptCodes: string[];
  goals: PlanGoal[];
  auditLog: AuditEntry[];
  schoolDistrict: string;
  serviceLocation: string;
}

export interface PlanGoal {
  id: string;
  description: string;
  baseline: string;
  target: string;
  timeframe: string;
  status: "met" | "in_progress" | "not_started";
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  agent: "drafter" | "scrubber" | "auditor";
  action: string;
  detail: string;
  result: "pass" | "fail" | "warning";
}

export const INSURANCE_CARRIERS = [
  "Blue Cross Blue Shield",
  "Aetna",
  "UnitedHealthcare",
  "Cigna",
  "Humana",
  "Medicaid",
  "Tricare",
  "Magellan Health",
  "Optum",
  "Beacon Health",
];

export const CPT_CODES = [
  { code: "97151", description: "Behavior identification assessment" },
  { code: "97152", description: "Behavior identification supporting assessment" },
  { code: "97153", description: "Adaptive behavior treatment by protocol" },
  { code: "97154", description: "Group adaptive behavior treatment by protocol" },
  { code: "97155", description: "Adaptive behavior treatment with modification" },
  { code: "97156", description: "Family adaptive behavior treatment guidance" },
  { code: "97157", description: "Multiple-family group adaptive behavior treatment" },
  { code: "97158", description: "Group adaptive behavior treatment with modification" },
  { code: "0362T", description: "Behavior identification supporting assessment (tech)" },
  { code: "0373T", description: "Adaptive behavior treatment (tech, group)" },
];

export const DIAGNOSIS_CODES = [
  { code: "F84.0", label: "Autistic disorder" },
  { code: "F84.5", label: "Asperger's syndrome" },
  { code: "F84.9", label: "Pervasive developmental disorder, unspecified" },
  { code: "F90.0", label: "ADHD, predominantly inattentive type" },
  { code: "F90.1", label: "ADHD, predominantly hyperactive type" },
  { code: "F90.2", label: "ADHD, combined type" },
  { code: "F91.3", label: "Oppositional defiant disorder" },
  { code: "F80.1", label: "Expressive language disorder" },
  { code: "F80.2", label: "Mixed receptive-expressive language disorder" },
];

export const mockPlans: TreatmentPlan[] = [
  {
    id: "PLN-001",
    clientInitials: "J.M.",
    clientAge: 8,
    diagnosisCode: "F84.0",
    diagnosisLabel: "Autistic disorder",
    insuranceCarrier: "Blue Cross Blue Shield",
    status: "approved",
    createdAt: "2026-03-28T10:30:00Z",
    updatedAt: "2026-03-28T11:15:00Z",
    confidenceScore: 0.99,
    loopIterations: 3,
    currentStage: "complete",
    cptCodes: ["97151", "97153", "97155", "97156"],
    schoolDistrict: "Riverside USD",
    serviceLocation: "Riverside Elementary School",
    goals: [
      { id: "G1", description: "Client will independently initiate social interactions with peers during structured activities", baseline: "0 out of 10 opportunities", target: "8 out of 10 opportunities", timeframe: "6 months", status: "in_progress" },
      { id: "G2", description: "Client will use functional communication to request breaks from non-preferred tasks", baseline: "2 out of 10 opportunities", target: "9 out of 10 opportunities", timeframe: "6 months", status: "in_progress" },
      { id: "G3", description: "Client will follow multi-step classroom instructions with no more than 1 verbal prompt", baseline: "1 out of 10 opportunities", target: "8 out of 10 opportunities", timeframe: "6 months", status: "not_started" },
    ],
    auditLog: [
      { id: "A1", timestamp: "2026-03-28T10:31:00Z", agent: "drafter", action: "Initial draft generated", detail: "Generated treatment plan with 3 SMART goals aligned to functional behavioral assessment", result: "pass" },
      { id: "A2", timestamp: "2026-03-28T10:33:00Z", agent: "scrubber", action: "PHI/PII scan", detail: "Removed client full name, replaced with initials. Redacted school staff names.", result: "pass" },
      { id: "A3", timestamp: "2026-03-28T10:35:00Z", agent: "auditor", action: "Insurance screening - Iteration 1", detail: "REJECTED: Missing medical necessity language for 97155.", result: "fail" },
      { id: "A4", timestamp: "2026-03-28T10:40:00Z", agent: "drafter", action: "Revision applied (Delta)", detail: "Added medical necessity justification linking behavioral deficits to functional impairment.", result: "pass" },
      { id: "A5", timestamp: "2026-03-28T10:42:00Z", agent: "scrubber", action: "PHI/PII re-scan", detail: "No PHI detected in revised content.", result: "pass" },
      { id: "A6", timestamp: "2026-03-28T10:44:00Z", agent: "auditor", action: "Insurance screening - Iteration 2", detail: "WARNING: CPT 97156 missing caregiver training justification.", result: "warning" },
      { id: "A7", timestamp: "2026-03-28T10:50:00Z", agent: "drafter", action: "Minor revision applied", detail: "Added parent/caregiver training protocol with generalization goals.", result: "pass" },
      { id: "A8", timestamp: "2026-03-28T11:15:00Z", agent: "auditor", action: "Insurance screening - Iteration 3", detail: "APPROVED: All criteria met. Confidence: 0.99", result: "pass" },
    ],
  },
  {
    id: "PLN-002",
    clientInitials: "A.R.",
    clientAge: 6,
    diagnosisCode: "F84.0",
    diagnosisLabel: "Autistic disorder",
    insuranceCarrier: "UnitedHealthcare",
    status: "processing",
    createdAt: "2026-04-02T14:00:00Z",
    updatedAt: "2026-04-02T14:20:00Z",
    confidenceScore: 0.72,
    loopIterations: 2,
    currentStage: "auditing",
    cptCodes: ["97151", "97153", "97156"],
    schoolDistrict: "Sunnyvale USD",
    serviceLocation: "Sunnyvale Academy",
    goals: [
      { id: "G1", description: "Client will tolerate transitions without elopement", baseline: "Elopement in 7/10 transitions", target: "Elopement in 1/10 transitions", timeframe: "6 months", status: "not_started" },
      { id: "G2", description: "Client will complete 3-step hygiene routine independently", baseline: "Full physical prompting", target: "Independent with visual schedule", timeframe: "6 months", status: "not_started" },
    ],
    auditLog: [
      { id: "A1", timestamp: "2026-04-02T14:01:00Z", agent: "drafter", action: "Initial draft generated", detail: "Generated plan with 2 goals targeting elopement and self-care.", result: "pass" },
      { id: "A2", timestamp: "2026-04-02T14:05:00Z", agent: "scrubber", action: "PHI/PII scan", detail: "All clear.", result: "pass" },
      { id: "A3", timestamp: "2026-04-02T14:10:00Z", agent: "auditor", action: "Insurance screening - Iteration 1", detail: "REJECTED: UHC requires quantified baseline data for elopement.", result: "fail" },
      { id: "A4", timestamp: "2026-04-02T14:15:00Z", agent: "drafter", action: "Revision applied (Delta)", detail: "Added frequency/duration data for elopement baseline.", result: "pass" },
      { id: "A5", timestamp: "2026-04-02T14:20:00Z", agent: "auditor", action: "Insurance screening - Iteration 2", detail: "Evaluating revised plan against UHC criteria...", result: "warning" },
    ],
  },
  {
    id: "PLN-003",
    clientInitials: "T.K.",
    clientAge: 11,
    diagnosisCode: "F90.2",
    diagnosisLabel: "ADHD, combined type",
    insuranceCarrier: "Aetna",
    status: "needs_revision",
    createdAt: "2026-04-01T09:00:00Z",
    updatedAt: "2026-04-01T09:45:00Z",
    confidenceScore: 0.61,
    loopIterations: 4,
    currentStage: "complete",
    cptCodes: ["97151", "97155"],
    schoolDistrict: "Oakwood USD",
    serviceLocation: "Oakwood Middle School",
    goals: [
      { id: "G1", description: "Client will remain seated during 20-min instructional periods", baseline: "Leaves seat 8 times per 20-min period", target: "1 or fewer per 20-min period", timeframe: "6 months", status: "not_started" },
    ],
    auditLog: [
      { id: "A1", timestamp: "2026-04-01T09:01:00Z", agent: "drafter", action: "Initial draft generated", detail: "Generated plan targeting on-task behavior for ADHD client.", result: "pass" },
      { id: "A2", timestamp: "2026-04-01T09:05:00Z", agent: "scrubber", action: "PHI/PII scan", detail: "Teacher name found. Redacted.", result: "warning" },
      { id: "A3", timestamp: "2026-04-01T09:10:00Z", agent: "auditor", action: "Insurance screening - Iteration 1", detail: "REJECTED: Aetna requires ASD diagnosis for ABA services.", result: "fail" },
      { id: "A4", timestamp: "2026-04-01T09:45:00Z", agent: "auditor", action: "Max iterations reached", detail: "Unable to pass. BCBA review required.", result: "fail" },
    ],
  },
  {
    id: "PLN-004",
    clientInitials: "S.L.",
    clientAge: 5,
    diagnosisCode: "F84.0",
    diagnosisLabel: "Autistic disorder",
    insuranceCarrier: "Cigna",
    status: "approved",
    createdAt: "2026-03-25T08:00:00Z",
    updatedAt: "2026-03-25T08:30:00Z",
    confidenceScore: 0.98,
    loopIterations: 2,
    currentStage: "complete",
    cptCodes: ["97151", "97152", "97153", "97155", "97156"],
    schoolDistrict: "Maple Valley SD",
    serviceLocation: "Maple Valley Pre-K Center",
    goals: [
      { id: "G1", description: "Client will use AAC device to make 3-word requests", baseline: "0 AAC requests/day", target: "10 AAC requests/day", timeframe: "6 months", status: "in_progress" },
      { id: "G2", description: "Client will engage in parallel play for 5+ minutes", baseline: "0 minutes", target: "5 minutes", timeframe: "6 months", status: "not_started" },
    ],
    auditLog: [
      { id: "A1", timestamp: "2026-03-25T08:01:00Z", agent: "drafter", action: "Initial draft generated", detail: "Plan for pre-K client: AAC usage and social engagement.", result: "pass" },
      { id: "A2", timestamp: "2026-03-25T08:10:00Z", agent: "scrubber", action: "PHI/PII scan", detail: "All clear.", result: "pass" },
      { id: "A3", timestamp: "2026-03-25T08:15:00Z", agent: "auditor", action: "Insurance screening - Iteration 1", detail: "WARNING: Add AAC device model for Cigna DME pre-auth.", result: "warning" },
      { id: "A4", timestamp: "2026-03-25T08:20:00Z", agent: "drafter", action: "Revision applied", detail: "Added AAC device spec and DME justification.", result: "pass" },
      { id: "A5", timestamp: "2026-03-25T08:30:00Z", agent: "auditor", action: "Insurance screening - Iteration 2", detail: "APPROVED: All Cigna criteria met. Confidence: 0.98", result: "pass" },
    ],
  },
  {
    id: "PLN-005",
    clientInitials: "M.B.",
    clientAge: 9,
    diagnosisCode: "F84.9",
    diagnosisLabel: "PDD, unspecified",
    insuranceCarrier: "Medicaid",
    status: "draft",
    createdAt: "2026-04-03T07:30:00Z",
    updatedAt: "2026-04-03T07:30:00Z",
    confidenceScore: 0,
    loopIterations: 0,
    currentStage: "drafting",
    cptCodes: [],
    schoolDistrict: "Greenfield ISD",
    serviceLocation: "Greenfield Elementary",
    goals: [],
    auditLog: [],
  },
];

export const dashboardStats = {
  totalPlans: 47,
  approvedThisMonth: 12,
  avgLoopIterations: 2.4,
  approvalRate: 94.2,
  avgProcessingTime: "8.3 min",
  pendingReview: 3,
  rejectedThisMonth: 1,
  savedHours: 156,
};
