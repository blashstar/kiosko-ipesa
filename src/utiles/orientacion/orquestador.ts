/**
 * Orquestador de alto nivel que coordina extractores, lógica y aplicadores.
 */

import type { ResizeObserverEntry } from 'vue';
import { extraerDimensiones, leerDimensionesIdeales, encontrarAplicacion } from './extractores';
import { calcularEstado } from './logica';
import { sincronizarVariablesCSS, sincronizarModificadores, sincronizarScrollAplicacion } from './aplicadores';

interface EntradaObservador extends ResizeObserverEntry {
  target: HTMLElement;
}

export function actualizarEstado(entrada: EntradaObservador): void {
  const kiosko = entrada.target;
  const aplicacion = encontrarAplicacion(kiosko);
  if (!aplicacion) return;

  const { ancho, alto } = leerDimensionesIdeales(kiosko);
  const dimensiones = extraerDimensiones(entrada, kiosko);
  if (!dimensiones.ancho || !dimensiones.alto) return;

  const estado = calcularEstado(dimensiones);

  sincronizarVariablesCSS(kiosko, estado.ratioIdeal, estado.ratioContenedor);
  sincronizarModificadores(aplicacion, estado.modificador);
  sincronizarScrollAplicacion(aplicacion, estado.scrollActivo);
}

function forzarEvaluacionInicial(elemento: HTMLElement): void {
  const rect = elemento.getBoundingClientRect();
  actualizarEstado({
    target: elemento,
    contentRect: { width: rect.width, height: rect.height },
    contentBoxSize: [{ inlineSize: rect.width, blockSize: rect.height }],
  } as EntradaObservador);
}

export function initKioskoOrientacion(selector: string = '.kiosko'): ResizeObserver | null {
  const elementos = document.querySelectorAll<HTMLElement>(selector);
  if (!elementos.length) return null;

  const observador = new ResizeObserver((entradas: ResizeObserverEntry[]) => {
    for (const entrada of entradas) {
      actualizarEstado(entrada as EntradaObservador);
    }
  });

  for (const elemento of elementos) {
    observador.observe(elemento);
    forzarEvaluacionInicial(elemento);
  }

  return observador;
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initKioskoOrientacion());
} else {
  initKioskoOrientacion();
}
