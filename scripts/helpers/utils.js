const makeEmpty2DArray = (cols, rows) => {
  return Array.from(Array(cols), () => new Array(rows));
};

// Populate the each cell with a random number (0-1)
const generateRandom2DArray = (cols, rows) => {
  const array = makeEmpty2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      array[i][j] = floor(random(2));
    }
  }

  return array;
};

const drawGrid = (grid, cols, rows) => {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === 1) {
        const x = i * CELL_SIZE;
        const y = j * CELL_SIZE;

        fill(255);
        rect(x, y, CELL_SIZE, CELL_SIZE);
      }
    }
  }
};

// Compute the next generation based on previous grid
const computeNextGeneration = (grid, cols, rows) => {
  const nextGeneration = makeEmpty2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const neighbours = countNeighbours(grid, i, j, cols, rows);
      const currentState = grid[i][j];

      // Game of life rules
      if (currentState === 0 && neighbours === 3) {
        nextGeneration[i][j] = 1;
      } else if (currentState === 1 && (neighbours < 2 || neighbours > 3)) {
        nextGeneration[i][j] = 0;
      } else {
        nextGeneration[i][j] = currentState;
      }
    }
  }

  return nextGeneration;
};

/**
 * We use a wraparound, e.g. the right neighbour of the
 * rightmost cell is the first cell.
 */
function countNeighbours(grid, x, y, cols, rows) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }

  // Subtract current element
  sum -= grid[x][y];
  return sum;
}
