// composables/useContenidoSlot.ts
import { useSlots, computed, type ComputedRef } from 'vue';

/**
 * Verifica si un slot tiene contenido real (ignora comentarios y texto vacío)
 */
function tieneContenidoReal(fnSlot: (() => any[]) | undefined): boolean {
  if (!fnSlot) return false;
  const nodos = fnSlot();
  return nodos.some(nodo => {
    if (nodo.type === Comment) return false;
    if (nodo.type === Text && nodo.children?.trim() === '') return false;
    return true;
  });
}

export function useContenidoSlot(nombreSlot: string): ComputedRef<boolean>;
export function useContenidoSlot(nombresSlots: string[]): Record<string, ComputedRef<boolean>>;
export function useContenidoSlot(nombresSlots: string | string[]) {
  const slots = useSlots();

  const crearComputado = (nombre: string) =>
    computed(() => tieneContenidoReal(slots[nombre]));

  if (typeof nombresSlots === 'string') {
    return crearComputado(nombresSlots);
  }

  const resultado: Record<string, ComputedRef<boolean>> = {};
  for (const nombre of nombresSlots) {
    resultado[nombre] = crearComputado(nombre);
  }
  return resultado;
}
