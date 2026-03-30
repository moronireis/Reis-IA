import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ReactNode } from 'react'

export type FunnelNodeType =
  | 'ad'
  | 'page'
  | 'form'
  | 'checkout'
  | 'program'
  | 'email'
  | 'segment'
  | 'action'

interface FunnelNodeData {
  label: string
  description?: string
  type: FunnelNodeType
  metric?: string
}

const iconProps = { width: 14, height: 14, strokeWidth: 1.5, fill: 'none', stroke: 'currentColor' }

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...iconProps}>
      {children}
    </svg>
  )
}

const nodeIcons: Record<FunnelNodeType, ReactNode> = {
  segment: (
    <Icon>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M21 21v-1.5a3 3 0 0 0-2-2.83" />
    </Icon>
  ),
  ad: (
    <Icon>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </Icon>
  ),
  page: (
    <Icon>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </Icon>
  ),
  form: (
    <Icon>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="13" y2="12" />
      <line x1="7" y1="16" x2="10" y2="16" />
    </Icon>
  ),
  checkout: (
    <Icon>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
      <line x1="5" y1="15" x2="9" y2="15" />
    </Icon>
  ),
  program: (
    <Icon>
      <path d="M2 3h20v14H2z" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 8l3 3-3 3" />
      <line x1="13" y1="14" x2="17" y2="14" />
    </Icon>
  ),
  email: (
    <Icon>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22 4 12 13 2 4" />
    </Icon>
  ),
  action: (
    <Icon>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Icon>
  ),
}

const nodeConfig: Record<FunnelNodeType, { color: string; border: string }> = {
  segment: { color: 'bg-node-segment/10', border: 'border-node-segment/40' },
  ad: { color: 'bg-node-ad/10', border: 'border-node-ad/40' },
  page: { color: 'bg-node-page/10', border: 'border-node-page/40' },
  form: { color: 'bg-node-form/10', border: 'border-node-form/40' },
  checkout: { color: 'bg-node-checkout/10', border: 'border-node-checkout/40' },
  program: { color: 'bg-node-program/10', border: 'border-node-program/40' },
  email: { color: 'bg-node-email/10', border: 'border-node-email/40' },
  action: { color: 'bg-node-action/10', border: 'border-node-action/40' },
}

const colorMap: Record<FunnelNodeType, string> = {
  segment: '#F472B6',
  ad: '#FF6B6B',
  page: '#4A90FF',
  form: '#50C878',
  checkout: '#FFB84D',
  program: '#A855F7',
  email: '#38BDF8',
  action: '#FB923C',
}

export function FunnelNode({ data }: NodeProps) {
  const nodeData = data as unknown as FunnelNodeData
  const config = nodeConfig[nodeData.type] || nodeConfig.action
  const accentColor = colorMap[nodeData.type] || '#FB923C'
  const icon = nodeIcons[nodeData.type] || nodeIcons.action

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-surface-3 !rounded-full"
        style={{ background: accentColor }}
      />
      <div
        className={`
          ${config.color} ${config.border}
          border rounded-xl px-5 py-4 min-w-[180px] max-w-[220px]
          backdrop-blur-sm shadow-lg shadow-black/20
          transition-all duration-200
          hover:scale-105 hover:shadow-xl hover:shadow-black/30
          cursor-default
        `}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span style={{ color: accentColor }}>{icon}</span>
          <span
            className="text-[10px] font-medium uppercase tracking-wider opacity-60"
            style={{ color: accentColor }}
          >
            {nodeData.type}
          </span>
        </div>
        <div className="text-sm font-semibold text-text-primary leading-tight">
          {nodeData.label}
        </div>
        {nodeData.description && (
          <div className="text-xs text-text-muted mt-1.5 leading-relaxed">
            {nodeData.description}
          </div>
        )}
        {nodeData.metric && (
          <div
            className="text-xs font-medium mt-2 px-2 py-0.5 rounded-full inline-block"
            style={{ color: accentColor, backgroundColor: `${accentColor}15` }}
          >
            {nodeData.metric}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-surface-3 !rounded-full"
        style={{ background: accentColor }}
      />
    </>
  )
}
