import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

/**
 * Legacy wrapper fallback for subscribeToProducts using INITIAL_PRODUCTS
 */
export function subscribeToProducts(onData: (products: Product[]) => void) {
  onData(INITIAL_PRODUCTS);
  return () => {};
}

export async function addProductToFirebase(product: Omit<Product, 'id'>) {
  return String(Date.now());
}

export async function updateProductInFirebase(id: string, updatedFields: Partial<Product>) {
  return;
}

export async function deleteProductFromFirebase(id: string) {
  return;
}
