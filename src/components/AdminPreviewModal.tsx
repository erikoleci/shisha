import React, { useState } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';
import { X, Plus, Trash2, Database, ShieldCheck, Upload, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface AdminPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct?: (newProduct: Omit<Product, 'id'>) => Promise<string | null>;
  onUpdateProduct?: (id: string, updatedFields: Partial<Product>) => Promise<boolean>;
  onDeleteProduct?: (id: string) => Promise<boolean>;
}

export const AdminPreviewModal: React.FC<AdminPreviewModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'manage' | 'add'>('manage');
  const [loading, setLoading] = useState(false);

  // New Product Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Shisha / Hookah');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('');

  // Handle Photo File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Fotoja është shumë e madhe (>10MB). Ju lutem zgjidhni një foto më të vogël.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const finalImage = image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";
      const numericPrice = price.trim() === '' ? 0 : parseFloat(price);

      if (onAddProduct) {
        await onAddProduct({
          name,
          category,
          price: isNaN(numericPrice) ? 0 : numericPrice,
          image_url: finalImage,
          description: description || "Produkt i ri premium shisha El-Badia me dërgesë në WhatsApp.",
          available: true,
          badge: badge || "I Ri",
          gallery: [finalImage]
        });
      }

      setName('');
      setPrice('');
      setImage('');
      setImagePreview('');
      setDescription('');
      setBadge('');
      setActiveTab('manage');
    } catch (err) {
      console.error("Gabim në ruajtjen në Supabase:", err);
      alert("Pati një gabim gjatë ruajtjes në Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = async (id: string, newPrice: number) => {
    if (onUpdateProduct) {
      await onUpdateProduct(id, { price: newPrice });
    }
  };

  const handleToggleAvailability = async (id: string, currentAvailable: boolean) => {
    if (onUpdateProduct) {
      await onUpdateProduct(id, { available: !currentAvailable });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("A jeni i sigurt që dëshironi të fshini këtë produkt nga Supabase Database?")) {
      if (onDeleteProduct) {
        await onDeleteProduct(id);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn text-left">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-slate-950 font-bold shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  Panel Menaxhimi & Supabase Database
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Database className="w-3 h-3 text-emerald-600" />
                  Live Supabase DB
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                Regjistroni produkte, ngarkoni foto dhe ruani të dhënat në mënyrë të përhershme në Supabase Database.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl border-t border-x transition-colors ${
              activeTab === 'manage'
                ? 'bg-white border-slate-200 text-red-600 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Produktet në Supabase ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl border-t border-x transition-colors flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'bg-white border-slate-200 text-red-600 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Shto Produkt & Foto</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-grow bg-white">
          
          {/* TAB 1: MANAGE PRODUCTS */}
          {activeTab === 'manage' && (
            <div className="space-y-3">
              {products.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  Po ngarkohen produktet nga Supabase Database...
                </div>
              ) : (
                products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <img
                        src={prod.image_url}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-200 shrink-0 border border-slate-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">
                          {prod.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-serif">{prod.name}</h4>
                        <span className="text-xs font-semibold text-slate-600">{prod.price}€</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {/* Price input quick update */}
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-300 shadow-sm">
                        <span className="text-[10px] text-slate-400 font-bold">Çmimi:</span>
                        <input
                          type="number"
                          value={prod.price}
                          onChange={(e) => handleUpdatePrice(prod.id, Number(e.target.value))}
                          className="w-14 bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                        />
                        <span className="text-xs font-bold text-red-600">€</span>
                      </div>

                      {/* Availability toggle */}
                      <button
                        onClick={() => handleToggleAvailability(prod.id, prod.available)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors shadow-sm ${
                          prod.available
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {prod.available ? 'Në Gjendje' : 'Mungon'}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                        title="Fshi nga Supabase"
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
            <form onSubmit={handleCreateSubmit} className="space-y-4 max-w-xl mx-auto">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Emri i Produktit *</label>
                <input
                  type="text"
                  required
                  placeholder="p.sh. El-Badia Gold Hookah 2026"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Kategoria *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Çmimi (€) *</label>
                  <input
                    type="number"
                    required
                    step="any"
                    placeholder="Shkruaj çmimin (p.sh. 120)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* PHOTO UPLOADER OPTION */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-red-600" />
                  <span>Foto e Produktit (Ngarko nga Pajisja ose me Link)</span>
                </label>

                {/* Direct File Input */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">1. Ngarko Foto nga Kompjuteri / Celulari:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-red-500 file:text-slate-950 hover:file:bg-red-600 cursor-pointer"
                  />
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">2. Ose vendosni Linkun e Fotos (URL):</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Preview Thumbnail */}
                {imagePreview && (
                  <div className="pt-2 flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-slate-300 shadow-sm"
                    />
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Fotoja u përzgjodh me sukses!
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Etiketa (Badge - Opcionale)</label>
                <input
                  type="text"
                  placeholder="p.sh. Bestseller, VIP Choice, I Ri"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Përshkrimi *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Përshkruani detajet e produktit..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-red-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>{loading ? 'Po ruhet në Supabase...' : 'Ruaj Produktin në Supabase Database'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
