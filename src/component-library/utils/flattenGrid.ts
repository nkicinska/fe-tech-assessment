import { Position } from "../types"

export const flattenGrid = (rows: number, columns: number) => {
  return new Array(rows).fill(null).reduce<Position[]>((acc, _, y) => {
    const columnsArray = new Array(columns).fill(null).map((__, x) => ({ y, x }))

    return [...acc, ...columnsArray]
  }, [])
}