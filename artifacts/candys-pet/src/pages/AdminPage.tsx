import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, LogOut, Package, DollarSign, ImageIcon,
  Save, Plus, Trash2, Eye, EyeOff, CheckCircle,
  AlertTriangle, RefreshCw, ShieldCheck, X
} from 'lucide-react';
import { toast } from 'sonner';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const PRODUCT_NAMES: Record<string, string> = {
  p1: 'Porta Mascota Clásico',
  p2: 'Porta Mascota Corderito',
  p3: 'Porta Mascota Estampado',
  p4: 'Porta Mascota Unisex',
};

/* ─────────────── helpers ─────────────── */
async function api(method: string, path: string, body?: unknown) {
  const res = await fetch(`${BASE}/api/admin${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? res.statusText);
  }
  return res.json();
}

/* ─────────────── LOGIN ─────────────── */
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api('POST', '/login', { password: pw });
      onSuccess();
    } catch {
      setError('Contraseña incorrecta. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'hsl(220 25% 7%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="w-full max-w-sm mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, hsl(340 84% 50%), hsl(280 75% 55%))' }}>
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Candy's Pet 🐾
          </p>
        </div>

        <form onSubmit={submit} className="rounded-2xl p-6 space-y-4"
          style={{ background: 'hsl(220 25% 12%)', border: '1px solid hsl(220 25% 20%)' }}>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Contraseña
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 pr-12 focus:outline-none focus:ring-2"
                style={{
                  background: 'hsl(220 25% 8%)',
                  border: '1px solid hsl(220 25% 25%)',
                  focusRingColor: 'hsl(340 84% 50%)',
                }}
              />
              <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-sm flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" disabled={loading || !pw}
            className="w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, hsl(340 84% 52%), hsl(280 75% 55%))' }}>
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {loading ? 'Verificando…' : 'Ingresar'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ─────────────── STOCK TAB ─────────────── */
type StockRow = { id: string; productId: string; productName: string; size: string; qty: number };

function StockTab() {
  const [rows, setRows] = useState<StockRow[]>([]);
  const [editing, setEditing] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api('GET', '/stock');
      setRows(data);
    } catch { toast.error('No se pudo cargar el stock'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (id: string) => {
    const qty = editing[id];
    if (qty === undefined) return;
    setSaving(s => ({ ...s, [id]: true }));
    try {
      await api('PUT', `/stock/${id}`, { qty });
      setRows(rs => rs.map(r => r.id === id ? { ...r, qty } : r));
      setEditing(e => { const n = { ...e }; delete n[id]; return n; });
      toast.success('Stock actualizado ✓');
    } catch { toast.error('Error al guardar'); }
    finally { setSaving(s => ({ ...s, [id]: false })); }
  };

  if (loading) return <Spinner />;

  const grouped = Object.entries(PRODUCT_NAMES).map(([pid, name]) => ({
    pid, name,
    rows: rows.filter(r => r.productId === pid),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Editá las unidades disponibles por talla. Los cambios se reflejan inmediatamente en la tienda.
        </p>
        <button onClick={load} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: 'rgba(255,255,255,0.6)' }}>
          <RefreshCw className="w-3.5 h-3.5" /> Actualizar
        </button>
      </div>

      <div className="grid gap-3">
        {grouped.map(({ pid, name, rows: pRows }) => (
          <div key={pid} className="rounded-2xl overflow-hidden"
            style={{ background: 'hsl(220 25% 12%)', border: '1px solid hsl(220 25% 20%)' }}>
            <div className="px-5 py-3 border-b flex items-center gap-2"
              style={{ borderColor: 'hsl(220 25% 20%)' }}>
              <Package className="w-4 h-4" style={{ color: 'hsl(340 84% 60%)' }} />
              <span className="font-semibold text-white text-sm">{name}</span>
            </div>
            <div className="divide-y" style={{ borderColor: 'hsl(220 25% 18%)' }}>
              {pRows.map(row => {
                const val = editing[row.id] ?? row.qty;
                const changed = editing[row.id] !== undefined && editing[row.id] !== row.qty;
                const low = val <= 3 && val > 0;
                const oos = val === 0;
                return (
                  <div key={row.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                        style={{ background: row.size === 'M' ? 'hsl(340 84% 45%)' : 'hsl(270 70% 50%)' }}>
                        {row.size}
                      </span>
                      <div>
                        <p className="text-white text-sm font-medium">Talla {row.size}</p>
                        <p className="text-xs" style={{ color: oos ? '#f87171' : low ? '#fb923c' : '#4ade80' }}>
                          {oos ? '⛔ Agotado' : low ? `⚠️ Últimas ${val} unidades` : `✓ ${val} disponibles`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number" min={0} max={9999}
                        value={val}
                        onChange={e => setEditing(ed => ({ ...ed, [row.id]: parseInt(e.target.value) || 0 }))}
                        className="w-20 text-center py-2 px-3 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2"
                        style={{
                          background: 'hsl(220 25% 8%)',
                          border: `1px solid ${changed ? 'hsl(340 84% 50%)' : 'hsl(220 25% 25%)'}`,
                        }}
                      />
                      <AnimatePresence>
                        {changed && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => save(row.id)}
                            disabled={saving[row.id]}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium transition-all"
                            style={{ background: 'hsl(340 84% 50%)' }}>
                            {saving[row.id] ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                            Guardar
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── PRECIOS TAB ─────────────── */
function PricesTab() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setSettings(await api('GET', '/settings')); }
    catch { toast.error('No se pudo cargar la configuración'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (key: string) => {
    const value = editing[key];
    if (!value) return;
    setSaving(s => ({ ...s, [key]: true }));
    try {
      await api('PUT', `/settings/${key}`, { value });
      setSettings(s => ({ ...s, [key]: value }));
      setEditing(e => { const n = { ...e }; delete n[key]; return n; });
      toast.success('Precio actualizado ✓');
    } catch { toast.error('Error al guardar'); }
    finally { setSaving(s => ({ ...s, [key]: false })); }
  };

  if (loading) return <Spinner />;

  const fields = [
    { key: 'price_m', label: 'Precio Talla M', sub: 'Hasta 3,5 kg — desde 2 meses', color: 'hsl(340 84% 50%)' },
    { key: 'price_l', label: 'Precio Talla L', sub: 'Hasta 10 kg — caben 2 perritos', color: 'hsl(270 70% 55%)' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Los precios se actualizan en tiempo real en la tienda. Los valores están en pesos chilenos (CLP).
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map(f => {
          const current = settings[f.key] ?? '';
          const val = editing[f.key] ?? current;
          const changed = editing[f.key] !== undefined && editing[f.key] !== current;
          return (
            <div key={f.key} className="rounded-2xl p-5"
              style={{ background: 'hsl(220 25% 12%)', border: '1px solid hsl(220 25% 20%)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ background: f.color }} />
                <div>
                  <p className="font-semibold text-white text-sm">{f.label}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{f.sub}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>$</span>
                  <input
                    type="number" min={0} step={10}
                    value={val}
                    onChange={e => setEditing(ed => ({ ...ed, [f.key]: e.target.value }))}
                    className="w-full pl-7 pr-4 py-3 rounded-xl text-white font-mono text-lg font-bold focus:outline-none"
                    style={{
                      background: 'hsl(220 25% 8%)',
                      border: `1px solid ${changed ? f.color : 'hsl(220 25% 25%)'}`,
                    }}
                  />
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Actual: ${parseInt(current || '0').toLocaleString('es-CL')}
                </p>
                <AnimatePresence>
                  {changed && (
                    <motion.button
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                      onClick={() => save(f.key)}
                      disabled={saving[f.key]}
                      className="w-full py-2.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
                      style={{ background: f.color }}>
                      {saving[f.key] ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Guardar ${parseInt(val || '0').toLocaleString('es-CL')}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── IMÁGENES TAB ─────────────── */
type ImageRow = { id: string; productId: string; url: string; position: number };

function ImagesTab() {
  const [images, setImages] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try { setImages(await api('GET', '/images')); }
    catch { toast.error('No se pudo cargar las imágenes'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveNew = async (productId: string) => {
    const url = newUrl[productId]?.trim();
    if (!url) return;
    setSaving(s => ({ ...s, [productId]: true }));
    try {
      await api('POST', '/images', { productId, url });
      await load();
      setNewUrl(n => { const m = { ...n }; delete m[productId]; return m; });
      toast.success('Imagen agregada ✓');
    } catch { toast.error('Error al agregar imagen'); }
    finally { setSaving(s => ({ ...s, [productId]: false })); }
  };

  const update = async (id: string, url: string) => {
    setSaving(s => ({ ...s, [id]: true }));
    try {
      await api('PUT', `/images/${id}`, { url });
      setImages(imgs => imgs.map(i => i.id === id ? { ...i, url } : i));
      toast.success('Imagen actualizada ✓');
    } catch { toast.error('Error al actualizar'); }
    finally { setSaving(s => ({ ...s, [id]: false })); }
  };

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta imagen?')) return;
    try {
      await api('DELETE', `/images/${id}`);
      setImages(imgs => imgs.filter(i => i.id !== id));
      toast.success('Imagen eliminada');
    } catch { toast.error('Error al eliminar'); }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Pegá la URL directa de cualquier imagen (Cloudinary, Google Fotos, Dropbox, etc.).
      </p>

      <div className="grid gap-4">
        {Object.entries(PRODUCT_NAMES).map(([pid, name]) => {
          const imgs = images.filter(i => i.productId === pid);
          return (
            <div key={pid} className="rounded-2xl overflow-hidden"
              style={{ background: 'hsl(220 25% 12%)', border: '1px solid hsl(220 25% 20%)' }}>
              <div className="px-5 py-3 border-b flex items-center gap-2"
                style={{ borderColor: 'hsl(220 25% 20%)' }}>
                <ImageIcon className="w-4 h-4" style={{ color: 'hsl(340 84% 60%)' }} />
                <span className="font-semibold text-white text-sm">{name}</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'hsl(220 25% 20%)', color: 'rgba(255,255,255,0.5)' }}>
                  {imgs.length} imagen{imgs.length !== 1 ? 'es' : ''}
                </span>
              </div>

              <div className="p-4 space-y-3">
                {/* Existing images */}
                {imgs.map(img => (
                  <div key={img.id} className="flex gap-3 items-start">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10">
                      <img src={img.url} alt="" className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <input
                        type="url"
                        defaultValue={img.url}
                        onBlur={e => { if (e.target.value !== img.url) update(img.id, e.target.value); }}
                        className="w-full px-3 py-2 rounded-lg text-xs font-mono focus:outline-none text-white/80"
                        style={{ background: 'hsl(220 25% 8%)', border: '1px solid hsl(220 25% 25%)' }}
                        placeholder="https://..."
                      />
                    </div>
                    <button onClick={() => remove(img.id)}
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/20 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Add new image */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="url"
                    value={newUrl[pid] ?? ''}
                    onChange={e => setNewUrl(n => ({ ...n, [pid]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && saveNew(pid)}
                    className="flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none text-white/80"
                    style={{ background: 'hsl(220 25% 8%)', border: '1px solid hsl(220 25% 25%)' }}
                    placeholder="Pegar URL de imagen nueva…"
                  />
                  <button onClick={() => saveNew(pid)}
                    disabled={!newUrl[pid]?.trim() || saving[pid]}
                    className="shrink-0 px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-1.5 transition-all disabled:opacity-40"
                    style={{ background: 'hsl(340 84% 50%)', color: 'white' }}>
                    {saving[pid] ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── SPINNER ─────────────── */
function Spinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <RefreshCw className="w-6 h-6 animate-spin" style={{ color: 'hsl(340 84% 60%)' }} />
    </div>
  );
}

/* ─────────────── TABS ─────────────── */
const TABS = [
  { id: 'stock',  label: 'Stock',    icon: Package },
  { id: 'prices', label: 'Precios',  icon: DollarSign },
  { id: 'images', label: 'Imágenes', icon: ImageIcon },
] as const;
type TabId = typeof TABS[number]['id'];

/* ─────────────── DASHBOARD ─────────────── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>('stock');

  const logout = async () => {
    await api('POST', '/logout').catch(() => {});
    onLogout();
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(220 25% 7%)' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 border-b"
        style={{ background: 'hsl(220 25% 10%)', borderColor: 'hsl(220 25% 16%)' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, hsl(340 84% 50%), hsl(280 75% 55%))' }}>
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm leading-none">Panel Admin</h1>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Candy's Pet 🐾</p>
            </div>
          </div>
          <button onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>

        {/* Tab bar */}
        <div className="max-w-3xl mx-auto px-4 flex gap-1 pb-0">
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl transition-all relative"
                style={{
                  color: active ? 'white' : 'rgba(255,255,255,0.45)',
                  background: active ? 'hsl(220 25% 7%)' : 'transparent',
                }}>
                <Icon className="w-4 h-4" />
                {t.label}
                {active && (
                  <motion.div layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'hsl(340 84% 50%)' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}>
            {tab === 'stock'  && <StockTab />}
            {tab === 'prices' && <PricesTab />}
            {tab === 'images' && <ImagesTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────── PAGE ROOT ─────────────── */
export function AdminPage() {
  const [auth, setAuth] = useState<'loading' | 'yes' | 'no'>('loading');

  useEffect(() => {
    api('GET', '/me')
      .then(() => setAuth('yes'))
      .catch(() => setAuth('no'));
  }, []);

  if (auth === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(220 25% 7%)' }}>
        <RefreshCw className="w-8 h-8 animate-spin" style={{ color: 'hsl(340 84% 60%)' }} />
      </div>
    );
  }

  if (auth === 'no') return <LoginScreen onSuccess={() => setAuth('yes')} />;
  return <Dashboard onLogout={() => setAuth('no')} />;
}
