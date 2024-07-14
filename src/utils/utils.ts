export const toggleCellState = (
  aliveCells: Record<string, true>,
  x: number,
  y: number,
  gridSize: number
): Record<string, true> => {
  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
    const cellKey = `${x}-${y}`;
    const updatedActiveCells = { ...aliveCells };
    if (updatedActiveCells[cellKey]) {
      delete updatedActiveCells[cellKey];
    } else {
      updatedActiveCells[cellKey] = true;
    }
    return updatedActiveCells;
  }
  return aliveCells;
};

export const initialActiveCells = () => {
  const initialActiveCells: Record<string, true> = {
    "11-2": true,
    "11-3": true,
    "11-5": true,
    "11-6": true,
    "11-8": true,
    "11-9": true,
    "11-10": true,
    "11-11": true,
    "11-13": true,
    "11-14": true,
    "11-17": true,
    "11-19": true,
    "11-20": true,
    "11-21": true,
    "11-22": true,
    "11-24": true,
    "11-28": true,
    "12-2": true,
    "12-4": true,
    "12-6": true,
    "12-8": true,
    "12-11": true,
    "12-13": true,
    "12-15": true,
    "12-17": true,
    "12-19": true,
    "12-22": true,
    "12-24": true,
    "12-28": true,
    "13-2": true,
    "13-6": true,
    "13-8": true,
    "13-9": true,
    "13-10": true,
    "13-11": true,
    "13-13": true,
    "13-16": true,
    "13-17": true,
    "13-19": true,
    "13-20": true,
    "13-21": true,
    "13-22": true,
    "13-25": true,
    "13-27": true,
    "14-2": true,
    "14-6": true,
    "14-8": true,
    "14-11": true,
    "14-13": true,
    "14-17": true,
    "14-19": true,
    "14-22": true,
    "14-26": true,
  };
  return initialActiveCells;
};
