let grid;

let CANVAS_WIDTH;
let CANVAS_HEIGHT;

let ROWS;
let COLUMNS;

const CELL_SIZE = 10;

function setup() {
  CANVAS_WIDTH = document.body.clientWidth;
  CANVAS_HEIGHT = document.body.clientHeight;
  
  ROWS = floor(CANVAS_HEIGHT / CELL_SIZE);
  COLUMNS = floor(CANVAS_WIDTH / CELL_SIZE);

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  grid = generateRandom2DArray(COLUMNS, ROWS);
}

function draw() {
  background(0);

  // Generate the next generation based on previous grid
  const nextGeneration = computeNextGeneration(grid, COLUMNS, ROWS);

  grid = nextGeneration;
  drawGrid(grid, COLUMNS, ROWS);
}
