import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { 
  getProducts, 
  addProduct as apiAddProduct, 
  updateProduct as apiUpdateProduct, 
  deleteProduct as apiDeleteProduct,
  uploadProductImage as apiUploadImage
} from '../services/productService';
import { isSupabaseConfigured } from '../config/supabase';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured] = useState<boolean>(isSupabaseConfigured());

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      console.error('Error in useProducts hook:', err);
      setError(err.message || 'Gabim gjatë ngarkimit të produkteve');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at'>) => {
    const newProd = await apiAddProduct(productData);
    if (newProd) {
      setProducts(prev => [newProd, ...prev]);
    }
    fetchProducts();
    return newProd;
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    const success = await apiUpdateProduct(id, updatedFields);
    if (success) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    }
    fetchProducts();
    return success;
  };

  const deleteProduct = async (id: string) => {
    const success = await apiDeleteProduct(id);
    if (success) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
    fetchProducts();
    return success;
  };

  const uploadImage = async (file: File) => {
    return await apiUploadImage(file);
  };

  return {
    products,
    loading,
    error,
    isConfigured,
    refetch: fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage
  };
}
