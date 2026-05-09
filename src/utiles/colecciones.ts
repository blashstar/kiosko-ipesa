import _ from 'lodash';

/**
 * Rota los elementos de una colección hacia la izquierda.
 * Los primeros `n` elementos pasan al final de la colección.
 *
 * @template T - Tipo de los elementos de la colección.
 * @param coleccion - Colección a rotar.
 * @param n - Número de posiciones a rotar (por defecto 1). Puede ser negativo.
 * @returns Nueva colección con los elementos rotados.
 */
export function rotarIzquierda<T>(coleccion: readonly T[], n: number = 1): T[] {
  if (_.isEmpty(coleccion)) return [];

  const desplazamiento = ((n % coleccion.length) + coleccion.length) % coleccion.length;
  const inicio = _.drop(coleccion, desplazamiento);
  const fin = _.take(coleccion, desplazamiento);

  return _.concat(inicio, fin);
}

/**
 * Rota los elementos de una colección hacia la derecha.
 * Los últimos `n` elementos pasan al inicio de la colección.
 *
 * @template T - Tipo de los elementos de la colección.
 * @param coleccion - Colección a rotar.
 * @param n - Número de posiciones a rotar (por defecto 1). Puede ser negativo.
 * @returns Nueva colección con los elementos rotados.
 */
export function rotarDerecha<T>(coleccion: readonly T[], n: number = 1): T[] {
  if (_.isEmpty(coleccion)) return [];

  const desplazamiento = ((n % coleccion.length) + coleccion.length) % coleccion.length;
  const fin = _.takeRight(coleccion, desplazamiento);
  const inicio = _.dropRight(coleccion, desplazamiento);

  return _.concat(fin, inicio);
}

/**
 * Centra un elemento de una colección por su índice.
 * Rota la colección para que el elemento en el `índice` dado quede en la posición central.
 * Para colecciones de longitud par, se usa el centro derecho (índice `Math.floor(total / 2)`).
 *
 * @template T - Tipo de los elementos de la colección.
 * @param coleccion - Colección de objetos.
 * @param indice - Índice del elemento a centrar.
 * @returns Nueva colección rotada, o una copia de la original si el `índice` no existe.
 */
export function rotarAlCentro<T>(coleccion: readonly T[], indice: number): T[] {
  if (_.isEmpty(coleccion)) return [];

  const total = coleccion.length;
  const indiceCentral = Math.floor(total / 2);
  const rotaciones = (indice - indiceCentral + total) % total;

  return rotaciones === 0 ? [...coleccion] : rotarIzquierda(coleccion, rotaciones);
}
