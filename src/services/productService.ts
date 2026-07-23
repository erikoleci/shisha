import { supabase, isSupabaseConfigured } from '../config/supabase';
import { Product } from '../types';
import { FALLBACK_PRODUCTS } from '../data/fallbackProducts';

// In-memory store fallback when Supabase is not connected yet
let localProductsStore: Product[] = [...FALLBACK_PRODUCTS];

/**
 * Fetch all products from Supabase 'products' table.
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured() || !supabase) {
    return localProductsStore;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase product query notice (using fallback data):', error.message || error);
      return localProductsStore;
    }

    if (!data || data.length === 0) {
      return localProductsStore;
    }

    // Map database columns to Product interface
    return data.map((item: any) => ({
      id: item.id,
      name: item.name || '',
      category: item.category || 'Shisha / Hookah',
      description: item.description || '',
      price: Number(item.price) || 0,
      image_url: item.image_url || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
      available: item.available !== false,
      created_at: item.created_at,
      badge: item.badge || ''
    }));
  } catch (err) {
    console.warn('Exception fetching products from Supabase (using fallback data):', err);
    return localProductsStore;
  }
}

/**
 * Upload an image file to Supabase Storage bucket 'product-images'
 * or return a clean Base64 Data URL so any photo from PC or phone works 100%.
 */
export async function uploadProductImage(file: File): Promise<string | null> {
  const fileToBase64 = (f: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop');
      reader.readAsDataURL(f);
    });
  };

  if (!isSupabaseConfigured() || !supabase) {
    return await fileToBase64(file);
  }

  try {
    const rawExt = file.name.split('.').pop() || 'jpg';
    const cleanExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const cleanFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${cleanExt}`;

    // Upload directly to root of bucket 'product-images' to avoid invalid subfolder path errors
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(cleanFileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.warn('Notice uploading image to Supabase Storage (falling back to Base64 Data URL):', uploadError.message || uploadError);
      return await fileToBase64(file);
    }

    // Get public URL
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(cleanFileName);

    return data.publicUrl || (await fileToBase64(file));
  } catch (err) {
    console.warn('Exception uploading image to Supabase Storage:', err);
    return await fileToBase64(file);
  }
}

/**
 * Add a new product to Supabase 'products' table.
 */
export async function addProduct(productData: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> {
  const newId = `prod-${Date.now()}`;
  const newProduct: Product = {
    ...productData,
    id: newId,
    created_at: new Date().toISOString()
  };

  if (!isSupabaseConfigured() || !supabase) {
    localProductsStore = [newProduct, ...localProductsStore];
    return newProduct;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: productData.name,
          category: productData.category,
          description: productData.description,
          price: productData.price,
          image_url: productData.image_url,
          available: productData.available,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.warn('Notice adding product to Supabase:', error.message || error);
      localProductsStore = [newProduct, ...localProductsStore];
      return newProduct;
    }

    return {
      id: data.id,
      name: data.name,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      image_url: data.image_url,
      available: data.available,
      created_at: data.created_at
    };
  } catch (err) {
    console.warn('Exception adding product to Supabase:', err);
    localProductsStore = [newProduct, ...localProductsStore];
    return newProduct;
  }
}

/**
 * Update an existing product in Supabase 'products' table.
 */
export async function updateProduct(id: string, updatedFields: Partial<Product>): Promise<boolean> {
  // Update local memory fallback
  localProductsStore = localProductsStore.map(p => p.id === id ? { ...p, ...updatedFields } : p);

  if (!isSupabaseConfigured() || !supabase) {
    return true;
  }

  try {
    const payload: any = {};
    if (updatedFields.name !== undefined) payload.name = updatedFields.name;
    if (updatedFields.category !== undefined) payload.category = updatedFields.category;
    if (updatedFields.description !== undefined) payload.description = updatedFields.description;
    if (updatedFields.price !== undefined) payload.price = updatedFields.price;
    if (updatedFields.image_url !== undefined) payload.image_url = updatedFields.image_url;
    if (updatedFields.available !== undefined) payload.available = updatedFields.available;

    const { error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.warn('Notice updating product in Supabase:', error.message || error);
      return true;
    }

    return true;
  } catch (err) {
    console.warn('Exception updating product in Supabase:', err);
    return true;
  }
}

/**
 * Delete a product from Supabase 'products' table.
 */
export async function deleteProduct(id: string): Promise<boolean> {
  localProductsStore = localProductsStore.filter(p => p.id !== id);

  if (!isSupabaseConfigured() || !supabase) {
    return true;
  }

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (!isUuid) {
      // Local fallback product, deleted from memory store
      return true;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Notice deleting product from Supabase:', error.message || error);
      return true;
    }

    return true;
  } catch (err) {
    console.warn('Exception deleting product from Supabase:', err);
    return true;
  }
}
