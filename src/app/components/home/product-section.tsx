'use client';

import {useRef} from 'react';
import {ProductCard} from '../product/product-card';
import type {Product} from '@/app/types';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  badge?: string;
  badgeColor?: string;
  isLoading?: boolean;
}

export function ProductSection({
  title,
  subtitle,
  products,
  badge,
  badgeColor = 'bg-foreground',
  isLoading = false,
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
        className="
    flex flex-nowrap overflow-x-auto gap-4 pb-2 w-full
    sm:flex-wrap sm:overflow-visible
  ">
        {isLoading
          ? Array.from({length: 5}).map((_, i) => (
              <div
                key={i}
                className="w-[90vw] max-w-xs sm:w-[240px] min-h-[320px] bg-muted animate-pulse rounded-[2rem] flex-shrink-0 mx-auto"
              />
            ))
          : products.map(product => (
              <div
                key={product.id}
                className="w-[90vw] max-w-xs sm:w-[240px] min-h-[320px] flex-shrink-0 flex mx-auto">
                <ProductCard product={product} className="w-full h-full" />
              </div>
            ))}
      </div>
    </section>
  );
}
