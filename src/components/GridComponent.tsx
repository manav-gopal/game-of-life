import React, { useEffect, useState } from "react";
import "./styles/GridComponents.scss";
import getNextAliveCells from "./getNextAliveCells"; // Import the algo function
import { isEqual } from "lodash-es";
import { initialActiveCells, toggleCellState } from "../utils/utils";
import InfinitePannableGrid from "./InfinitePannableGrid";

const GridComponent = () => {
  const gridSize = 20;

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
    const updatedActiveCells = toggleCellState(aliveCells, x, y);
    setAliveCells(updatedActiveCells);
  };

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
        <h1>
          Conway's <br />
          <span className="highlight">Game Of Life</span>
        </h1>
      </div>
      <div className="grid-wrapper">
        <InfinitePannableGrid
          gridSize={gridSize}
          aliveCells={aliveCells}
          onCellToggle={toggleCell}
          containerWidth={600}
          containerHeight={600}
        />
      </div>
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
