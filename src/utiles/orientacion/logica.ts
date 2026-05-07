/**
 * Lógica de negocio pura (sin efectos secundarios).
 */

export type Modificador = 'vBarras' | 'hBarras' | null;

export interface Dimensiones {
  ancho: number;
  alto: number;
}

export interface EstadoOrientacion {
  ratioIdeal: number;
  ratioContenedor: number;
  scrollActivo: boolean;
  modificador: Modificador;
}

export function calcularRatio(ancho: number, alto: number): number {
  if (!alto) return 0;
  return ancho / alto;
}

export function determinarModificador(
  ratioContenedor: number,
  ratioIdeal: number
): Modificador {
  if (ratioContenedor > ratioIdeal) return 'vBarras';
  if (ratioContenedor < ratioIdeal) return 'hBarras';
  return null;
}

export function necesitaScroll(
  ancho: number,
  alto: number,
  anchoIdeal: number,
  altoIdeal: number
): boolean {
  const minAncho = anchoIdeal * 0.5;
  const minAlto = altoIdeal * 0.5;
  return ancho < minAncho || alto < minAlto;
}

export function calcularEstado(dimensiones: Dimensiones): EstadoOrientacion {
  const { ancho, alto } = dimensiones;
  const anchoIdeal = 1080;
  const altoIdeal = 1920;

  const ratioIdeal = calcularRatio(anchoIdeal, altoIdeal);
  const ratioContenedor = calcularRatio(ancho, alto);
  const scrollActivo = necesitaScroll(ancho, alto, anchoIdeal, altoIdeal);
  const modificador = scrollActivo
    ? null
    : determinarModificador(ratioContenedor, ratioIdeal);

  return { ratioIdeal, ratioContenedor, scrollActivo, modificador };
}
