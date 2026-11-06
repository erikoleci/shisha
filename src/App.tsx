import React, { useState } from 'react';
import { Product } from './types';
import { useProducts } from './hooks/useProducts';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import { ProductsPage } from './pages/Products';
import { AdminPage } from './pages/Admin';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import mraLogo from './assets/mra-logo.jpeg';

export default function App() {
  // Use products hook for Supabase integration
  const {
    products,
    loading,
    isConfigured,
    refetch,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage
  } = useProducts();

  // Active section or page
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'admin') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Category selection handler from Categories section
  const handleSelectCategoryFromSection = (cat: string) => {
    setSelectedCategory(cat);
    handleNavigate('products');
  };

  return (
    <div className="relative isolate min-h-screen bg-ink text-bone font-sans selection:bg-crimson selection:text-bone overflow-x-hidden">

      {/* Logo as a fixed, darkened full-page backdrop (behind everything, never blocks clicks) */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-[0.22] saturate-[0.8]"
          style={{ backgroundImage: `url(${mraLogo})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, rgb(20 10 12 / 0.35) 0%, rgb(20 10 12 / 0.82) 60%, #140a0c 100%)',
          }}
        />
      </div>

      {/* Fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isSupabaseConnected={isConfigured}
      />

      {/* Main Content View Switcher */}
      <main className="relative z-10 pt-16">
        {activeSection === 'admin' ? (
          <AdminPage
            products={products}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onUploadImage={uploadImage}
            onRefresh={refetch}
          />
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection onShopClick={() => handleNavigate('products')} />

            {/* Categories Section */}
            <CategoriesSection onSelectCategory={handleSelectCategoryFromSection} />

            {/* Products Page / Section */}
            <ProductsPage
              products={products}
              onSelectProduct={setSelectedProduct}
              selectedCategory={selectedCategory}
            />

            {/* About Section */}
            <AboutSection />

            {/* Contact Section */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdminModal={() => handleNavigate('admin')}
      />

      {/* Floating WhatsApp Quick Trigger */}
      <WhatsAppButton />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
}
