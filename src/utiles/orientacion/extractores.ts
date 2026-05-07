/**
 * Extractores de datos del DOM y ObservadorRedimension.
 */

export interface Dimensiones {
  ancho: number;
  alto: number;
}

export function extraerDimensiones(entrada: ResizeObserverEntry, elemento: HTMLElement): Dimensiones {
  if (entrada.contentBoxSize && entrada.contentBoxSize.length > 0) {
    const caja = entrada.contentBoxSize[0];
    return { ancho: caja.inlineSize, alto: caja.blockSize };
  }

  if (entrada.contentRect) {
    return { ancho: entrada.contentRect.width, alto: entrada.contentRect.height };
  }

  const rect = elemento.getBoundingClientRect();
  return { ancho: rect.width, alto: rect.height };
}

export function leerDimensiones(elemento: HTMLElement): Dimensiones {
  const styles = getComputedStyle(elemento);
  return {
    ancho: parseInt(styles.getPropertyValue('--kiosko-ancho')) || 1080,
    alto: parseInt(styles.getPropertyValue('--kiosko-alto')) || 1920,
  };
}

export function encontrarAplicacion(kiosko: HTMLElement) {
  return kiosko.querySelector('.kiosko__aplicacion');
}
