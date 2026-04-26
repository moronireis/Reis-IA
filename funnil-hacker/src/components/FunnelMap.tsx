import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// --- Custom Node ---

interface FunnelNodeData {
  label: string;
  nodeType: string;
  url?: string;
  pageType?: string;
  techCount?: number;
  [key: string]: unknown;
}

const NODE_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
  ad:        { bg: 'rgba(239, 68, 68, 0.15)',  border: '#ef4444', icon: '📢' },
  landing:   { bg: 'rgba(74, 144, 255, 0.15)', border: '#4A90FF', icon: '🏠' },
  video:     { bg: 'rgba(168, 85, 247, 0.15)', border: '#a855f7', icon: '▶' },
  series:    { bg: 'rgba(168, 85, 247, 0.15)', border: '#a855f7', icon: '▶▶' },
  sales:     { bg: 'rgba(34, 197, 94, 0.15)',  border: '#22c55e', icon: '💰' },
  checkout:  { bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b', icon: '🛒' },
  thankyou:  { bg: 'rgba(34, 197, 94, 0.15)',  border: '#22c55e', icon: '✓' },
  upsell:    { bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b', icon: '↑' },
  downsell:  { bg: 'rgba(249, 115, 22, 0.15)', border: '#f97316', icon: '↓' },
  whatsapp:  { bg: 'rgba(37, 211, 102, 0.15)', border: '#25d366', icon: 'W' },
  email:     { bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', icon: '@' },
  optin:     { bg: 'rgba(74, 144, 255, 0.15)', border: '#4A90FF', icon: '✉' },
  webinar:   { bg: 'rgba(168, 85, 247, 0.15)', border: '#a855f7', icon: '📹' },
  other:     { bg: 'rgba(107, 114, 128, 0.15)', border: '#6b7280', icon: '•' },
};

function FunnelNode({ data }: { data: FunnelNodeData }) {
  const colors = NODE_COLORS[data.nodeType] || NODE_COLORS.other;

  return (
    <div
      className="rounded-lg border-2 px-4 py-3 min-w-[160px] max-w-[220px] shadow-lg"
      style={{ background: '#111111', borderColor: colors.border }}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-500 !w-2 !h-2" />

      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
          style={{ background: colors.bg, color: colors.border }}
        >
          {colors.icon}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: colors.border }}>
          {data.nodeType}
        </span>
      </div>

      <p className="text-xs font-medium text-white leading-tight truncate">{data.label}</p>

      {data.url && (
        <p className="text-[10px] text-gray-500 truncate mt-0.5 font-mono">{new URL(data.url).pathname}</p>
      )}

      {data.techCount !== undefined && data.techCount > 0 && (
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-[9px] bg-white/5 text-gray-400 px-1.5 py-0.5 rounded">
            {data.techCount} techs
          </span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-gray-500 !w-2 !h-2" />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  funnel: FunnelNode,
};

// --- Edge styles ---

const EDGE_STYLES: Record<string, { stroke: string; strokeDasharray?: string }> = {
  click:     { stroke: '#4A90FF' },
  redirect:  { stroke: '#f59e0b', strokeDasharray: '5 3' },
  timer:     { stroke: '#a855f7', strokeDasharray: '8 4' },
  condition: { stroke: '#22c55e', strokeDasharray: '3 3' },
  whatsapp:  { stroke: '#25d366' },
};

// --- Main Component ---

interface FunnelMapProps {
  nodes: Array<{
    id: string;
    label: string;
    nodeType: string;
    url?: string;
    pageType?: string;
    techCount?: number;
    positionX: number;
    positionY: number;
  }>;
  edges: Array<{
    id: string;
    from: string;
    to: string;
    label?: string;
    edgeType: string;
  }>;
  onNodeClick?: (nodeId: string) => void;
}

export default function FunnelMap({ nodes: rawNodes, edges: rawEdges, onNodeClick }: FunnelMapProps) {
  const initialNodes: Node[] = useMemo(
    () =>
      rawNodes.map((n) => ({
        id: n.id,
        type: 'funnel',
        position: { x: n.positionX, y: n.positionY },
        data: {
          label: n.label,
          nodeType: n.nodeType,
          url: n.url,
          pageType: n.pageType,
          techCount: n.techCount,
        } satisfies FunnelNodeData,
      })),
    [rawNodes]
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      rawEdges.map((e) => {
        const style = EDGE_STYLES[e.edgeType] || EDGE_STYLES.click;
        return {
          id: e.id,
          source: e.from,
          target: e.to,
          label: e.label,
          type: 'smoothstep',
          animated: e.edgeType === 'redirect',
          style: { stroke: style.stroke, strokeDasharray: style.strokeDasharray, strokeWidth: 2 },
          labelStyle: { fill: '#999', fontSize: 10, fontFamily: 'Inter' },
          labelBgStyle: { fill: '#111', strokeWidth: 0 },
          labelBgPadding: [4, 2] as [number, number],
        };
      }),
    [rawEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback(
    (_: any, node: Node) => {
      if (onNodeClick) onNodeClick(node.id);
    },
    [onNodeClick]
  );

  if (rawNodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <svg className="w-12 h-12 text-text-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
        <h3 className="text-lg font-medium text-text-secondary mb-1">Mapa do Funil</h3>
        <p className="text-text-muted text-sm">Execute o crawler para gerar o mapa automaticamente.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full" style={{ minHeight: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#0a0a0a' }}
      >
        <Background color="#1a1a1a" gap={20} size={1} />
        <Controls
          style={{ background: '#1a1a1a', borderColor: '#2a2a2a', borderRadius: 8 }}
          showInteractive={false}
        />
        <MiniMap
          style={{ background: '#111', borderColor: '#2a2a2a', borderRadius: 8 }}
          nodeColor="#4A90FF"
          maskColor="rgba(0,0,0,0.7)"
        />
      </ReactFlow>
    </div>
  );
}

// --- Auto-layout utility ---

/**
 * Auto-layout nodes in a top-to-bottom tree structure.
 * Used when nodes come from the crawler without manual positions.
 */
export function autoLayoutNodes(
  pages: Array<{ id: string; url: string; title?: string; pageType?: string; techCount?: number }>,
  edges: Array<{ from: string; to: string; type: string; label: string }>
): {
  nodes: FunnelMapProps['nodes'];
  edges: FunnelMapProps['edges'];
} {
  const NODE_WIDTH = 200;
  const NODE_HEIGHT = 80;
  const H_SPACING = 60;
  const V_SPACING = 120;

  // Build adjacency
  const children = new Map<string, string[]>();
  const hasParent = new Set<string>();

  for (const edge of edges) {
    const fromPage = pages.find((p) => p.url === edge.from);
    const toPage = pages.find((p) => p.url === edge.to);
    if (!fromPage || !toPage) continue;

    if (!children.has(fromPage.id)) children.set(fromPage.id, []);
    children.get(fromPage.id)!.push(toPage.id);
    hasParent.add(toPage.id);
  }

  // Find roots (no parent)
  const roots = pages.filter((p) => !hasParent.has(p.id));
  if (roots.length === 0 && pages.length > 0) roots.push(pages[0]);

  // BFS to assign levels
  const levels = new Map<string, number>();
  const queue = roots.map((r) => ({ id: r.id, level: 0 }));
  const visited = new Set<string>();

  while (queue.length > 0) {
    const { id, level } = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    levels.set(id, level);

    for (const childId of children.get(id) || []) {
      if (!visited.has(childId)) {
        queue.push({ id: childId, level: level + 1 });
      }
    }
  }

  // Unvisited nodes get placed at the bottom
  for (const p of pages) {
    if (!levels.has(p.id)) levels.set(p.id, (Math.max(...levels.values()) || 0) + 1);
  }

  // Group by level and assign positions
  const levelGroups = new Map<number, string[]>();
  for (const [id, level] of levels) {
    if (!levelGroups.has(level)) levelGroups.set(level, []);
    levelGroups.get(level)!.push(id);
  }

  const layoutNodes: FunnelMapProps['nodes'] = pages.map((p) => {
    const level = levels.get(p.id) || 0;
    const group = levelGroups.get(level) || [p.id];
    const indexInGroup = group.indexOf(p.id);
    const groupWidth = group.length * (NODE_WIDTH + H_SPACING);

    return {
      id: p.id,
      label: p.title || new URL(p.url).pathname,
      nodeType: p.pageType || 'other',
      url: p.url,
      techCount: p.techCount || 0,
      positionX: indexInGroup * (NODE_WIDTH + H_SPACING) - groupWidth / 2 + 400,
      positionY: level * (NODE_HEIGHT + V_SPACING),
    };
  });

  const layoutEdges: FunnelMapProps['edges'] = edges
    .map((e, i) => {
      const fromPage = pages.find((p) => p.url === e.from);
      const toPage = pages.find((p) => p.url === e.to);
      if (!fromPage || !toPage) return null;
      return {
        id: `edge-${i}`,
        from: fromPage.id,
        to: toPage.id,
        label: e.label,
        edgeType: e.type,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return { nodes: layoutNodes, edges: layoutEdges };
}
