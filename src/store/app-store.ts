"use client";

import { create } from "zustand";
import { mockPlans, type TreatmentPlan } from "@/lib/mock-data";

interface AppState {
  plans: TreatmentPlan[];
  commandPaletteOpen: boolean;
  sidebarCollapsed: boolean;
  activePlanId: string | null;
  searchQuery: string;
  setCommandPaletteOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActivePlanId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  getPlanById: (id: string) => TreatmentPlan | undefined;
}

export const useAppStore = create<AppState>((set, get) => ({
  plans: mockPlans,
  commandPaletteOpen: false,
  sidebarCollapsed: false,
  activePlanId: null,
  searchQuery: "",
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setActivePlanId: (id) => set({ activePlanId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  getPlanById: (id) => get().plans.find((p) => p.id === id),
}));