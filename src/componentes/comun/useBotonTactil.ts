import { ref, onBeforeUnmount } from 'vue';

export interface UsoBotonTactilOptions {
  onAccion?: () => void;
}

export function usarBotonTactil(options: UsoBotonTactilOptions = {}) {
  const presionado = ref(false);

  function alPresionar(evt: MouseEvent | TouchEvent) {
    if (evt instanceof MouseEvent && evt.button !== 0) return
    presionado.value = true;
  }

  function alSoltar() {
    if (presionado.value) {
      presionado.value = false;
      options.onAccion?.();
    }
  }

  function alAbandonar() {
    presionado.value = false;
  }

  onBeforeUnmount(() => {
    presionado.value = false;
  });

  return {
    presionado,
    alPresionar,
    alSoltar,
    alAbandonar,
  };
}
