'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { StatsCard } from '@/components/StatsCard';
import { ProductTable } from '@/components/ProductTable';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/lib/toast-context';
import { getDashboardStats, getProducts } from '@/lib/api';
import { Product, DashboardStats } from '@/lib/types';

export default function DashboardPage() {
  const { addToast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setIsLoading(true);
    try {
      // Fetch stats
      const statsRes = await getDashboardStats();
      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      } else {
        addToast('Failed to load dashboard stats', 'error');
      }

      // Fetch recent products
      const productsRes = await getProducts();
      if (productsRes.success && Array.isArray(productsRes.data)) {
        setRecentProducts(productsRes.data.slice(0, 5));
      } else {
        addToast('Failed to load products', 'error');
      }
    } catch (error) {
      addToast('An error occurred while loading dashboard data', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <LayoutWrapper title="Dashboard" subtitle="Welcome to AI Product Content Automation">
        <LoadingSpinner fullScreen text="Loading dashboard..." />
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper title="Dashboard" subtitle="Overview of your product automation system">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value={stats?.total_products || 0}
          subtitle="All uploaded products"
          icon="📦"
          color="blue"
        />
        <StatsCard
          title="Pending Approval"
          value={stats?.pending || 0}
          subtitle="Awaiting AI processing"
          icon="⏳"
          color="yellow"
        />
        <StatsCard
          title="Published Products"
          value={stats?.published || 0}
          subtitle="Live and available"
          icon="✅"
          color="green"
        />
        <StatsCard
          title="Rejected Products"
          value={stats?.rejected || 0}
          subtitle="Need revision"
          icon="❌"
          color="red"
        />
      </div>

      {/* Recent Products Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recent Products</h2>
            <p className="text-sm text-slate-600">Latest uploads and updates</p>
          </div>
          <Link
            href="/products"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            View All
          </Link>
        </div>

        <ProductTable products={recentProducts} />
      </div>

      {/* Retry Button */}
      {!isLoading && (
        <div className="mt-8 text-center">
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            ↻ Refresh Data
          </button>
        </div>
      )}
    </LayoutWrapper>
  );
}
