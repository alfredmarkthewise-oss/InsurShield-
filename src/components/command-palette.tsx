"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  FileText,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";

const commands = [
  { id: "dashboard", label: "Go to Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "new-plan", label: "Create New Plan", icon: PlusCircle, href: "/new-plan" },
  { id: "plans", label: "View All Plans", icon: FileText, href: "/plans" },
  { id: "plan-001", label: "Plan PLN-001 \u2014 J.M. (BCBS)", icon: FileText, href: "/plans/PLN-001" },
  { id: "plan-002", label: "Plan PLN-002 \u2014 A.R. (UHC)", icon: FileText, href: "/plans/PLN-002" },
  { id: "plan-003", label: "Plan PLN-003 \u2014 T.K. (Aetna)", icon: FileText, href: "/plans/PLN-003" },
  { id: "plan-004", label: "Plan PLN-004 \u2014 S.L. (Cigna)", icon: FileText, href: "/plans/PLN-004" },
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useAppStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (href: string) => {
      setCommandPaletteOpen(false);
      setQuery("");
      router.push(href);
    },
    [router, setCommandPaletteOpen]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (!commandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex].href);
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setCommandPaletteOpen(false)}
      />
      <div className="relative w-full max-w-lg bg-surface border border-border rounded-xl shadow-2xl overflow-hidden animate-slide-in">
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search className="w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 py-3 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNav}
            autoFocus
          />
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-sm text-text-tertiary text-center">No results found</p>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd.href)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left transition-colors ${
                  idx === selectedIndex
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-surface-overlay"
                }`}
              >
                <cmd.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{cmd.label}</span>
                {idx === selectedIndex && (
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                )}
              </button>
            ))
          )}
        </div>
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[10px] text-text-tertiary">
          <span><kbd className="px-1 py-0.5 rounded border border-border bg-surface-raised font-mono mr-0.5">\u2191\u2193</kbd> Navigate</span>
          <span><kbd className="px-1 py-0.5 rounded border border-border bg-surface-raised font-mono mr-0.5">\u21b5</kbd> Select</span>
          <span><kbd className="px-1 py-0.5 rounded border border-border bg-surface-raised font-mono mr-0.5">esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
