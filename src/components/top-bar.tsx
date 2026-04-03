"use client";

import { Search, Command, Bell, User } from "lucide-react";
import { useAppStore } from "@/store/app-store";

export function TopBar() {
  const { setCommandPaletteOpen } = useAppStore();

  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-border bg-surface/50 backdrop-blur-sm">
      {/* Search trigger */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center gap-3 px-3 py-1.5 rounded-md border border-border bg-surface-raised hover:border-border-hover text-text-tertiary text-sm transition-colors w-72"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search plans, clients...</span>
        <div className="ml-auto flex items-center gap-0.5 text-[10px]">
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface font-mono">
            <Command className="w-2.5 h-2.5 inline" />
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface font-mono">K</kbd>
        </div>
      </button>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-overlay transition-colors">
          <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-medium text-text-primary">Dr. Sarah Chen</p>
            <p className="text-[10px] text-text-tertiary">BCBA-D</p>
          </div>
        </button>
      </div>
    </header>
  );
}
