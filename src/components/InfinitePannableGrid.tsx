import React, { useState, useEffect, useRef } from "react";

interface InfinitePannableGridProps {
  gridSize: number;
  containerWidth: number;
  containerHeight: number;
  aliveCells: Record<string, true>;
  onCellToggle: (x: number, y: number) => void;
}

const InfinitePannableGrid: React.FC<InfinitePannableGridProps> = ({
  gridSize,
  aliveCells,
  onCellToggle,
  containerWidth,
  containerHeight,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [translatePos, setTranslatePos] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialClickPos, setInitialClickPos] = useState({ x: 0, y: 0 });
  const [gridWidth, setGridWidth] = useState<number>();
  const [gridHeight, setGridHeight] = useState<number>();

  useEffect(() => {
    if (gridRef.current) {
      setGridHeight(gridRef.current.clientHeight);
      setGridWidth(gridRef.current.clientWidth);
    }
  }, [gridRef]);

  const getVisibleCells = () => {
    const cells = [];
    const width = gridWidth || 0;
    const height = gridHeight || 0;

    const startX = Math.floor(-translatePos.x / gridSize);
    const endX = Math.floor((width - translatePos.x) / gridSize);
    const startY = Math.floor(-translatePos.y / gridSize);
    const endY = Math.floor((height - translatePos.y) / gridSize);

    for (let x = startX; x <= endX; x++) {
          for (let y = startY; y <= endY; y++) {
        const cellKey = `${x}:${y}`;
        cells.push({
          x,
          y,
          alive: aliveCells[cellKey],
        });
      }
    }
    // console.log(cells.length);
    return cells;
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    setIsPanning(true);
    setStartDragOffset({
      x: event.clientX - translatePos.x,
      y: event.clientY - translatePos.y,
    });
    setInitialClickPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning) {
      const dx = event.clientX - startDragOffset.x;
      const dy = event.clientY - startDragOffset.y;
      setTranslatePos({ x: dx, y: dy });
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      setIsMouseDown(false);
      setIsPanning(false);

      const mouseMoved =
        Math.abs(event.clientX - initialClickPos.x) > 5 ||
        Math.abs(event.clientY - initialClickPos.y) > 5;

      if (!mouseMoved) {
        const rect = gridRef.current!.getBoundingClientRect();
        const x = event.clientX - rect.left - translatePos.x;
        const y = event.clientY - rect.top - translatePos.y;

        const cellX = Math.floor(x / gridSize);
        const cellY = Math.floor(y / gridSize);

        onCellToggle(cellX, cellY);
      }
    }
  };

  const handleMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      setIsPanning(false);
    }
  };

  const visibleCells = getVisibleCells();

  return (
    <div
      ref={gridRef}
      className="grid-container"
      style={{
        cursor: isPanning ? "grabbing" : "pointer",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {visibleCells.map(({ x, y, alive }) => (
        <div
          key={`${x}:${y}`}
          className={`grid-item ${alive ? "alive" : "died"} ${x}:${y}`}
          style={{
            width: gridSize - 1,
            height: gridSize - 1,
            left: x * gridSize + translatePos.x,
            top: y * gridSize + translatePos.y,
            position: "absolute",
          }}
        />
      ))}
    </div>
  );
};

export default InfinitePannableGrid;
