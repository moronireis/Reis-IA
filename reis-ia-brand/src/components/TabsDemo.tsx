import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface Props {
  tabs?: Tab[];
}

const defaultTabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div>
        <h4 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Project Overview
        </h4>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '680px' }}>
          This tab shows a summary of the project status, key metrics, and recent activity. Tabs are ideal for organizing related content into a compact, scannable layout without navigating to a new page.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginTop: '24px' }}>
          {[
            { label: 'Deployments', value: '52' },
            { label: 'Time Saved', value: '83%' },
            { label: 'Active Agents', value: '12' },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: '16px', background: 'var(--surface-2)', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <div>
        <h4 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Implementation Details
        </h4>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '680px' }}>
          Each tab panel can hold any content — text, tables, forms, or interactive components. The active tab is indicated by a blue underline and bold weight, following the design system tab trigger spec.
        </p>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div>
        <h4 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Configuration
        </h4>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '680px', marginBottom: '16px' }}>
          Tabs support keyboard navigation. Press the left/right arrow keys to move between tabs, and Enter/Space to activate. This pattern follows WAI-ARIA tabs specification.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <span style={{ width: '40px', height: '22px', background: 'var(--accent-blue)', borderRadius: '11px', position: 'relative', display: 'inline-block' }}>
              <span style={{ position: 'absolute', top: '2px', left: '20px', width: '18px', height: '18px', background: 'white', borderRadius: '50%', transition: 'left 200ms' }}></span>
            </span>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Enable notifications</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <span style={{ width: '40px', height: '22px', background: 'var(--surface-3)', border: '1px solid var(--border-visible)', borderRadius: '11px', position: 'relative', display: 'inline-block' }}>
              <span style={{ position: 'absolute', top: '2px', left: '2px', width: '18px', height: '18px', background: 'var(--text-tertiary)', borderRadius: '50%', transition: 'left 200ms' }}></span>
            </span>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Auto-deploy</span>
          </label>
        </div>
      </div>
    ),
  },
];

/**
 * TabsDemo — Interactive tabbed content component with keyboard navigation.
 */
export default function TabsDemo({ tabs = defaultTabs }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(tabs[newIndex].id);
    const tabEl = document.getElementById(`tab-${tabs[newIndex].id}`);
    tabEl?.focus();
  };

  return (
    <div>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Demo tabs"
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-default)',
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              flexShrink: 0,
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 600 : 500,
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-blue)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'color 200ms, border-color 200ms',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          style={{
            paddingTop: '24px',
            minHeight: '100px',
            animation: activeTab === tab.id ? 'tab-fade 200ms ease' : undefined,
          }}
        >
          {tab.content}
        </div>
      ))}

      <style>{`
        @keyframes tab-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
