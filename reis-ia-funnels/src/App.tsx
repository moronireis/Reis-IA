import { useState } from 'react'
import { FunnelViewer } from './components/FunnelViewer'
import { funnels, overviewNodes, overviewEdges } from './data/funnels'

type View = 'overview' | string

function App() {
  const [activeView, setActiveView] = useState<View>('overview')

  const activeFunnel = funnels.find((f) => f.id === activeView)
  const currentNodes = activeFunnel ? activeFunnel.nodes : overviewNodes
  const currentEdges = activeFunnel ? activeFunnel.edges : overviewEdges

  return (
    <div className="flex h-screen bg-surface-0">
      {/* Sidebar */}
      <aside className="w-64 min-w-64 bg-surface-1 border-r border-surface-4 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-surface-4">
          <h1 className="text-base font-light text-text-primary tracking-wide">
            Reis IA
          </h1>
          <p className="text-xs text-text-muted mt-0.5">Funnel Visualizer</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {/* Overview */}
          <button
            onClick={() => setActiveView('overview')}
            className={`
              w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150
              ${activeView === 'overview'
                ? 'bg-accent/10 text-accent border border-accent/20'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-3 border border-transparent'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span className="font-medium">Visao Geral</span>
            </div>
            <p className="text-xs text-text-muted mt-0.5 ml-7">Todos os funis conectados</p>
          </button>

          {/* Divider */}
          <div className="pt-3 pb-1 px-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Segmentos
            </span>
          </div>

          {/* Segment buttons */}
          {funnels.map((funnel) => (
            <button
              key={funnel.id}
              onClick={() => setActiveView(funnel.id)}
              className={`
                w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                ${activeView === funnel.id
                  ? 'bg-surface-3 text-text-primary border border-surface-4'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2 border border-transparent'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: funnel.color }}
                  />
                  <span className="font-medium">{funnel.name}</span>
                </div>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    color: funnel.color,
                    backgroundColor: `${funnel.color}15`,
                  }}
                >
                  {funnel.ticket}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5 ml-4 truncate">
                {funnel.description}
              </p>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-surface-4">
          <p className="text-[10px] text-text-muted">
            {funnels.length} funis · {funnels.reduce((acc, f) => acc + f.nodes.length, 0)} etapas
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 min-h-14 bg-surface-1 border-b border-surface-4 flex items-center px-5 justify-between">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              {activeFunnel ? activeFunnel.name : 'Visao Geral do Ecossistema'}
            </h2>
            <p className="text-xs text-text-muted">
              {activeFunnel
                ? `${activeFunnel.nodes.length} etapas · ${activeFunnel.edges.length} conexoes`
                : `${overviewNodes.length} etapas · ${overviewEdges.length} conexoes`
              }
            </p>
          </div>
          {activeFunnel && (
            <div
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                color: activeFunnel.color,
                backgroundColor: `${activeFunnel.color}15`,
                border: `1px solid ${activeFunnel.color}30`,
              }}
            >
              {activeFunnel.ticket}
            </div>
          )}
        </header>

        {/* Flow Viewer */}
        <div className="flex-1">
          <FunnelViewer
            key={activeView}
            nodes={currentNodes}
            edges={currentEdges}
          />
        </div>
      </main>
    </div>
  )
}

export default App
