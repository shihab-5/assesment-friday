'use client';

import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse-subtle" aria-busy="true" aria-label="Loading tracking details">
      {/* Hero Skeleton */}
      <div className="rounded-3xl p-6 bg-white border border-slate-200/80 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-28 bg-slate-200 rounded-full skeleton-shimmer" />
          <div className="h-5 w-24 bg-slate-200 rounded-full skeleton-shimmer" />
        </div>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-200 shrink-0 skeleton-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-3/4 bg-slate-200 rounded-lg skeleton-shimmer" />
            <div className="h-4 w-full bg-slate-200 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* Estimated Delivery Skeleton */}
      <div className="rounded-2xl p-5 bg-white border border-slate-200/80 shadow-subtle flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 skeleton-shimmer shrink-0" />
          <div className="space-y-2">
            <div className="h-3.5 w-28 bg-slate-200 rounded skeleton-shimmer" />
            <div className="h-5 w-40 bg-slate-200 rounded skeleton-shimmer" />
          </div>
        </div>
        <div className="h-6 w-20 bg-slate-200 rounded-md skeleton-shimmer" />
      </div>

      {/* Timeline Skeleton */}
      <div className="rounded-3xl p-6 bg-white border border-slate-200/80 shadow-subtle space-y-5">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-slate-200 rounded skeleton-shimmer" />
          <div className="h-4 w-12 bg-slate-200 rounded skeleton-shimmer" />
        </div>

        <div className="space-y-5 pl-2">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-200 skeleton-shimmer shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-28 bg-slate-200 rounded skeleton-shimmer" />
                  <div className="h-3 w-16 bg-slate-200 rounded skeleton-shimmer" />
                </div>
                <div className="h-3 w-48 bg-slate-200 rounded skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Contents Skeleton */}
      <div className="rounded-3xl p-6 bg-white border border-slate-200/80 shadow-subtle space-y-4">
        <div className="h-4 w-36 bg-slate-200 rounded skeleton-shimmer" />
        <div className="flex items-center gap-3.5">
          <div className="w-18 h-18 rounded-xl bg-slate-200 skeleton-shimmer shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-slate-200 rounded skeleton-shimmer" />
            <div className="h-3 w-1/2 bg-slate-200 rounded skeleton-shimmer" />
            <div className="h-4 w-16 bg-slate-200 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};
