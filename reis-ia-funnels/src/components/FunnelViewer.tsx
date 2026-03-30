import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEffect, useCallback } from 'react'
import { FunnelNode } from './nodes/FunnelNode'
import { AnimatedEdge } from './edges/AnimatedEdge'
import type { Node, Edge } from '@xyflow/react'

const nodeTypes = { funnel: FunnelNode }
const edgeTypes = { animated: AnimatedEdge }

interface FunnelViewerProps {
  nodes: Node[]
  edges: Edge[]
}

export function FunnelViewer({ nodes: initialNodes, edges: initialEdges }: FunnelViewerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [initialNodes, initialEdges, setNodes, setEdges])

  const onInit = useCallback((instance: { fitView: () => void }) => {
    setTimeout(() => instance.fitView(), 100)
  }, [])

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={onInit}
        fitView
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{ type: 'animated' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#242427"
        />
        <Controls
          showInteractive={false}
          position="bottom-right"
        />
        <MiniMap
          nodeColor={() => '#4A90FF'}
          maskColor="rgba(0, 0, 0, 0.7)"
          position="bottom-left"
        />
      </ReactFlow>
    </div>
  )
}
