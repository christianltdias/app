export function convertArrayToMatrix<T>(
  list: Array<T>,
  count: number
): Array<Array<T>> {
  var matrix = [],
    i = 0,
    aux = 0,
    arr: Array<T>;

  while (true) {
    arr = list.slice(aux, aux + count);

    if (arr.length === 0) {
      break;
    }
    matrix[i] = arr;
    aux += count;
    i++;
  }

  return matrix;
}