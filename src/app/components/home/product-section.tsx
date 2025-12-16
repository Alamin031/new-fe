'use client';

import {useRef} from 'react';
import {ProductCard} from '../product/product-card';
import type {Product} from '@/app/types';

import type { EmiPlan } from "@/app/lib/api/services/emi";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  badge?: string;
  badgeColor?: string;
  isLoading?: boolean;
  emiPlans?: EmiPlan[];
}

export function ProductSection({
  title,
  subtitle,
  products,
  badge,
  badgeColor = 'bg-foreground',
  isLoading = false,
  emiPlans,
}: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            {badge && (
              <span
                className={`rounded-full ${badgeColor} px-3 py-1 text-xs font-medium text-background`}>
                {badge}
              </span>
            )}
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h2>
          </div>
          {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-auto gap-3 pb-2 w-full lg:gap-6 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="w-[48vw] max-w-[180px] h-[200px] lg:w-[23%] lg:max-w-xs lg:h-[320px] bg-muted animate-pulse rounded-[1.2rem] flex-shrink-0 mx-auto"
              />
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className="w-[48vw] max-w-[180px] h-[260px] lg:w-[23%] lg:max-w-xs lg:h-[340px] flex-shrink-0 flex mx-auto"
              >
                <ProductCard product={product} className="w-full h-full" emiPlans={emiPlans} />
              </div>
            ))}
      </div>
    </section>
  );
}
