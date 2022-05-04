export interface VirtualizerProps {
  numRows: number;
  numColumns: number;
  rowHeight: NumberOrFunction;
  columnWidth: NumberOrFunction;
  containerHeight: number;
  containerWidth: number;
  children: (info: CellProps) => JSX.Element | null;
}

export type NumberOrFunction = number | ((index: number) => number);

export interface CellProps {
  rowIndex: number;
  columnIndex: number;
  style: React.CSSProperties;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Position {
  x: number;
  y: number;
}
