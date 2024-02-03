export type BoundaryReference<T> = Partial<T> &
{
  getBoundingClientRect: () => {
    x: number,
    y: number,
    width: number,
    height: number,
  }
}