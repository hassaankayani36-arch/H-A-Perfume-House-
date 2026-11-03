import { useCallback, useEffect, useState } from "react";
import { LogOut, Package, ShoppingBag, RefreshCw, Save, X, Plus, Trash2 } from "lucide-react";
import { ApiError, apiRequest } from "../api/client.js";
import { useProducts } from "../context/ProductContext.jsx";

const orderStatuses = ["New", "Pending", "Completed", "Failed"];
const families = ["Fresh", "Woody", "Oriental", "Intense"];
const fieldClass = "w-full border border-[#34312D] bg-[#101010] px-3 py-2.5 text-sm text-[#F5F2EC] outline-none focus:border-[#C6A15B]";
const labelClass = "mb-1.5 block text-[10px] uppercase tracking-[0.16em] text-[#F5F2EC]/55";

function toEditForm(product) {
  return {
    ...product,
    tagsText: (product.tags ?? []).join(", "),
    topNotesText: (product.topNotes ?? []).join(", "),
    heartNotesText: (product.heartNotes ?? []).join(", "),
    baseNotesText: (product.baseNotes ?? []).join(", "),
    imagesText: (product.images ?? []).join("\n"),
    variants: product.variants.map((variant) => ({ ...variant })),
  };
}

function newProductForm() {
  return {
    isNew: true,
    name: "",
    description: "",
    family: "Fresh",
    category: "Fragrances",
    tagsText: "",
    topNotesText: "",
    heartNotesText: "",
    baseNotesText: "",
    imagesText: "",
    longevity: "8h+",
    projection: "Moderate",
    variants: [{ size: "50ML", price: 0, compareAtPrice: 0, inStock: true }],
    isActive: true,
    bestSeller: false,
    isSignature: false,
  };
}

function asList(value) {
  return value.split(",").map((entry) => entry.trim()).filter(Boolean);
}

function formatDate(value) {
  return new Date(value).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" });
}

function formatOrderAmount(order, currency) {
  const amount = currency === "USD" ? order.amountUsd : order.amountPkr;
  if (amount === null || amount === undefined) return "USD unavailable for this legacy order";
  return new Intl.NumberFormat(currency === "PKR" ? "en-PK" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "PKR" ? 0 : 2,
  }).format(amount);
}

function formatCurrencyAmount(amount, currency) {
  return new Intl.NumberFormat(currency === "PKR" ? "en-PK" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "PKR" ? 0 : 2,
  }).format(amount);
}

