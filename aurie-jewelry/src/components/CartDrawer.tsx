import { useEffect, useState } from 'react';

type Line = { slug: string; name: string; price: number; image: string; size?: string; qty: number };

const STORAGE_KEY = 'aurie-cart';

const formatBRL = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const readCart = (): Line[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Line[]) : [];
  } catch {
    return [];
  }
};

const writeCart = (lines: Line[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  const ev = new CustomEvent('aurie:cart-changed', { detail: { lines } });
  window.dispatchEvent(ev);
};

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [stage, setStage] = useState<'cart' | 'success'>('cart');

  useEffect(() => {
    setLines(readCart());

    const onAdd = (e: Event) => {
      const detail = (e as CustomEvent).detail as Line;
      setLines((prev) => {
        const existing = prev.find((l) => l.slug === detail.slug && l.size === detail.size);
        const next = existing
          ? prev.map((l) =>
              l.slug === detail.slug && l.size === detail.size ? { ...l, qty: l.qty + detail.qty } : l,
            )
          : [...prev, detail];
        writeCart(next);
        return next;
      });
      setOpen(true);
      setStage('cart');
    };

    const onOpen = () => {
      setStage('cart');
      setOpen(true);
    };

    const onChanged = (e: Event) => {
      const detail = (e as CustomEvent).detail as { lines: Line[] };
      setLines(detail.lines);
    };

    window.addEventListener('aurie:add-to-cart', onAdd as EventListener);
    window.addEventListener('aurie:open-cart', onOpen);
    window.addEventListener('aurie:cart-changed', onChanged as EventListener);
    return () => {
      window.removeEventListener('aurie:add-to-cart', onAdd as EventListener);
      window.removeEventListener('aurie:open-cart', onOpen);
      window.removeEventListener('aurie:cart-changed', onChanged as EventListener);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const totalQty = lines.reduce((s, l) => s + l.qty, 0);

  const updateQty = (slug: string, size: string | undefined, delta: number) => {
    setLines((prev) => {
      const next = prev
        .map((l) =>
          l.slug === slug && l.size === size ? { ...l, qty: Math.max(0, l.qty + delta) } : l,
        )
        .filter((l) => l.qty > 0);
      writeCart(next);
      return next;
    });
  };

  const remove = (slug: string, size: string | undefined) => {
    setLines((prev) => {
      const next = prev.filter((l) => !(l.slug === slug && l.size === size));
      writeCart(next);
      return next;
    });
  };

  const checkout = () => {
    setStage('success');
    setLines([]);
    writeCart([]);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-[rgba(12,10,8,0.55)] transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[min(440px,100vw)] bg-[var(--color-ivory)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(.2,.6,.2,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Sacola"
      >
        <div className="flex items-center justify-between px-7 h-20 border-b border-[rgba(12,10,8,0.1)]">
          <span className="font-display text-2xl tracking-[0.16em]">SACOLA</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar sacola"
            className="text-[12px] uppercase tracking-[0.28em] hover:text-[var(--color-gold-deep)] transition-colors"
          >
            Fechar
          </button>
        </div>

        {stage === 'cart' && lines.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-10 text-center gap-4">
            <p className="font-display text-3xl">Sua sacola está vazia.</p>
            <p className="text-sm opacity-70 max-w-xs">
              Comece pela coleção Constelação ou peça uma curadoria privada com nosso atelier.
            </p>
            <a href="/colecao" className="btn-ghost mt-3" onClick={() => setOpen(false)}>
              Ver coleção
            </a>
          </div>
        )}

        {stage === 'cart' && lines.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
              {lines.map((l) => (
                <div key={`${l.slug}-${l.size ?? ''}`} className="flex gap-4">
                  <img src={l.image} alt={l.name} className="w-24 h-28 object-cover bg-[var(--color-cream)]" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg leading-tight">{l.name}</p>
                        {l.size && (
                          <p className="text-[11px] tracking-[0.22em] uppercase opacity-60 mt-1">Aro {l.size}</p>
                        )}
                      </div>
                      <button
                        onClick={() => remove(l.slug, l.size)}
                        className="text-[10px] tracking-[0.22em] uppercase opacity-50 hover:opacity-100"
                      >
                        Remover
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-[rgba(12,10,8,0.2)]">
                        <button
                          onClick={() => updateQty(l.slug, l.size, -1)}
                          className="w-8 h-8 grid place-items-center hover:bg-[var(--color-cream)]"
                          aria-label="Diminuir"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button
                          onClick={() => updateQty(l.slug, l.size, 1)}
                          className="w-8 h-8 grid place-items-center hover:bg-[var(--color-cream)]"
                          aria-label="Aumentar"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-display text-lg">{formatBRL(l.price * l.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[rgba(12,10,8,0.1)] px-7 py-6 space-y-4 bg-[var(--color-cream)]">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] tracking-[0.24em] uppercase">Subtotal ({totalQty})</span>
                <span className="font-display text-2xl">{formatBRL(subtotal)}</span>
              </div>
              <p className="text-[11px] opacity-60">Frete segurado e impostos calculados no checkout.</p>
              <button onClick={checkout} className="btn-primary w-full">
                Finalizar compra
              </button>
              <button onClick={() => setOpen(false)} className="text-[11px] tracking-[0.22em] uppercase opacity-60 hover:opacity-100 w-full text-center">
                Continuar comprando
              </button>
            </div>
          </>
        )}

        {stage === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center px-10 text-center gap-4">
            <div className="w-16 h-16 rounded-full border border-[var(--color-gold)] grid place-items-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-deep)" strokeWidth="1.5">
                <path d="M5 12.5L10 17.5L19 7.5" />
              </svg>
            </div>
            <p className="font-display text-3xl">Pedido recebido.</p>
            <p className="text-sm opacity-70 max-w-xs">
              Esta é uma demonstração. Em produção, este passo redirecionaria para o checkout seguro com Pagar.me ou Stripe.
            </p>
            <button
              onClick={() => {
                setOpen(false);
                setStage('cart');
              }}
              className="btn-ghost mt-3"
            >
              Voltar à boutique
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
