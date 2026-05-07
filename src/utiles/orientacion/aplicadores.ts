/**
 * Aplicadores de efectos secundarios al DOM.
 */

import type { Modificador } from './logica';

export function sincronizarVariablesCSS(
  elemento: HTMLElement,
  ratioIdeal: number,
  ratioContenedor: number
): void {
  elemento.style.setProperty('--kiosko-relacion-aspecto', ratioIdeal.toFixed(6));
  elemento.style.setProperty('--kiosko-relacion-aspecto-contenedor', ratioContenedor.toFixed(6));
}

export function sincronizarModificadores(
  aplicacion: HTMLElement,
  modificador: Modificador
): void {
  aplicacion.classList.toggle('kiosko__aplicacion--vBarras', modificador === 'vBarras');
  aplicacion.classList.toggle('kiosko__aplicacion--hBarras', modificador === 'hBarras');
}

export function sincronizarScrollAplicacion(
  aplicacion: HTMLElement,
  requiereScroll: boolean
): void {
  aplicacion.classList.toggle('kiosko__aplicacion--scroll', requiereScroll);
}
