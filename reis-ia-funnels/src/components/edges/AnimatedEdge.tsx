import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react'

export function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  label,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        className="animated-edge"
        style={{
          stroke: '#4A90FF',
          strokeWidth: 2,
          opacity: 0.5,
          ...style,
        }}
      />
      {label && (
        <foreignObject
          width={120}
          height={30}
          x={labelX - 60}
          y={labelY - 15}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className="flex items-center justify-center h-full">
            <span className="text-[10px] text-text-muted bg-surface-2 px-2 py-0.5 rounded-full border border-surface-4">
              {label as string}
            </span>
          </div>
        </foreignObject>
      )}
    </>
  )
}
