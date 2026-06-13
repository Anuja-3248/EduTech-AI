import { AppShell, SkeletonPanel } from "@/components/ui";

export default function Loading() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <div className="skeleton h-4 w-36 rounded-full" />
          <div className="skeleton h-12 w-full max-w-xl rounded-lg" />
          <div className="skeleton h-5 w-full max-w-2xl rounded-full" />
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <SkeletonPanel />
          <SkeletonPanel />
          <SkeletonPanel />
        </div>
      </main>
    </AppShell>
  );
}




