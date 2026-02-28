'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'skeleton shimmer rounded-xl',
            className
          )}
        />
      ))}
    </>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-surface-primary dark:bg-surface-secondary p-4 space-y-4">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>
    </div>
  );
}

export function TeacherCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-surface-primary dark:bg-surface-secondary p-6 space-y-4">
      <Skeleton className="h-20 w-20 rounded-full mx-auto" />
      <Skeleton className="h-5 w-1/2 mx-auto" />
      <Skeleton className="h-3 w-2/3 mx-auto" />
      <div className="flex gap-2 justify-center">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 dark:border-white/5 bg-surface-primary dark:bg-surface-secondary overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}
