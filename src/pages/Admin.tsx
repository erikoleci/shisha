import React, { useState } from 'react';
import { Product, CATEGORIES } from '../types';
import { 
  Database, 
  Plus, 
  Trash2, 
  Upload, 
  ImageIcon, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Code,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { isSupabaseConfigured } from '../config/supabase';

interface AdminPageProps {
  products: Product[];
  onAddProduct: (newProduct: Omit<Product, 'id' | 'created_at'>) => Promise<any>;
  onUpdateProduct: (id: string, updatedFields: Partial<Product>) => Promise<any>;
  onDeleteProduct: (id: string) => Promise<any>;
  onUploadImage: (file: File) => Promise<string | null>;
  onRefresh: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUploadImage,
  onRefresh
}) => {
  // Password Protection State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'sql'>('manage');
  const [loading, setLoading] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  // Form State (Price starts completely empty '')
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Shisha / Hookah');
  const [price, setPrice] = useState<string>('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const isConnected = isSupabaseConfigured();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  // File Upload Handler for PC & Phone
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Fotoja është shumë e madhe (>10MB). Zgjidhni një foto më të vogël.");
        return;
      }
      setImageFile(file);

      // Local preview reader
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      let finalImageUrl = imageUrl;

      // Upload file if selected from PC/Phone
      if (imageFile) {
        const uploadedUrl = await onUploadImage(imageFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      if (!finalImageUrl) {
        finalImageUrl = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";
      }

      const numericPrice = price.trim() === '' ? 0 : parseFloat(price);

      await onAddProduct({
        name,
        category,
        price: isNaN(numericPrice) ? 0 : numericPrice,
        image_url: finalImageUrl,
        description: description || "Produkt premium shisha me porosi direkte në WhatsApp.",
        available: true,
        badge: badge || ''
      });

      // Reset form (leaving price empty '')
      setName('');
      setPrice('');
      setImageUrl('');
      setImagePreview('');
      setImageFile(null);
      setDescription('');
      setBadge('');
      setActiveTab('manage');
      alert('Produkti u shtua me sukses në Supabase Database!');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Pati një gabim gjatë ruajtjes së produktit.');
    } finally {
      setLoading(false);
    }
  };

  const handlePriceUpdate = async (id: string, newPrice: number) => {
    await onUpdateProduct(id, { price: newPrice });
  };

  const handleToggleAvailability = async (id: string, currentAvailable: boolean) => {
    await onUpdateProduct(id, { available: !currentAvailable });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("A jeni i sigurt që dëshironi të fshini këtë produkt?")) {
      try {
        await onDeleteProduct(id);
      } catch (err: any) {
        console.error('Error in handleDelete:', err);
      }
    }
  };

  // If NOT authenticated, show password screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-950">
        <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-center text-white backdrop-blur-xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white font-serif mb-1">
            Paneli Admin VIP
          </h2>
          <p className="text-xs text-slate-300 mb-6 font-light">
            Shkruani fjalëkalimin për të hapur panelin e menaxhimit të dyqanit
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase text-amber-300 mb-1.5 tracking-wider">
                Fjalëkalimi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Shkruaj fjalëkalimin..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none pr-10 transition-colors ${
                    loginError ? 'border-rose-500 focus:border-rose-500 bg-rose-950/20' : 'border-amber-500/30 focus:border-amber-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 p-1"
                  title={showPassword ? "Fshih fjalëkalimin" : "Trego fjalëkalimin"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-rose-400 font-bold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Fjalëkalimi është i pasaktë. Provoni përsëri.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Hyr në Admin Dashboard</span>
            </button>
          </form>

          <p className="text-[11px] text-slate-400 mt-6 pt-4 border-t border-amber-500/10 font-light">
            Shisha Store Albania • Akses i mbrojtur
          </p>
        </div>
      </div>
    );
  }

  const sqlSetupScript = `-- 1. KRIJIMI I TABELËS PRODUCTS NË SUPABASE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Lejo lexim publik të produkteve
CREATE POLICY "Public Read Products" 
ON public.products FOR SELECT 
USING (true);

-- Lejo modifikim të plotë (Për produkte)
CREATE POLICY "Admin Full Access Products" 
ON public.products FOR ALL 
USING (true);

-- 3. KRIJIMI I BUCKET-IT NE SUPABASE STORAGE
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Lejo lexim publik në bucket product-images
CREATE POLICY "Public Access Storage" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

-- Lejo ngarkim fotosh në storage
CREATE POLICY "Public Upload Storage" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');
`;

  return (
    <div className="py-12 bg-slate-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="bg-slate-900 rounded-2xl border border-amber-500/30 p-6 sm:p-8 shadow-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <Database className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-black text-white font-serif">
                Supabase Admin Dashboard
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Menaxhoni produktet, ndryshoni çmimet, disponueshmërinë dhe ngarkoni foto direkte në Supabase Database.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rifresko</span>
            </button>

            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Supabase Connected</span>
              </span>
            ) : (
              <button
                onClick={() => setShowSqlModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Lidh Supabase (Shiko SQL Script)</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-500/40 cursor-pointer"
              title="Dalje nga paneli admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Dil</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-amber-500/20 bg-slate-900 rounded-t-2xl px-6 pt-4 gap-2">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-xl border-t border-x transition-colors cursor-pointer ${
              activeTab === 'manage'
                ? 'bg-slate-950 border-amber-500/40 text-amber-400 font-black'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Produktet ({products.length})
          </button>
          
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-xl border-t border-x transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'add'
                ? 'bg-slate-950 border-amber-500/40 text-amber-400 font-black'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Shto Produkt me Foto</span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-xl border-t border-x transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sql'
                ? 'bg-slate-950 border-amber-500/40 text-amber-400 font-black'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Supabase SQL Setup</span>
          </button>
        </div>

        {/* Container Content */}
        <div className="bg-slate-900 border-x border-b border-amber-500/30 rounded-b-2xl p-6 shadow-2xl">
          
          {/* TAB 1: MANAGE PRODUCTS */}
          {activeTab === 'manage' && (
            <div className="space-y-3">
              {products.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm font-light">
                  Nuk ka produkte në database ose po ngarkohen...
                </div>
              ) : (
                products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
                  >
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <img
                        src={prod.image_url}
                        alt={prod.name}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-900 shrink-0 border border-amber-500/30 shadow-md"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                          {prod.category}
                        </span>
                        <h4 className="text-sm font-bold text-white font-serif">{prod.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 max-w-md font-light">{prod.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-amber-500/10">
                      {/* Price editor */}
                      <div className="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-sm">
                        <span className="text-[10px] text-amber-300 uppercase font-bold">Çmimi:</span>
                        <input
                          type="number"
                          value={prod.price}
                          onChange={(e) => handlePriceUpdate(prod.id, Number(e.target.value))}
                          className="w-16 bg-transparent text-xs font-bold text-white focus:outline-none"
                        />
                        <span className="text-xs font-black text-amber-400">€</span>
                      </div>

                      {/* Availability toggle */}
                      <button
                        onClick={() => handleToggleAvailability(prod.id, prod.available)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm cursor-pointer ${
                          prod.available
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                            : 'bg-rose-950 text-rose-300 border border-rose-500/50'
                        }`}
                      >
                        {prod.available ? 'Në Gjendje' : 'Mungon'}
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-2 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-500/30 transition-colors cursor-pointer"
                        title="Fshi produktin"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: ADD PRODUCT & UPLOAD PHOTO */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateSubmit} className="space-y-4 max-w-2xl mx-auto py-2">
              <h3 className="text-lg font-bold text-white font-serif mb-4 pb-2 border-b border-amber-500/20">
                Shto Produkt të Ri në Supabase
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase text-amber-300 mb-1 tracking-wider">Emri i Produktit *</label>
                <input
                  type="text"
                  required
                  placeholder="p.sh. El-Badia C7 Premium Hookah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-amber-300 mb-1 tracking-wider">Kategoria *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-amber-300 mb-1 tracking-wider">Çmimi (€) *</label>
                  <input
                    type="number"
                    required
                    step="any"
                    placeholder="Shkruaj çmimin (p.sh. 120)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* PHOTO UPLOADER OPTION */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
                <label className="block text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5 tracking-wider">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Foto e Produktit</span>
                </label>

                {/* Direct File Input */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    1. Zgjidh foto nga Kompjuteri apo Celulari:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-300 cursor-pointer"
                  />
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    2. Ose vendosni direkt Image URL:
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-amber-500/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Preview Thumbnail */}
                {imagePreview && (
                  <div className="pt-2 flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-amber-500/30 shadow-md"
                    />
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Fotoja u përzgjodh për ngarkim!
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-amber-300 mb-1 tracking-wider">Etiketa (Badge - Opcionale)</label>
                <input
                  type="text"
                  placeholder="p.sh. Bestseller, El-Badia Original, I Ri"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-amber-300 mb-1 tracking-wider">Përshkrimi *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Përshkruani specifikat e shishës apo aksesorit..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>{loading ? 'Po ruhet në Supabase...' : 'Ruaj Produktin në Supabase'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: SQL SETUP GUIDE */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">
                Lidhja me Supabase real (Kopjo Këtë Script në SQL Editor të Supabase)
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                1. Hyni në projektin tuaj në <strong>supabase.com</strong><br />
                2. Shkoni te <strong>SQL Editor</strong> dhe ngjisni script-in e mëposhtëm:<br />
                3. Vendosni <code>VITE_SUPABASE_URL</code> dhe <code>VITE_SUPABASE_ANON_KEY</code> në <code>.env</code> file.
              </p>

              <div className="relative bg-slate-950 text-amber-300 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-amber-500/30">
                <pre>{sqlSetupScript}</pre>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(sqlSetupScript);
                  alert('Script-i SQL u kopjua në clipboard!');
                }}
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer"
              >
                Kopjo SQL Script
              </button>
            </div>
          )}

        </div>

      </div>

      {/* SQL Setup Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-amber-500/30 text-white">
            <h3 className="text-lg font-bold text-white font-serif mb-2">
              Konfigurimi i Supabase në Projekt
            </h3>
            <p className="text-xs text-slate-300 mb-4 font-light">
              Për të lidhur projektin tuaj real të biznesit:
            </p>
            <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-amber-500/20 mb-4 font-mono">
              <p className="font-bold text-amber-300">Në file-in .env vendosni:</p>
              <p className="text-amber-400">VITE_SUPABASE_URL=https://your-project.supabase.co</p>
              <p className="text-amber-400">VITE_SUPABASE_ANON_KEY=your-anon-key</p>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-light">
              Pasi t'i keni vendosur, tabelat dhe fotot do të sinkronizohen automatikisht direkt me Supabase Database & Storage bucket <code>product-images</code>.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSqlModal(false)}
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                U Qartësova
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
