import { useState } from 'react';
import ConversorMercos from './ConversorMercos';
import RenomeadorFotos from './RenomeadorFotos';
import GerarPedido from './GerarPedido';
import ImportarMercos from './ImportarMercos';

type Tab = 'conversor' | 'renomeador' | 'pedido' | 'importar';

const S = {
  root: { flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden', background: 'transparent' },
  header: { padding: '20px 24px 0', borderBottom: '1px solid var(--hairline)', flexShrink: 0 },
  headerTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' },
  title: { fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' },
  tabs: { display: 'flex', gap: '0' },
  tab: (active: boolean) => ({
    padding: '10px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
    background: 'none', border: 'none', fontFamily: 'inherit',
    color: active ? 'var(--accent-light)' : 'var(--text-muted)',
    borderBottom: active ? '2px solid var(--accent-light)' : '2px solid transparent',
    transition: 'all 0.15s',
  }),
  content: { flex: 1, overflow: 'auto' },
};

export default function FerramentasView() {
  const [tab, setTab] = useState<Tab>('conversor');

  return (
    <div style={S.root}>
      <div style={S.header}>
        <div style={S.headerTop}>
          <span style={S.title}>Ferramentas</span>
        </div>
        <div style={S.tabs}>
          <button style={S.tab(tab === 'conversor')} onClick={() => setTab('conversor')}>
            Conversor Mercos
          </button>
          <button style={S.tab(tab === 'renomeador')} onClick={() => setTab('renomeador')}>
            Renomeador de Fotos
          </button>
          <button style={S.tab(tab === 'pedido')} onClick={() => setTab('pedido')}>
            Gerar Pedido
          </button>
          <button style={S.tab(tab === 'importar')} onClick={() => setTab('importar')}>
            Importar Mercos
          </button>
        </div>
      </div>

      <div style={S.content}>
        {tab === 'conversor'  && <ConversorMercos />}
        {tab === 'renomeador' && <RenomeadorFotos />}
        {tab === 'pedido'     && <GerarPedido />}
        {tab === 'importar'   && <ImportarMercos />}
      </div>
    </div>
  );
}
