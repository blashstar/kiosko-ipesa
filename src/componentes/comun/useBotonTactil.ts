import { ref, onBeforeUnmount } from 'vue';

export interface UsoBotonTactilOptions {
  escala?: number;
  duracionMs?: number;
  onAccion?: () => void;
}

export function usarBotonTactil(options: UsoBotonTactilOptions = {}) {
  const presionado = ref(false);
  const escala = options.escala ?? 0.95;
  const duracionMs = options.duracionMs ?? 150;

  function alPresionar() {
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
    escala,
    duracionMs,
    alPresionar,
    alSoltar,
    alAbandonar,
  };
}
