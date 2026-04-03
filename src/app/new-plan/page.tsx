"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap,
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Shield,
} from "lucide-react";
import {
  INSURANCE_CARRIERS,
  CPT_CODES,
  DIAGNOSIS_CODES,
} from "@/lib/mock-data";

interface GoalInput {
  id: number;
  description: string;
  baseline: string;
  target: string;
  timeframe: string;
}

export default function NewPlanPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    clientInitials: "",
    clientAge: "",
    diagnosisCode: "",
    insuranceCarrier: "",
    schoolDistrict: "",
    serviceLocation: "",
    selectedCptCodes: [] as string[],
    clinicalNotes: "",
  });

  const [goals, setGoals] = useState<GoalInput[]>([
    { id: 1, description: "", baseline: "", target: "", timeframe: "6 months" },
  ]);

  const addGoal = () => {
    setGoals([...goals, { id: Date.now(), description: "", baseline: "", target: "", timeframe: "6 months" }]);
  };

  const removeGoal = (id: number) => {
    if (goals.length > 1) setGoals(goals.filter((g) => g.id !== id));
  };

  const updateGoal = (id: number, field: keyof GoalInput, value: string) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const toggleCpt = (code: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCptCodes: prev.selectedCptCodes.includes(code)
        ? prev.selectedCptCodes.filter((c) => c !== code)
        : [...prev.selectedCptCodes, code],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Ralphloop processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      router.push("/plans/PLN-002");
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-24 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Plan Submitted to Ralphloop</h2>
        <p className="text-sm text-text-tertiary">
          The AI engine is now processing your treatment plan. Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-overlay transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-text-primary">New Treatment Plan</h1>
          <p className="text-sm text-text-tertiary mt-0.5">
            Submit a plan for AI-powered insurance authorization screening
          </p>
        </div>
      </div>

      {/* HIPAA Notice */}
      <div className="flex items-start gap-3 p-3 rounded-lg border border-accent/20 bg-accent/5">
        <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium text-accent">HIPAA Compliant Processing</p>
          <p className="text-xs text-text-tertiary mt-0.5">
            All client data is encrypted at rest (AES-256). PHI is automatically scrubbed before any external API calls. Use client initials only.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Information */}
        <section className="p-4 rounded-lg border border-border bg-surface-raised space-y-4">
          <h2 className="text-sm font-semibold text-text-primary">Client Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-tertiary mb-1.5">
                Client Initials *
              </label>
              <input
                type="text"
                placeholder="e.g. J.M."
                required
                maxLength={5}
                value={formData.clientInitials}
                onChange={(e) => setFormData({ ...formData, clientInitials: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-tertiary mb-1.5">
                Client Age *
              </label>
              <input
                type="number"
                placeholder="Age"
                required
                min={2}
                max={21}
                value={formData.clientAge}
                onChange={(e) => setFormData({ ...formData, clientAge: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-tertiary mb-1.5">
                Diagnosis Code *
              </label>
              <select
                required
                value={formData.diagnosisCode}
                onChange={(e) => setFormData({ ...formData, diagnosisCode: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-surface text-sm text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="">Select diagnosis</option>
                {DIAGNOSIS_CODES.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.code} — {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Insurance & Location */}
        <section className="p-4 rounded-lg border border-border bg-surface-raised space-y-4">
          <h2 className="text-sm font-semibold text-text-primary">Insurance & Service Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-tertiary mb-1.5">
                Insurance Carrier *
              </label>
              <select
                required
                value={formData.insuranceCarrier}
                onChange={(e) => setFormData({ ...formData, insuranceCarrier: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-surface text-sm text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="">Select carrier</option>
                {INSURANCE_CARRIERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-tertiary mb-1.5">
                School District *
              </label>
              <input
                type="text"
                placeholder="e.g. Riverside USD"
                required
                value={formData.schoolDistrict}
                onChange={(e) => setFormData({ ...formData, schoolDistrict: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-tertiary mb-1.5">
                Service Location *
              </label>
              <input
                type="text"
                placeholder="e.g. Riverside Elementary"
                required
                value={formData.serviceLocation}
                onChange={(e) => setFormData({ ...formData, serviceLocation: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
          </div>
        </section>

        {/* CPT Codes */}
        <section className="p-4 rounded-lg border border-border bg-surface-raised space-y-4">
          <h2 className="text-sm font-semibold text-text-primary">CPT Codes *</h2>
          <p className="text-xs text-text-tertiary -mt-2">Select all applicable procedure codes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CPT_CODES.map((cpt) => (
              <button
                key={cpt.code}
                type="button"
                onClick={() => toggleCpt(cpt.code)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md border text-left text-sm transition-colors ${
                  formData.selectedCptCodes.includes(cpt.code)
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-surface text-text-secondary hover:border-border-hover"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    formData.selectedCptCodes.includes(cpt.code)
                      ? "border-accent bg-accent"
                      : "border-border"
                  }`}
                >
                  {formData.selectedCptCodes.includes(cpt.code) && (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <span className="font-mono text-xs">{cpt.code}</span>
                  <span className="text-xs text-text-tertiary ml-2">{cpt.description}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Treatment Goals */}
        <section className="p-4 rounded-lg border border-border bg-surface-raised space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary">Treatment Goals (SMART Format)</h2>
            <button
              type="button"
              onClick={addGoal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-accent hover:bg-accent/10 transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Goal
            </button>
          </div>

          {goals.map((goal, idx) => (
            <div key={goal.id} className="p-3 rounded-md border border-border bg-surface space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-tertiary">Goal {idx + 1}</span>
                {goals.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGoal(goal.id)}
                    className="p-1 rounded text-text-tertiary hover:text-danger transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div>
                <label className="block text-xs text-text-tertiary mb-1">Goal Description *</label>
                <textarea
                  placeholder="Client will [specific behavior] in [specific context]..."
                  required
                  rows={2}
                  value={goal.description}
                  onChange={(e) => updateGoal(goal.id, "description", e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-border bg-surface-raised text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-text-tertiary mb-1">Baseline Data *</label>
                  <input
                    type="text"
                    placeholder="e.g. 0 out of 10"
                    required
                    value={goal.baseline}
                    onChange={(e) => updateGoal(goal.id, "baseline", e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-border bg-surface-raised text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-tertiary mb-1">Target *</label>
                  <input
                    type="text"
                    placeholder="e.g. 8 out of 10"
                    required
                    value={goal.target}
                    onChange={(e) => updateGoal(goal.id, "target", e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-border bg-surface-raised text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-tertiary mb-1">Timeframe</label>
                  <select
                    value={goal.timeframe}
                    onChange={(e) => updateGoal(goal.id, "timeframe", e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-border bg-surface-raised text-sm text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  >
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="9 months">9 months</option>
                    <option value="12 months">12 months</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Clinical Notes */}
        <section className="p-4 rounded-lg border border-border bg-surface-raised space-y-3">
          <h2 className="text-sm font-semibold text-text-primary">Additional Clinical Notes</h2>
          <textarea
            rows={4}
            placeholder="Provide any additional context about the client's behavioral presentation, previous interventions, or carrier-specific requirements..."
            value={formData.clinicalNotes}
            onChange={(e) => setFormData({ ...formData, clinicalNotes: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-border bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
          />
          <div className="flex items-start gap-2 text-xs text-text-tertiary">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>
              Do not include full names, SSNs, or any identifying PHI. The Scrubber Agent will perform an additional sanitization pass.
            </span>
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-text-tertiary">
            Plan will be processed through the Ralphloop engine (Drafter → Scrubber → Auditor)
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Submit to Ralphloop
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
