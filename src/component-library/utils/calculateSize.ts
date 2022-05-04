import { NumberOrFunction } from "../types";

export const calculateTotalSize = (itemSize: NumberOrFunction, itemAmount: number) => {
  return typeof itemSize === "number"
    ? itemAmount * itemSize
    : new Array(itemAmount)
        .fill(null)
        .reduce<number>((acc, _, index) => acc + itemSize(index), 0);
}
