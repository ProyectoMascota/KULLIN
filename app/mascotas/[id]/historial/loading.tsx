import { AppHeader } from '@/components/AppHeader';

export default function Loading() {
  return (
    <>
      <AppHeader />
      <main className="container-app pt-2">
        <div className="h-9 w-56 rounded-lg shimmer mb-2" />
        <div className="h-4 w-40 rounded shimmer mb-6" />

        <div className="card text-center">
          <div className="h-3 w-44 rounded shimmer mx-auto mb-3" />
          <div className="h-10 w-32 rounded-lg shimmer mx-auto" />
        </div>

        <div className="h-5 w-24 rounded shimmer mt-8 mb-3" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-bg-card border rounded-2xl p-4 space-y-2">
              <div className="h-3 w-20 rounded shimmer" />
              <div className="h-4 w-44 rounded shimmer" />
              <div className="h-3 w-32 rounded shimmer" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
