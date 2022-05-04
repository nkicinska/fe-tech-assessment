import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import styled from 'styled-components';
import { checkNumberProp, checkNumberOrFunctionProp, checkFunctionProp, calculateTotalSize, flattenGrid } from "./utils";
import { VirtualizerProps, Dimensions } from "./types";

const Container = styled.div<Dimensions>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  overflow: auto;
`;

const Wrapper = styled.div<Dimensions>`
  position: relative;
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  overflow: hidden;
`;

export const Virtualizer = React.memo<VirtualizerProps>((props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const numRows = checkNumberProp(props.numRows, 0);
  const numColumns = checkNumberProp(props.numColumns, 0);
  const rowHeight = checkNumberOrFunctionProp(props.rowHeight, 0);
  const columnWidth = checkNumberOrFunctionProp(props.columnWidth, 0);
  const containerHeight = checkNumberProp(props.containerHeight, 0);
  const containerWidth = checkNumberProp(props.containerWidth, 0);
  const children = checkFunctionProp(props.children, () => null);

  const [firstVisibleRow, setFirstVisibleRow] = useState(0);
  const [lastVisibleRow, setLastVisibleRow] = useState(0);
  const [firstVisibleColumn, setFirstVisibleColumn] = useState(0);
  const [lastVisibleColumn, setLastVisibleColumn] = useState(0);

  const totalHeight = useMemo(() => calculateTotalSize(rowHeight, numRows), [numRows, rowHeight]);
  const totalWidth = useMemo(() => calculateTotalSize(columnWidth, numColumns), [numColumns, columnWidth]);

  const updatePosition = useCallback((scrollTop, scrollLeft) => {
    if (typeof rowHeight !== 'number' || typeof columnWidth !== 'number') {
      return;
    }

    setFirstVisibleRow(Math.floor(scrollTop / rowHeight));
    setLastVisibleRow(Math.floor((scrollTop + containerHeight) / rowHeight));
    setFirstVisibleColumn(Math.floor(scrollLeft / columnWidth));
    setLastVisibleColumn(
      Math.floor((scrollLeft + containerWidth) / columnWidth)
    );
  }, [rowHeight, columnWidth, containerHeight, containerWidth])

  const getStyles = useCallback((rowIndex: number, columnIndex: number): React.CSSProperties => {
    return {
      position: 'absolute',
      top: calculateTotalSize(rowHeight, rowIndex),
      left: calculateTotalSize(columnWidth, columnIndex),
      height: typeof rowHeight === "number" ? rowHeight : rowHeight(rowIndex),
      width: typeof columnWidth === "number" ? columnWidth : columnWidth(columnIndex)
    }
  }, [rowHeight, columnWidth])

  useEffect(() => {
    updatePosition(containerRef.current?.scrollTop ?? 0, containerRef.current?.scrollLeft ?? 0);
  }, [containerHeight, containerWidth, numRows, numColumns, rowHeight, columnWidth, updatePosition])

  const handleScroll: React.UIEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { scrollTop, scrollLeft } = currentTarget;

    updatePosition(scrollTop, scrollLeft);
  }

  const cells = flattenGrid(lastVisibleRow + 1 - firstVisibleRow, lastVisibleColumn + 1 - firstVisibleColumn);

  return (
    <Container ref={containerRef} width={containerWidth} height={containerHeight} onScroll={handleScroll}>
      <Wrapper width={totalWidth} height={totalHeight}>
        {cells.map(({ y, x }) => {
          const rowIndex = firstVisibleRow + y;
          const columnIndex = firstVisibleColumn + x;
          const style = getStyles(rowIndex, columnIndex);

          return children({ columnIndex, rowIndex, style });
        })}
      </Wrapper>
    </Container>
  );
});
