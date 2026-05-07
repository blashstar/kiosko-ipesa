// src/utilidades/observadorRedimension.ts
/**
 * Hook reutilizable que crea un ObservadorRedimension sobre un elemento HTML.
 *
 * @param elemento          HTMLElement a observar
 * @param alRedimensionar    Callback que recibe la entrada del observador
 * @returns                 Función de limpieza que desconecta el observador
 */

import throttle from 'lodash/throttle';

export function usarObservadorRedimension(
	elemento: HTMLElement,
	alRedimensionar: (entradas: ResizeObserverEntry) => void
): () => void {
	const alRedimensionarThrottled = throttle(alRedimensionar, 300);

	const observador = new ResizeObserver((entradas) => {

		for (const entrada of entradas) {
			alRedimensionarThrottled(entrada);
		}
	});

	observador.observe(elemento);

	// Devuelve la función para desconectar cuando el componente se destruya
	return () => observador.disconnect();
}