export default function Admin() {
  const { reloadProducts } = useProducts();
  const [admin, setAdmin] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState("orders");
  const [currency, setCurrency] = useState("PKR");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadDashboard = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const [productRows, orderRows] = await Promise.all([
        apiRequest("/api/admin/products"),
        apiRequest("/api/admin/orders"),
      ]);
      setProducts(productRows);
      setOrders(orderRows);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Dashboard data could not be loaded.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    apiRequest("/api/admin/session")
      .then((session) => {
        if (active) setAdmin(session);
      })
      .catch((requestError) => {
        if (!active) return;
        if (!(requestError instanceof ApiError && requestError.status === 401)) {
          setError(requestError instanceof Error ? requestError.message : "Admin session could not be checked.");
        }
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (admin) void loadDashboard();
  }, [admin, loadDashboard]);

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const session = await apiRequest("/api/admin/session", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAdmin(session);
      setPassword("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    setError("");
    try {
      await apiRequest("/api/admin/session", { method: "DELETE" });
      setAdmin(null);
      setProducts([]);
      setOrders([]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Sign-out failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSaveProduct(event) {
    event.preventDefault();
    if (!editingProduct) return;
    setBusy(true);
    setError("");
    setNotice("");
    const { tagsText, topNotesText, heartNotesText, baseNotesText, imagesText, _id, id, isNew, ...form } = editingProduct;
    const payload = {
      name: form.name,
      description: form.description,
      family: form.family,
      category: form.category,
      tags: asList(tagsText),
      topNotes: asList(topNotesText),
      heartNotes: asList(heartNotesText),
      baseNotes: asList(baseNotesText),
      images: imagesText.split(/\r?\n/).map((image) => image.trim()).filter(Boolean),
      longevity: form.longevity,
      projection: form.projection,
      variants: form.variants,
      isActive: form.isActive,
      bestSeller: form.bestSeller,
      isSignature: form.isSignature,
    };
    try {
      await apiRequest(isNew ? "/api/admin/products" : `/api/admin/products/${encodeURIComponent(id)}`, {
        method: isNew ? "POST" : "PATCH",
        body: JSON.stringify(payload),
      });
      setEditingProduct(null);
      setNotice(`${form.name} was ${isNew ? "created" : "saved"}.`);
      await Promise.all([loadDashboard(), reloadProducts()]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Product could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  async function updateOrder(order, changes) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const updated = await apiRequest(`/api/admin/orders/${encodeURIComponent(order.recordId)}/status`, {
        method: "PATCH",
        body: JSON.stringify(changes),
      });
      setOrders((current) => current.map((entry) => entry.recordId === order.recordId ? updated : entry));
      setNotice(`Order ${order.orderNumber} was updated.`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Order could not be updated.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteOrder(order) {
    if (!window.confirm(`Permanently delete order ${order.orderNumber}? This cannot be undone.`)) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await apiRequest(`/api/admin/orders/${encodeURIComponent(order.recordId)}`, { method: "DELETE" });
      setOrders((current) => current.filter((entry) => entry.recordId !== order.recordId));
      setNotice(`Order ${order.orderNumber} was deleted.`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Order could not be deleted.");
    } finally {
      setBusy(false);
    }
  }

  if (checkingSession) return <AdminMessage message="Checking administrator access…" />;

  if (!admin) {
    return (<div className="min-h-screen bg-[#0B0B0B] px-4 py-16 text-[#F5F2EC]">
      <form onSubmit={handleLogin} className="mx-auto mt-10 max-w-md space-y-6 border border-[#302C25] bg-[#121212] p-8 sm:p-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B]">H&amp;A · Private access</p>
        <div>
          <h1 className="font-serif text-3xl font-light">Admin sign in</h1>
          <p className="mt-2 text-sm text-[#F5F2EC]/55">Use the administrator credentials configured on the server.</p>
        </div>
        {error && <p role="alert" className="border border-red-900/70 bg-red-950/30 p-3 text-sm text-red-300">{error}</p>}
        <label className="block">
          <span className={labelClass}>Email</span>
          <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass}/>
        </label>
        <label className="block">
          <span className={labelClass}>Password</span>
          <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className={fieldClass}/>
        </label>
        <button disabled={busy} className="w-full bg-[#C6A15B] px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#0B0B0B] disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>);
  }

  const pendingOrders = orders.filter((order) => ["New", "Pending"].includes(order.status)).length;
  const activeProducts = products.filter((product) => product.isActive).length;

  return (<div className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EC] sm:px-6 lg:px-10">
    <header className="mx-auto flex max-w-7xl flex-col justify-between gap-5 border-b border-[#292621] pb-6 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B]">H&amp;A · Operations</p>
        <h1 className="mt-2 font-serif text-3xl font-light sm:text-4xl">Maison dashboard</h1>
        <p className="mt-2 text-xs text-[#F5F2EC]/50">Signed in as {admin.email}</p>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => void loadDashboard()} disabled={busy} className="inline-flex items-center gap-2 border border-[#34312D] px-4 py-2.5 text-xs uppercase tracking-widest hover:border-[#C6A15B] disabled:opacity-50">
          <RefreshCw className="h-3.5 w-3.5"/> Refresh
        </button>
        <button type="button" onClick={() => void handleLogout()} disabled={busy} className="inline-flex items-center gap-2 border border-[#34312D] px-4 py-2.5 text-xs uppercase tracking-widest hover:border-[#C6A15B] disabled:opacity-50">
          <LogOut className="h-3.5 w-3.5"/> Sign out
        </button>
      </div>
    </header>

    <div className="mx-auto max-w-7xl">
      {error && <p role="alert" className="mt-5 border border-red-900/70 bg-red-950/30 p-3 text-sm text-red-300">{error}</p>}
      {notice && <p role="status" className="mt-5 border border-[#6C582F] bg-[#C6A15B]/10 p-3 text-sm text-[#DFC27D]">{notice}</p>}

      <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Products on site" value={activeProducts} Icon={Package}/>
        <StatCard label="Orders on file" value={orders.length} Icon={ShoppingBag}/>
        <StatCard label="Orders to process" value={pendingOrders} Icon={RefreshCw}/>
      </section>

      <nav className="mt-8 flex gap-2 border-b border-[#292621]" aria-label="Dashboard sections">
        {[["orders", "Orders"], ["products", "Products"]].map(([value, label]) => (
          <button key={value} type="button" onClick={() => setTab(value)} className={`border-b-2 px-4 py-3 text-xs uppercase tracking-[0.16em] ${tab === value ? "border-[#C6A15B] text-[#C6A15B]" : "border-transparent text-[#F5F2EC]/55 hover:text-[#F5F2EC]"}`}>
            {label}
          </button>
        ))}
      </nav>

      {tab === "orders" && <div className="mt-5 flex items-center gap-3 text-xs">
        <label htmlFor="order-currency" className="uppercase tracking-widest text-[#F5F2EC]/55">Display currency</label>
        <select id="order-currency" value={currency} onChange={(event) => setCurrency(event.target.value)} className="border border-[#34312D] bg-[#0B0B0B] px-3 py-2 text-[#F5F2EC]">
          <option value="PKR">PKR</option>
          <option value="USD">USD</option>
        </select>
      </div>}

      {busy && <p className="py-4 text-xs text-[#F5F2EC]/50">Saving or loading dashboard data…</p>}
      {tab === "orders" ? <OrdersPanel orders={orders} currency={currency} busy={busy} onUpdate={updateOrder} onDelete={deleteOrder}/> :
        <ProductsPanel
          products={products}
          onCreate={() => setEditingProduct(newProductForm())}
          onEdit={(product) => setEditingProduct(toEditForm(product))}
        />}
    </div>

    {editingProduct && <ProductEditor
      product={editingProduct}
      busy={busy}
      onClose={() => setEditingProduct(null)}
      onChange={setEditingProduct}
      onSave={handleSaveProduct}
    />}
  </div>);
}

function StatCard({ label, value, Icon }) {
  return <div className="flex items-center justify-between border border-[#292621] bg-[#121212] p-5">
    <div><p className="text-[10px] uppercase tracking-[0.15em] text-[#F5F2EC]/45">{label}</p><p className="mt-2 font-serif text-3xl text-[#DFC27D]">{value}</p></div>
    <Icon className="h-5 w-5 text-[#C6A15B]"/>
  </div>;
}

function OrdersPanel({ orders, currency, busy, onUpdate, onDelete }) {
  if (orders.length === 0) return <AdminMessage message="No orders have been placed yet." />;
  return <section className="space-y-4 py-6">
    {orders.map((order) => <article key={order.recordId} className="border border-[#292621] bg-[#121212] p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 border-b border-[#292621] pb-4 sm:flex-row sm:items-start">
        <div>
          <p className="font-mono text-sm text-[#DFC27D]">{order.orderNumber}</p>
          <p className="mt-1 text-[11px] text-[#F5F2EC]/45">{formatDate(order.createdAt)}</p>
          <p className="mt-3 text-sm">{order.name} · {order.phone}</p>
          <p className="mt-1 text-xs text-[#F5F2EC]/55">{order.email} · {order.city}</p>
          <p className="mt-1 text-xs text-[#F5F2EC]/55">{order.address}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-serif text-2xl text-[#DFC27D]">{formatOrderAmount(order, currency)}</p>
          {order.exchangeRate && <p className="mt-1 text-[10px] text-[#F5F2EC]/45">USD rate: {order.exchangeRate.pkrPerUsd} PKR · {order.exchangeRate.rateDate}</p>}
        </div>
      </div>
      <div className="grid gap-3 py-4 sm:grid-cols-2">
        {order.lineItems.map((item, index) => <div key={`${item.productId}-${item.size}-${index}`} className="flex justify-between gap-4 text-xs">
          <span>{item.name} · {item.size} × {item.quantity}</span>
          <span className="shrink-0 text-[#F5F2EC]/60">
            {currency === "USD"
              ? order.exchangeRate
                ? formatCurrencyAmount(item.unitPrice * item.quantity / order.exchangeRate.pkrPerUsd, currency)
                : "USD unavailable"
              : formatCurrencyAmount(item.unitPrice * item.quantity, currency)}
          </span>
        </div>)}
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-[#292621] pt-4 sm:flex-row sm:items-center">
        {order.giftNote && <p className="max-w-xl text-xs text-[#F5F2EC]/55">Gift note: {order.giftNote}</p>}
        <div className="flex flex-wrap gap-3">
          <label className="text-[9px] uppercase tracking-widest text-[#F5F2EC]/40">Order
            <select disabled={busy} value={order.status} onChange={(event) => void onUpdate(order, { status: event.target.value })} className="ml-2 border border-[#34312D] bg-[#0B0B0B] px-2 py-2 text-xs text-[#F5F2EC]">
              {orderStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
          <button type="button" disabled={busy} onClick={() => void onDelete(order)} className="inline-flex items-center gap-2 border border-red-900/70 px-3 py-2 text-[10px] uppercase tracking-widest text-red-300 hover:bg-red-950/40 disabled:opacity-50">
            <Trash2 className="h-3.5 w-3.5"/> Delete order
          </button>
        </div>
      </div>
    </article>)}
  </section>;
}

function ProductsPanel({ products, onCreate, onEdit }) {
  return <section className="space-y-3 py-6">
    <div className="flex justify-end">
      <button type="button" onClick={onCreate} className="inline-flex items-center gap-2 bg-[#C6A15B] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#0B0B0B]">
        <Plus className="h-4 w-4"/> Add product
      </button>
    </div>
    {products.map((product) => <article key={product.id} className="flex flex-col justify-between gap-4 border border-[#292621] bg-[#121212] p-4 sm:flex-row sm:items-center sm:p-5">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-xl">{product.name}</h2>
          {!product.isActive && <span className="border border-red-900 px-2 py-1 text-[9px] uppercase tracking-widest text-red-300">Hidden</span>}
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-widest text-[#C6A15B]">{product.family} · {product.variants.map((variant) => `${variant.size}: ${variant.inStock ? "in stock" : "out"}`).join(" · ")}</p>
        <p className="mt-1 text-xs text-[#F5F2EC]/55">{product.variants.map((variant) => `${variant.size} PKR ${variant.price.toLocaleString("en-PK")}`).join(" · ")}</p>
      </div>
      <button type="button" onClick={() => onEdit(product)} className="border border-[#6C582F] px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#DFC27D] hover:bg-[#C6A15B]/10">Edit product</button>
    </article>)}
  </section>;
}

function ProductEditor({ product, busy, onClose, onChange, onSave }) {
  const setField = (field, value) => onChange((current) => ({ ...current, [field]: value }));
  const setVariant = (index, field, value) => onChange((current) => ({
    ...current,
    variants: current.variants.map((variant, variantIndex) => variantIndex === index ? { ...variant, [field]: value } : variant),
  }));
  const addVariant = () => onChange((current) => ({
    ...current,
    variants: [...current.variants, { size: "", price: 0, compareAtPrice: 0, inStock: true }],
  }));
  const removeVariant = (index) => onChange((current) => ({
    ...current,
    variants: current.variants.filter((_, variantIndex) => variantIndex !== index),
  }));
  return <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/85 p-4 sm:p-8">
    <form onSubmit={onSave} className="mx-auto my-6 max-w-3xl space-y-5 border border-[#3A3429] bg-[#121212] p-5 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B]">Catalog editor</p><h2 className="mt-1 font-serif text-2xl">{product.isNew ? "Add product" : product.name}</h2></div>
        <button type="button" onClick={onClose} aria-label="Close product editor" className="p-2 text-[#F5F2EC]/60 hover:text-white"><X className="h-5 w-5"/></button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label><span className={labelClass}>Product name</span><input required maxLength={120} value={product.name} onChange={(event) => setField("name", event.target.value)} className={fieldClass}/></label>
        <label><span className={labelClass}>Category</span><input required maxLength={80} value={product.category} onChange={(event) => setField("category", event.target.value)} className={fieldClass}/></label>
        <label><span className={labelClass}>Family</span><select value={product.family} onChange={(event) => setField("family", event.target.value)} className={fieldClass}>{families.map((family) => <option key={family}>{family}</option>)}</select></label>
        <label><span className={labelClass}>Tags (comma-separated)</span><input value={product.tagsText} onChange={(event) => setField("tagsText", event.target.value)} className={fieldClass}/></label>
      </div>
      <label className="block">
        <span className={labelClass}>Product image URLs or local paths · one per line</span>
        <textarea required rows={3} value={product.imagesText} onChange={(event) => setField("imagesText", event.target.value)} placeholder={"https://example.com/perfume.jpg\nimgs/perfume.jpg"} className={fieldClass}/>
        <span className="mt-1 block text-[10px] text-[#F5F2EC]/45">Use HTTPS image URLs or paths to image files under imgs/.</span>
      </label>
      <label className="block"><span className={labelClass}>Description</span><textarea rows={4} maxLength={10000} value={product.description} onChange={(event) => setField("description", event.target.value)} className={fieldClass}/></label>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["topNotesText", "Top notes"], ["heartNotesText", "Heart notes"], ["baseNotesText", "Base notes"]].map(([key, title]) => <label key={key}><span className={labelClass}>{title} (comma-separated)</span><textarea rows={2} value={product[key]} onChange={(event) => setField(key, event.target.value)} className={fieldClass}/></label>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label><span className={labelClass}>Longevity</span><input required maxLength={80} value={product.longevity} onChange={(event) => setField("longevity", event.target.value)} className={fieldClass}/></label>
        <label><span className={labelClass}>Projection</span><input required maxLength={80} value={product.projection} onChange={(event) => setField("projection", event.target.value)} className={fieldClass}/></label>
      </div>
      <div>
        <p className={labelClass}>Size pricing and availability · whole PKR</p>
        <div className="space-y-3">
          {product.variants.map((variant, index) => <div key={`${variant.size}-${index}`} className="grid grid-cols-2 gap-3 border border-[#292621] p-3 sm:grid-cols-4">
            <label><span className={labelClass}>Size</span><input required maxLength={24} value={variant.size} onChange={(event) => setVariant(index, "size", event.target.value)} className={fieldClass}/></label>
            <label><span className={labelClass}>Selling price</span><input required type="number" min="0" step="1" value={variant.price} onChange={(event) => setVariant(index, "price", event.target.valueAsNumber)} className={fieldClass}/></label>
            <label><span className={labelClass}>Compare-at price</span><input required type="number" min="0" step="1" value={variant.compareAtPrice} onChange={(event) => setVariant(index, "compareAtPrice", event.target.valueAsNumber)} className={fieldClass}/></label>
            <label className="flex items-center gap-2 self-end pb-3 text-xs"><input type="checkbox" checked={variant.inStock} onChange={(event) => setVariant(index, "inStock", event.target.checked)} className="accent-[#C6A15B]"/> In stock</label>
            {product.variants.length > 1 && <button type="button" onClick={() => removeVariant(index)} className="self-end pb-3 text-left text-xs text-red-300">Remove size</button>}
          </div>)}
        </div>
        {product.variants.length < 10 && <button type="button" onClick={addVariant} className="mt-3 inline-flex items-center gap-2 border border-[#34312D] px-3 py-2 text-[10px] uppercase tracking-widest hover:border-[#C6A15B]"><Plus className="h-3.5 w-3.5"/> Add size</button>}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[#292621] pt-4">
        {[["isActive", "Visible in shop"], ["bestSeller", "Show in atelier picks"], ["isSignature", "Show in signature collection"]].map(([key, title]) => <label key={key} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={product[key]} onChange={(event) => setField(key, event.target.checked)} className="accent-[#C6A15B]"/>{title}</label>)}
      </div>
      <div className="flex justify-end gap-3 border-t border-[#292621] pt-4">
        <button type="button" onClick={onClose} className="border border-[#34312D] px-4 py-3 text-xs uppercase tracking-widest">Cancel</button>
        <button disabled={busy} className="inline-flex items-center gap-2 bg-[#C6A15B] px-5 py-3 text-xs font-medium uppercase tracking-widest text-[#0B0B0B] disabled:opacity-60"><Save className="h-4 w-4"/> {product.isNew ? "Create product" : "Save changes"}</button>
      </div>
    </form>
  </div>;
}

function AdminMessage({ message }) {
  return <div className="flex min-h-[30vh] items-center justify-center px-6 text-center text-sm text-[#F5F2EC]/60">{message}</div>;
}
