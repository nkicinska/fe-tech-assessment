import { CellProps, NumberOrFunction } from "../types";

export const checkNumberProp = (prop: any, fallback: number): number => (
  typeof prop === 'number' ? prop : fallback
)

export const checkNumberOrFunctionProp = (
  prop: any,
  fallback: number
): NumberOrFunction => (
  typeof prop === "number" || typeof prop === "function" ? prop : fallback
)

export const checkFunctionProp = (
  prop: any,
  fallback: () => null
): ((info: CellProps) => JSX.Element | null) => (
  typeof prop === "function" ? prop : fallback
)
