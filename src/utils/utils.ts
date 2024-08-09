export const toggleCellState = (
  aliveCells: Record<string, true>,
  x: number,
  y: number,
): Record<string, true> => {
    const cellKey = `${x}:${y}`;
    const updatedActiveCells = { ...aliveCells };
    if (updatedActiveCells[cellKey]) {
      delete updatedActiveCells[cellKey];
    } else {
      updatedActiveCells[cellKey] = true;
    }
    return updatedActiveCells;
};

export const toggleCellState2 = (
  aliveCells: Record<string, true>,
  x: number,
  y: number
): Record<string, true> => {
  const cellKey = `${x}:${y}`;
  const updatedActiveCells = { ...aliveCells };
  if (updatedActiveCells[cellKey]) {
    delete updatedActiveCells[cellKey];
  } else {
    updatedActiveCells[cellKey] = true;
  }
  return updatedActiveCells;
};

export const initialActiveCells = () => {
  const initialActiveCells: Record<string, true> = {
    "2:11": true,
    "3:11": true,
    "5:11": true,
    "6:11": true,
    "8:11": true,
    "9:11": true,
    "10:11": true,
    "11:11": true,
    "13:11": true,
    "14:11": true,
    "17:11": true,
    "19:11": true,
    "20:11": true,
    "21:11": true,
    "22:11": true,
    "24:11": true,
    "28:11": true,
    "2:12": true,
    "4:12": true,
    "6:12": true,
    "8:12": true,
    "11:12": true,
    "13:12": true,
    "15:12": true,
    "17:12": true,
    "19:12": true,
    "22:12": true,
    "24:12": true,
    "28:12": true,
    "2:13": true,
    "6:13": true,
    "8:13": true,
    "9:13": true,
    "10:13": true,
    "11:13": true,
    "13:13": true,
    "16:13": true,
    "17:13": true,
    "19:13": true,
    "20:13": true,
    "21:13": true,
    "22:13": true,
    "25:13": true,
    "27:13": true,
    "2:14": true,
    "6:14": true,
    "8:14": true,
    "11:14": true,
    "13:14": true,
    "17:14": true,
    "19:14": true,
    "22:14": true,
    "26:14": true,
  };  
  return initialActiveCells;
};
