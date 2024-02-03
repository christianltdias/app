export function getEnumIndex(o: {}, name: string): number {
  return Object.keys(o).indexOf(name);
}

export function getEnumByIndex<T>(o: {}, index: number): T {
  return Object.keys(o)[index] as T;
}