import React, { useEffect, useState } from "react";
import "./styles/GridComponents.scss";
import getNextAliveCells from "./getNextAliveCells"; // Import the algo function
import { isEqual } from "lodash-es";
import { initialActiveCells, toggleCellState } from "../utils/utils";

const GridComponent = () => {
  const gridSize = 30;

  const InitialAliveCells = initialActiveCells();
  const [aliveCells, setAliveCells] =
    useState<Record<string, true>>(InitialAliveCells);
  const [start, setStart] = useState<boolean>(false);

  //For start method and getting the next cell
  useEffect(() => {
    if (start) {
      var timeout = setTimeout(() => {
        let updatedActiveCells = getNextAliveCells(aliveCells);

        if (isEqual(updatedActiveCells, aliveCells)) {
          setStart(!start);
          return;
        }
        setAliveCells(updatedActiveCells);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [aliveCells, start]);

  // For onClick Event on the grid divs 
  const toggleCell = (x: number, y: number) => {
    const updatedActiveCells = toggleCellState(aliveCells, x, y, gridSize);
    setAliveCells(updatedActiveCells);
  };

  //  For generating the Grid.....
  const generateCells = () => {
    const cells = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const cellKey: string = `${i}:${j}`;
        cells.push(
          <div
            key={cellKey}
            id={cellKey}
            className={`grid-item ${aliveCells[cellKey] ? "alive" : "died"}`}
            onClick={() => toggleCell(i, j)}
          ></div>
        );
      }
    }
    return cells;
  };

  const cells = generateCells();
  const handleReset = () => {
    setAliveCells(InitialAliveCells);
    setStart(false);
  };
  const handleClear = () => {
    setAliveCells({});
    setStart(false);
  };
  const handleStartStop = () => {
    setStart(!start);
  };

  return (
    <div className="main-container">
      <div className="description">
        <h1>Conway's <br/><span className="highlight">Game Of Life</span></h1>
      </div>
      <div className="grid-container">{cells}</div>
      <div className="action-container">
        <button className="start" onClick={handleStartStop}>
          {!start ? "Start" : "Stop"}
        </button>
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
        <button className="clear" onClick={handleClear}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default GridComponent;
