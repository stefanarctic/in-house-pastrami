import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, LogOut, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CATEGORIES, type Category } from "@/data/menu";
import {
  getFirebaseAuth,
  isAdminEmail,
  isFirebaseClientConfigured,
} from "@/lib/firebase-web";
import { fetchMenuItemDocsClient, saveMenuItemDoc } from "@/lib/menu-web";
import type { MenuItemDoc } from "@/lib/menu-types";
import { menuQueryKey } from "@/hooks/useMenuItems";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin meniu — In House Pastrami" }],
  }),
  component: AdminPage,
});

const adminMenuQueryKey = ["adminMenuItems"] as const;

function emptyForm(): MenuItemDoc {
  return {
    id: "",
    name: "",
    category: "carne",
    price: 0,
    shortDesc: "",
    longDesc: "",
    ingredients: [],
    allergens: [],
    imageKey: "",
    available: true,
    sortOrder: 0,
  };
}

function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<MenuItemDoc>(emptyForm());
  const [ingredientsText, setIngredientsText] = useState("");
  const [allergensText, setAllergensText] = useState("");
  const editorRef = useRef<HTMLElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isFirebaseClientConfigured()) {
      setAuthReady(true);
      return;
    }
    const unsub = onAuthStateChanged(getFirebaseAuth(), (next) => {
      setUser(next);
      setAuthReady(true);
    });
    return unsub;
  }, []);

  const isAdmin = isAdminEmail(user?.email);
  const canManage = Boolean(user && isAdmin);

  const { data: items = [], isLoading } = useQuery({
    queryKey: adminMenuQueryKey,
    queryFn: fetchMenuItemDocsClient,
    enabled: canManage,
  });

  useEffect(() => {
    if (!selectedId) {
      setForm(emptyForm());
      setIngredientsText("");
      setAllergensText("");
      return;
    }
    const item = items.find((i) => i.id === selectedId);
    if (!item) return;
    setForm({ ...item });
    setIngredientsText((item.ingredients ?? []).join(", "));
    setAllergensText((item.allergens ?? []).join(", "));
  }, [selectedId, items]);

  const saveMutation = useMutation({
    mutationFn: async (payload: MenuItemDoc) => {
      await saveMenuItemDoc(payload);
    },
    onSuccess: async () => {
      toast.success("Produs salvat");
      await queryClient.invalidateQueries({ queryKey: adminMenuQueryKey });
      await queryClient.invalidateQueries({ queryKey: menuQueryKey });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Salvare eșuată");
    },
  });

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)),
    [items],
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFirebaseClientConfigured()) {
      toast.error("Firebase nu este configurat");
      return;
    }
    setLoggingIn(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Autentificare eșuată");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isFirebaseClientConfigured()) {
      toast.error("Firebase nu este configurat");
      return;
    }
    setLoggingIn(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(getFirebaseAuth(), provider);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Autentificare Google eșuată");
    } finally {
      setLoggingIn(false);
    }
  };

  const selectItem = (id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      if (!isMobile) return;
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleLogout = async () => {
    await signOut(getFirebaseAuth());
    setSelectedId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id.trim()) {
      toast.error("ID-ul produsului este obligatoriu");
      return;
    }
    const payload: MenuItemDoc = {
      ...form,
      id: form.id.trim(),
      name: form.name.trim(),
      imageKey: (form.imageKey || form.id).trim(),
      sku: form.sku?.trim() || undefined,
      tag: form.tag?.trim() || undefined,
      kcal: form.kcal != null && !Number.isNaN(form.kcal) ? form.kcal : undefined,
      ingredients: ingredientsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      allergens: allergensText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      price: Number(form.price),
      sortOrder: Number(form.sortOrder) || 0,
      available: Boolean(form.available),
    };
    if (!payload.name || Number.isNaN(payload.price)) {
      toast.error("Nume și preț valide sunt obligatorii");
      return;
    }
    saveMutation.mutate(payload);
  };

  if (!authReady) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (!isFirebaseClientConfigured()) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-display text-3xl">Admin meniu</h1>
          <p className="text-sm text-muted-foreground">
            Adaugă variabilele VITE_FIREBASE_* și VITE_ADMIN_EMAILS în .env, apoi repornește
            serverul.
          </p>
          <Button asChild variant="outline">
            <Link to="/">Înapoi pe site</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-border/60 bg-card/50 p-6"
        >
          <div>
            <h1 className="font-display text-3xl">Admin meniu</h1>
            <p className="text-sm text-muted-foreground mt-1">Autentificare Firebase</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Parolă</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-meat shadow-meat" disabled={loggingIn}>
            {loggingIn ? <Loader2 className="h-4 w-4 animate-spin" /> : "Intră"}
          </Button>
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
              <span className="bg-card px-2 text-muted-foreground">sau</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={loggingIn}
            onClick={handleGoogleLogin}
          >
            {loggingIn ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <GoogleMark className="mr-2 h-4 w-4" /> Continuă cu Google
              </>
            )}
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-1" /> Site
            </Link>
          </Button>
        </form>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-3xl">Acces interzis</h1>
          <p className="text-sm text-muted-foreground">
            Contul {user.email} nu este în lista de admini (VITE_ADMIN_EMAILS).
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={handleLogout}>
              Ieși
            </Button>
            <Button asChild>
              <Link to="/">Site</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/40 sticky top-0 z-20 bg-background/90 backdrop-blur-md">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-xl leading-none">Admin meniu</h1>
            <p className="text-[11px] text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">Site</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-3.5 w-3.5 mr-1" /> Ieși
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] gap-6 items-start">
        <aside className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden w-full min-w-0">
          <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Produse ({sorted.length})
            </span>
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          </div>
          <ul className="max-h-[70vh] overflow-y-auto divide-y divide-border/40 scrollbar-dark">
            {sorted.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => selectItem(item.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-muted/40 transition-colors ${
                    selectedId === item.id ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="text-accent text-sm shrink-0">{item.price} lei</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 flex gap-2">
                    <span>{item.id}</span>
                    {!item.available && <span className="text-destructive">indisponibil</span>}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section
          ref={editorRef}
          className="rounded-2xl border border-border/60 bg-card/40 p-5 md:p-6 w-full min-w-0 scroll-mt-16"
        >
          {!selectedId ? (
            <p className="text-muted-foreground text-sm">Selectează un produs pentru a-l edita.</p>
          ) : (
            <form onSubmit={handleSave} className="space-y-5 w-full">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="font-display text-2xl md:text-3xl">{form.name || form.id}</h2>
                <Button
                  type="submit"
                  className="bg-gradient-meat shadow-meat"
                  disabled={saveMutation.isPending}
                >
                  {saveMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" /> Salvează
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Field label="ID (doc)" htmlFor="id">
                  <Input id="id" value={form.id} disabled className="w-full" />
                </Field>
                <Field label="Nume" htmlFor="name">
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full"
                  />
                </Field>
                <Field label="Categorie" htmlFor="category">
                  <select
                    id="category"
                    className="flex h-9 w-full min-w-0 rounded-md border border-input bg-card px-3 text-sm text-foreground [color-scheme:dark]"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value as Category }))
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-card text-foreground">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Preț (lei)" htmlFor="price">
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    step={1}
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                    required
                    className="w-full"
                  />
                </Field>
                <Field label="SKU DineHub" htmlFor="sku">
                  <Input
                    id="sku"
                    value={form.sku ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                    placeholder={form.id}
                    className="w-full"
                  />
                </Field>
                <Field label="Image key" htmlFor="imageKey">
                  <Input
                    id="imageKey"
                    value={form.imageKey}
                    onChange={(e) => setForm((f) => ({ ...f, imageKey: e.target.value }))}
                    className="w-full"
                  />
                </Field>
                <Field label="Tag" htmlFor="tag">
                  <Input
                    id="tag"
                    value={form.tag ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                    className="w-full"
                  />
                </Field>
                <Field label="Sort order" htmlFor="sortOrder">
                  <Input
                    id="sortOrder"
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
                    className="w-full"
                  />
                </Field>
                <Field label="kcal" htmlFor="kcal">
                  <Input
                    id="kcal"
                    type="number"
                    value={form.kcal ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        kcal: e.target.value === "" ? undefined : Number(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                </Field>
                <div className="flex items-center gap-3 md:pt-6 min-w-0">
                  <Switch
                    id="available"
                    checked={form.available}
                    onCheckedChange={(checked) => setForm((f) => ({ ...f, available: checked }))}
                  />
                  <Label htmlFor="available">Disponibil pe meniu</Label>
                </div>
              </div>

              <Field label="Descriere scurtă" htmlFor="shortDesc">
                <Textarea
                  id="shortDesc"
                  rows={2}
                  value={form.shortDesc}
                  onChange={(e) => setForm((f) => ({ ...f, shortDesc: e.target.value }))}
                  className="w-full"
                />
              </Field>
              <Field label="Descriere lungă" htmlFor="longDesc">
                <Textarea
                  id="longDesc"
                  rows={4}
                  value={form.longDesc}
                  onChange={(e) => setForm((f) => ({ ...f, longDesc: e.target.value }))}
                  className="w-full"
                />
              </Field>
              <Field label="Ingrediente (separate prin virgulă)" htmlFor="ingredients">
                <Textarea
                  id="ingredients"
                  rows={2}
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  className="w-full"
                />
              </Field>
              <Field label="Alergeni (separate prin virgulă)" htmlFor="allergens">
                <Textarea
                  id="allergens"
                  rows={2}
                  value={allergensText}
                  onChange={(e) => setAllergensText(e.target.value)}
                  className="w-full"
                />
              </Field>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 min-w-0 w-full">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3l-.7.5-2.4 1.9C5 19.2 8.2 21 12 21c2.7 0 5-.9 6.7-2.4l-3.1-2.4c-.9.6-2 .9-3.6.9-2.8 0-5.1-1.9-5.9-4.4z"
      />
      <path
        fill="#4A90E2"
        d="M3.5 7.3C2.9 8.5 2.5 9.9 2.5 11.4c0 1.5.4 2.9 1 4.1l3.1-2.4c-.2-.6-.3-1.2-.3-1.7 0-.6.1-1.1.3-1.7L3.5 7.3z"
      />
      <path
        fill="#FBBC05"
        d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.9 14.7 2 12 2 8.2 2 5 3.8 3.5 7.3l3.1 2.4C7.4 7.2 9.7 5.9 12 5.9z"
      />
    </svg>
  );
}
