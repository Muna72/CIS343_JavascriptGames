
module.exports = class grid {
    /**
     * Construct the object with required state
     */
    constructor(height, width, state) {
        this.height = height;
        this.width = width;
        this.grid = [];
        for (let i = 0; i < this.height; ++i) {
            let tmp = [];
            for (let j = 0; j < this.width; ++j) {
                tmp.push(0);
            }
            this.grid.push(tmp);
        }

        for (var r = 0; r < state.length; ++r) {
            for(var e = 0; e < state.length; ++e) {
                this.grid[r][e] = state[r][e];
            }
        }
    }

    print_grid(){

        for (let i = 0; i < this.height; ++i) {
            for (let j = 0; j < this.width; ++j) {
                process.stdout.write(this.grid[i][j] + "\t")
            }
            console.log();
        }
}

/*
 * mutate takes a grid and mutates that grid
 * according to Conway's rules.  A new grid
 * is returned.
 */
  mutate(x, y){

    //var mutatedArray = this.grid.slice(); //Create mutated as a new grid instead?
      var mutatedArray = [];

      for (var i = 0; i < this.width; i++) {
          mutatedArray[i] = [];
      }

    for (var i = 0; i < x; ++i) {
        for(var q = 0; q < y; ++q) {
            var current = this.grid[i][q];
            var numOfAliveNeighbors = this.get_neighbors(i, q, x, y);
            if(current == 1) {
                if (numOfAliveNeighbors < 2) {
                    mutatedArray[i][q] = 0;
                }
                if (numOfAliveNeighbors == 2 || numOfAliveNeighbors == 3) {
                    mutatedArray[i][q] = 1;
                }
                if (numOfAliveNeighbors > 3) {
                    mutatedArray[i][q] = 0;
                }
            } else {
                if (numOfAliveNeighbors == 3) {
                    mutatedArray[i][q] = 1;
                } else {
                    mutatedArray[i][q] = 0;
                }
            }
        }
    }
    for(var t = 0; t < mutatedArray.length; ++t) {
        for(var g = 0; g < mutatedArray.length; ++g) {
            this.grid[t][g] = mutatedArray[t][g];
        }
    }
}

/* get_neighbors is a helper method that returns
 * the number of live neighbors a cell has.
 */
 get_neighbors(row, col, maxRow, maxCol){

    var numAlive = 0;

    for(var i = -1; i < 2; ++i) {
        if (row + i >= 0 && row + i < maxRow) {
            if (this.grid[row + i][col] == 1 && i != 0) {
                numAlive++;
            }
        }
        if (col + i >= 0 && col + i < maxCol) {
            if (this.grid[row][col + i] == 1 && i != 0) {
                numAlive++;
            }
        }
        if(row + i >= 0 && col + i >= 0 && row + i < maxRow && col + i < maxCol) {
            if (this.grid[row + i][col + i] == 1 && i != 0) {
                numAlive++;
            }
        }
        if(row - i >= 0 && col + i >= 0 && row - i < maxRow && col + i < maxCol) {
            if (this.grid[row - i][col + i] == 1 & i != 0) {
                numAlive++;
            }
        }
    }
    return numAlive;
}
}
