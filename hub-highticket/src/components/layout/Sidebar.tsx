import { useState, type ReactNode } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
  badge?: string;
}

interface SidebarProps {
  items: NavItem[];
  activeId?: string;
  brandName?: string;
}

export default function Sidebar({ items, activeId, brandName = 'HUB HT' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        flex flex-col h-screen bg-surface-1 border-r border-border
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      <div className="flex items-center justify-between px-4 h-14 border-b border-border">
        {!collapsed && (
          <span className="text-sm font-semibold text-accent tracking-wide">{brandName}</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-surface-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {collapsed ? (
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`
              flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg
              text-sm font-medium transition-all duration-200
              ${
                activeId === item.id
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
              }
            `}
            title={collapsed ? item.label : undefined}
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-xs rounded-full bg-accent/15 text-accent">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </a>
        ))}
      </nav>
    </aside>
  );
}
