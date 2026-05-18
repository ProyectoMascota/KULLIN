import { AppHeader } from '@/components/AppHeader';

export default function Loading() {
  return (
    <>
      <AppHeader />
      <main className="container-app pt-2">
        {/* Hero skeleton */}
        <div className="text-center mb-6">
          <div className="mx-auto w-[120px] h-[120px] rounded-full shimmer" />
          <div className="h-9 w-32 mx-auto mt-3.5 rounded-lg shimmer" />
          <div className="h-4 w-48 mx-auto mt-2 rounded shimmer" />
        </div>

        {/* Barra de comida skeleton */}
        <div className="card">
          <div className="flex justify-between items-baseline mb-3.5">
            <div className="h-3 w-32 rounded shimmer" />
            <div className="h-7 w-16 rounded shimmer" />
          </div>
          <div className="h-3.5 rounded-full shimmer" />
          <div className="flex justify-between mt-2">
            <div className="h-3 w-20 rounded shimmer" />
            <div className="h-3 w-20 rounded shimmer" />
          </div>
        </div>

        {/* Ración diaria skeleton */}
        <div className="card">
          <div className="h-3 w-28 rounded shimmer mb-2" />
          <div className="h-14 w-32 rounded-lg shimmer mt-2 mb-2" />
          <div className="h-4 w-48 rounded shimmer" />
        </div>

        {/* Producto recomendado skeleton */}
        <div className="card flex gap-3.5 items-start">
          <div className="w-[72px] h-[72px] rounded-xl shimmer flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded shimmer" />
            <div className="h-5 w-48 rounded shimmer" />
            <div className="h-3 w-32 rounded shimmer" />
          </div>
        </div>

        <p className="text-center text-[12px] text-ink-soft mt-8">
          Cargando perfil…
        </p>
      </main>
    </>
  );
}
