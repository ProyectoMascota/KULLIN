'use client';
// =====================================================================
// app/lib/hooks/useSpecies.ts
//
// Hook que devuelve la configuración de una especie con razas desde DB.
// - Fetcha /api/razas?especie={key}
// - Cachea en memoria por la duración de la sesión
// - Fallback a SPECIES[especie].razas si la red falla
// =====================================================================

import { useEffect, useState } from 'react';
import { SPECIES, type Especie, type SpeciesConfig } from '../species-config';

export interface Raza {
  id: number;
  especie: Especie;
  nombre: string;
  tamano_tipico: 'pequeno' | 'mediano' | 'grande' | null;
  peso_min_kg: number | null;
  peso_max_kg: number | null;
}

// Cache en memoria por sesión
const cacheRazas: Record<string, Raza[]> = {};

interface UseSpeciesResult {
  config: SpeciesConfig | null;
  razas: string[];          // nombres de razas para selectores simples
  razasFull: Raza[];        // objetos completos por si se necesita peso típico
  cargandoRazas: boolean;
  errorRazas: string | null;
}

/**
 * Devuelve la configuración de una especie + razas desde DB.
 * Si la especie es null o undefined, devuelve config nula (útil mientras
 * el usuario aún no selecciona en el onboarding).
 */
export function useSpecies(especie?: Especie | null): UseSpeciesResult {
  const [razasFull, setRazasFull] = useState<Raza[]>(() =>
    especie && cacheRazas[especie] ? cacheRazas[especie] : []
  );
  const [cargandoRazas, setCargandoRazas] = useState<boolean>(false);
  const [errorRazas, setErrorRazas] = useState<string | null>(null);

  useEffect(() => {
    if (!especie) {
      setRazasFull([]);
      return;
    }

    // Cache hit → devolver inmediato
    if (cacheRazas[especie]) {
      setRazasFull(cacheRazas[especie]);
      return;
    }

    let abortado = false;
    setCargandoRazas(true);
    setErrorRazas(null);

    fetch(`/api/razas?especie=${especie}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { razas: Raza[] }) => {
        if (abortado) return;
        cacheRazas[especie] = data.razas;
        setRazasFull(data.razas);
      })
      .catch((err) => {
        if (abortado) return;
        // Fallback: usar lista hardcodeada de species-config
        setErrorRazas(err?.message ?? 'Error cargando razas');
      })
      .finally(() => {
        if (!abortado) setCargandoRazas(false);
      });

    return () => {
      abortado = true;
    };
  }, [especie]);

  const config = especie ? SPECIES[especie] : null;

  // Si la DB devolvió razas, usar esas. Si no, fallback a config.
  const razas =
    razasFull.length > 0
      ? razasFull.map((r) => r.nombre)
      : (config?.razas ?? []);

  return { config, razas, razasFull, cargandoRazas, errorRazas };
}
