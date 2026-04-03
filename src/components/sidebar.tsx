"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  HelpCircle,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/new-plan", label: "New Plan", icon: PlusCircle },
  { href: "/plans", label: "All Plans", icon: FileText },
];

const bottomItems = [
  { href: "#", label: "Settings", icon: Settings },
  { href: "#", label: "Help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  return (
    <aside
      className={`${
        sidebarCollapsed ? "w-16" : "w-60"
      } flex flex-col border-r border-border bg-surface transition-all duration-200 ease-in-out`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/20">
          <Shield className="w-4 h-4 text-accent" />
        </div>
        {!sidebarCollapsed && (
          <div className="flex flex-col animate-fade-in">
            <span className="text-sm font-semibold text-text-primary">InsurShield</span>
            <span className="text-[10px] text-text-tertiary tracking-wider uppercase">AI Authorization</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {!sidebarCollapsed && (
          <p className="px-3 pb-1 text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
            Navigation
          </p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-overlay"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span className="animate-fade-in">{item.label}</span>}
            </Link>
          );
        })}

        {!sidebarCollapsed && (
          <>
            <div className="pt-4" />
            <p className="px-3 pb-1 text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
              Ralphloop Engine
            </p>
          </>
        )}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-text-secondary`}
        >
          <Activity className="w-4 h-4 flex-shrink-0 text-success" />
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 animate-fade-in">
              <span>Engine Status</span>
              <span className="flex items-center gap-1 text-[10px] text-success">
                <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
                Online
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-border space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span className="animate-fade-in">{item.label}</span>}
          </Link>
        ))}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-text-tertiary hover:text-text-primary hover:bg-surface-overlay transition-colors w-full"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
