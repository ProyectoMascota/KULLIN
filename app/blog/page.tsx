import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Kulliñ',
  description: 'Guías y artículos sobre nutrición canina y felina basados en evidencia veterinaria.',
};

const POSTS = [
  {
    slug: 'cuanto-debe-comer-mi-perro',
    titulo: 'Cómo calcular cuánto debe comer tu perro al día',
    bajada: 'La fórmula que usan los veterinarios (NRC 2006) explicada paso a paso, con ejemplo real.',
    fecha: '17 de mayo de 2026',
    categoria: 'Nutrición canina',
    minutos: 5,
  },
  {
    slug: 'cuanto-debe-comer-mi-gato',
    titulo: 'Cuánto debe comer tu gato al día',
    bajada: 'Los gatos esterilizados engordan fácil porque su metabolismo cambia. Aquí la fórmula correcta.',
    fecha: '17 de mayo de 2026',
    categoria: 'Nutrición felina',
    minutos: 4,
  },
  {
    slug: 'cambio-gradual-de-alimento',
    titulo: 'Cómo cambiar el alimento de tu mascota sin que se enferme',
    bajada: 'El método de transición de 7 días que usan los veterinarios, paso a paso.',
    fecha: '17 de mayo de 2026',
    categoria: 'Salud digestiva',
    minutos: 4,
  },
  {
    slug: 'sobrepeso-en-mascotas',
    titulo: 'Cómo saber si tu mascota tiene sobrepeso (y qué hacer)',
    bajada: 'El 60% de perros y gatos tienen sobrepeso. Te explico cómo evaluarlo en casa.',
    fecha: '17 de mayo de 2026',
    categoria: 'Salud y peso',
    minutos: 5,
  },
];

export default function BlogIndexPage() {
  return (
    <>
      <AppHeader
        rightSlot={
          <Link href="/" className="text-sm text-ink-soft underline">
            ← Volver
          </Link>
        }
      />
      <main className="container-app pt-2 max-w-[680px] animate-fade-up">
        <h1 className="font-display text-[36px] text-ink leading-tight mb-2 tracking-tight">
          Notas sobre <em className="text-terracotta italic font-normal">nutrición animal</em>
        </h1>
        <p className="text-ink-soft text-[15px] mb-10">
          Guías cortas basadas en evidencia veterinaria, sin marketing disfrazado.
        </p>

        <div className="space-y-4">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card block hover:border-moss transition-colors mb-0"
            >
              <div className="text-[11px] uppercase tracking-[0.1em] text-terracotta font-semibold mb-2">
                {p.categoria} · {p.minutos} min
              </div>
              <h2 className="font-display text-2xl text-ink leading-tight mb-2">
                {p.titulo}
              </h2>
              <p className="text-[14px] text-ink-soft leading-relaxed mb-2">
                {p.bajada}
              </p>
              <p className="text-[12px] text-ink-soft">{p.fecha}</p>
            </Link>
          ))}
        </div>

        <p className="text-[13px] text-ink-soft text-center mt-12 px-4 leading-relaxed">
          Más guías próximamente: esterilización y nutrición, comida casera vs comercial, snacks
          seguros, alergias alimentarias y otros temas.
        </p>
      </main>
    </>
  );
}
