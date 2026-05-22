// =====================================================================
// app/lib/active-pet.ts
//
// Helper para mantener la mascota activa en localStorage.
// Lo usan las rutas /tienda y /historial para saber a qué mascota se refieren.
//
// Solo Client-side. Nunca llamar desde Server Components.
// =====================================================================

const KEY = 'kullin:active-pet-id';

export function setActivePetId(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, id);
  } catch {
    // localStorage puede fallar en navegación privada de algunos browsers
  }
}

export function getActivePetId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function clearActivePetId(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignorar
  }
}
