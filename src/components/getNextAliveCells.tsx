const getNextAliveCells = (aliveCells: Record<string, true>) => {
  let map = new Map<string, number>(); // Tracks the number of alive neighbours for each cell
  let checkedCells = new Map(); // Tracks cells that have already been processed

  function mapSet(x: number, y: number, subX: number, subY: number) {
    const currentCellKey = `${x}:${y}`;
    const neighbourCellKey = `${x + subX}:${y + subY}`;

    //Check if its out of boundry
    // if (x < 0 || y < 0 || x > 29 || y > 29) {
    //   return;
    // }

    if (!checkedCells.has(neighbourCellKey)) {
      const currCellCount = map.get(currentCellKey) || 0;
      const neighbourCellCount = map.get(neighbourCellKey) || 0;

      // if the neighbour is alive
      if (aliveCells[neighbourCellKey]) {
        // updating main element.....
        map.set(currentCellKey, currCellCount + 1);
      }

      // else just update the neighbours ....
      map.set(neighbourCellKey, neighbourCellCount + 1);
    }
  }

  // Iterate over each alive cell
  Object.keys(aliveCells).forEach((key) => {
    let [x, y] = key.split(":").map(Number); // Split the key to get x and y coordinates

    // Check all 8 neighbours of the current cell (starting from top-left, going clockwise)
    mapSet(x, y, -1, -1); // Top-left neighbour
    mapSet(x, y, -1, 0); // Top neighbour
    mapSet(x, y, -1, 1); // Top-right neighbour
    mapSet(x, y, 0, -1); // Left neighbour
    mapSet(x, y, 0, 1); // Right neighbour
    mapSet(x, y, 1, -1); // Bottom-left neighbour
    mapSet(x, y, 1, 0); // Bottom neighbour
    mapSet(x, y, 1, 1); // Bottom-right neighbour

    checkedCells.set(`${x}:${y}`, true); // Mark the current cell as checked
  });

  // Here we Apply the rules of game of life
  const currentAlive: Record<string, true> = {};
  const entries = Array.from(map.entries());
  for (const [key, value] of entries) {
    // If a cell has exactly 3 neighbours, it becomes alive
    if (value === 3) {
      currentAlive[key] = true;
    }
    // If a cell has exactly 2 neighbours and was previously alive, it remains alive
    else if (value === 2 && checkedCells.has(key)) {
      currentAlive[key] = true;
    }
    // Other cells will die anyways so we dont need any condition for them
  }
  // console.log(currentAlive);

  return currentAlive;
};

export default getNextAliveCells;
