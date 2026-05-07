/**
 * API Utility for Google Apps Script Integration
 * All requests are proxied through /api/proxy to avoid CORS issues
 */

import { Product, DashboardStats } from './types';

const PROXY_URL = '/api/proxy';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Generic API call function (routed through server-side proxy)
 */
async function apiCall<T>(
  method: 'GET' | 'POST' = 'GET',
  params?: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    let url = PROXY_URL;

    if (method === 'GET' && params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
      url = `${url}?${queryParams.toString()}`;
    }

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    };

    if (method === 'POST' && params) {
      options.body = JSON.stringify(params);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    
    // Support various response formats (flat array, {data: []}, or {products: []})
    let finalData = responseData;
    if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
      if (responseData.products) finalData = responseData.products;
      else if (responseData.data) finalData = responseData.data;
    }

    return {
      success: responseData.success !== false,
      data: finalData,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Add a new product
 */
export async function addProduct(productData: {
  name: string;
  features: string;
  price: number;
  category: string;
}): Promise<ApiResponse<any>> {
  return apiCall<any>('POST', {
    action: 'add_product',
    ...productData,
  });
}

/**
 * Get all products
 */
export async function getProducts(): Promise<ApiResponse<Product[]>> {
  return apiCall<Product[]>('GET', {
    action: 'products',
  });
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<ApiResponse<Product>> {
  return apiCall<Product>('GET', {
    action: 'get_product',
    id,
  });
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  return apiCall<DashboardStats>('GET', {
    action: 'get_dashboard_stats',
  });
}

export default {
  addProduct,
  getProducts,
  getProductById,
  getDashboardStats,
};
