/**
 * Board
 * Defines a board "class" for an Othello game.
 */

module.exports = class Board {
    /**
     * Construct the object with required state
     */
    constructor(height, width, state) {
        this.height = height;
        this.width = width;
        this.board = [];
        for (let i = 0; i < this.height; ++i) {
            let tmp = [];
            for (let j = 0; j < this.width; ++j) {
                tmp.push(-1);
            }
            this.board.push(tmp);
        }


        if(state === 0) {
            var half = this.height / 2;
            var oneLess = (this.height / 2) - 1;

            this.board[oneLess][oneLess] = 'B';
            this.board[oneLess][half] = 'W';
            this.board[half][oneLess] = 'W';
            this.board[half][half] = 'B';
        } else {

            for (var r = 0; r < state.length; ++r) {
                for(var e = 0; e < state.length; ++e) {
                    this.board[r][e] = state[r][e];
                }
            }

        }

    }

    /**
     * Prvar a representation of the board to the terminal.
     */
    prvarBoard() {

        process.stdout.write('\t');
        for (var i = 0; i < this.width; i++) {
            process.stdout.write(i+1 + '\t');
        }
        console.log();

        for (let i = 0; i < this.height; ++i) {

            process.stdout.write(i+1 + '\t');

            for (let j = 0; j < this.width; ++j) {
                if (this.board[i][j] == -1) {
                    process.stdout.write('.\t')
                } else {
                    process.stdout.write(this.board[i][j] + "\t")
                }
            }
            console.log();
        }
    }

    /**
     * isValidMove
     * @param row An integer row number.
     * @param col An integer column number.
     * @param disc A character for the disc color.
     * @return A boolean indicating whether the move is valid.
     */

    isValid(row, col, disc) {

        var response = false;

        if (this.board[row][col] == -1) {
            for (var i = -1; i < 2; ++i) {
                if (disc == 'W') {
                    if(row + i >= 0 && row + i < this.height) {
                        if (this.board[row + i][col] == 'B' && response == false) {
                            response = this.checkAdjacent(i, 'v', row + i, col, disc);
                        }
                    }
                    if(col + i >= 0 && col + i < this.width) {
                        if (this.board[row][col + i] == 'B' && response == false) {
                            response = this.checkAdjacent(i, 'h', row, col + i, disc);
                        }
                    }
                    if(row + i >= 0 && row + i < this.height &&
                        col + i >= 0 && col + i < this.width) {
                        if (this.board[row + i][col + i] == 'B' && response == false) {
                            response = this.checkAdjacent(i, 'l', row + i, col + i, disc);
                        }
                    }
                    if(row - i >= 0 && row - i < this.height &&
                        col + i >= 0 && col + i < this.width) {
                        if (this.board[row - i][col + i] == 'B' && response == false) {
                            response = this.checkAdjacent(i, 'r', row - i, col + i, disc);
                        }
                    }
                } else {
                    if(row + i >= 0 && row + i < this.height) {
                        if (this.board[row + i][col] == 'W' && response == false) {
                            response = this.checkAdjacent(i, 'v', row + i, col, disc);
                        }
                    }
                    if(col + i >= 0 && col + i < this.width) {
                        if (this.board[row][col + i] == 'W' && response == false) {
                            response = this.checkAdjacent(i, 'h', row, col + i, disc);
                        }
                    }
                    if(row + i >= 0 && row + i < this.height &&
                        col + i >= 0 && col + i < this.width) {
                        if (this.board[row + i][col + i] == 'W' && response == false) {
                            response = this.checkAdjacent(i, 'l', row + i, col + i, disc);
                        }
                    }
                    if(row - i >= 0 && row - i < this.height &&
                        col + i >= 0 && col + i < this.width) {
                        if (this.board[row - i][col + i] == 'W' && response == false) {
                            response = this.checkAdjacent(i, 'r', row - i, col + i, disc);
                        }
                    }
                }
            }
        }
        return response;

    }

    /**
     * placeDiscAt
     * @param row An vareger number for row.
     * @param col An vareger number for column.
     * @param disc A varacter standing for disc color.
     */
    placeDiskAt(row, col, disc) {

        this.board[row][col] = disc;
        this.checkFlipDirection(row, col, disc);
    }

    //Checks which directions(s) discs need to be flipped in
    checkFlipDirection(row, col, disc) {

        var response;

        for (var i = -1; i < 2; ++i) {
            if (disc == 'W') {
                if(row + i >= 0 && row + i < this.height) {
                    if (this.board[row + i][col] == 'B') {
                        response = this.checkAdjacent(i, 'v', row + i, col, disc);
                        if (response == true) {
                            this.flipDiscs(i, 'v', row, col, disc);
                        }
                    }
                }
                if(col + i >= 0 && col + i < this.width) {
                    if (this.board[row][col + i] == 'B') {
                        response = this.checkAdjacent(i, 'h', row, col + i, disc);
                        if (response == true) {
                            this.flipDiscs(i, 'h', row, col, disc);
                        }
                    }
                }
                if(row + i >= 0 && row + i < this.height &&
                    col + i >= 0 && col + i < this.width) {
                    if (this.board[row + i][col + i] == 'B') {
                        response = this.checkAdjacent(i, 'l', row + i, col + i, disc);
                        if (response == true) {
                            this.flipDiscs(i, 'l', row, col, disc);
                        }
                    }
                }
                if(row - i >= 0 && row - i < this.height &&
                    col + i >= 0 && col + i < this.width) {
                    if (this.board[row - i][col + i] == 'B') {
                        response = this.checkAdjacent(i, 'r', row - i, col + i, disc);
                        if (response == true) {
                            this.flipDiscs(i, 'r', row, col, disc);
                        }
                    }
                }
            } else {
                if(row + i >= 0 && row + i < this.height) {
                    if (this.board[row + i][col] == 'W') {
                        response = this.checkAdjacent(i, 'v', row + i, col, disc);
                        if (response == true) {
                            this.flipDiscs(i, 'v', row, col, disc);
                        }
                    }
                }
                if(col + i >= 0 && col + i < this.width) {
                    if (this.board[row][col + i] == 'W') {
                        response = this.checkAdjacent(i, 'h', row, col + i, disc);
                        if (response == true) {
                            this.flipDiscs(i, 'h', row, col, disc);
                        }
                    }
                }
                if(row + i >= 0 && row + i < this.height &&
                    col + i >= 0 && col + i < this.width) {
                    if (this.board[row + i][col + i] == 'W') {
                        response = this.checkAdjacent(i, 'l', row + i, col + i, disc);
                        if (response == true) {
                            this.flipDiscs(i, 'l', row, col, disc);
                        }
                    }
                }
                if(row - i >= 0 && row - i < this.height &&
                    col + i >= 0 && col + i < this.width) {
                    if (this.board[row - i][col + i] == 'W') {
                        response = this.checkAdjacent(i, 'r', row - i, col + i, disc);
                        if (response == true) {
                            this.flipDiscs(i, 'r', row, col, disc);
                        }
                    }
                }
            }
        }

    }

    //Flips all discs in the appropriate direction(s)
    flipDiscs(i, direction, row, col, disc) {

        if (disc == 'W') {
            if (direction == 'v') {
                if (row + i < 8 && row + i >= 0) {
                    if (this.board[row + i][col] == 'B') {
                        this.board[row + i][col] = 'W';
                        this.flipDiscs(i, 'v', row + i, col, disc);
                    }
                }
            }
            if (direction == 'h') {
                if (col + i < 8 && col + i >= 0) {
                    if (this.board[row][col + i] == 'B') {
                        this.board[row][col + i] = 'W';
                        this.flipDiscs(i, 'h', row, col + i, disc);
                    }
                }
            }
            if (direction == 'l') {
                if (row + i < 8 && row + i >= 0) {
                    if (col + i < 8 && col + i >= 0) {
                        if (this.board[row + i][col + i] == 'B') {
                            this.board[row + i][col + i] = 'W';
                            this.flipDiscs(i, 'l', row + i, col + i, disc);
                        }
                    }
                }
            }
            if (direction == 'r') {
                if (row - i >= 0 && row - i < 8) {
                    if (col + i < 8 && col + i >= 0) {
                        if (this.board[row - i][col + i] == 'B') {
                            this.board[row - i][col + i] = 'W';
                            this.flipDiscs(i, 'r', row - i, col + i, disc);
                        }
                    }
                }
            }
        } else {
            if (direction == 'v') {
                if (row + i < 8 && row + i >= 0) {
                    if (this.board[row + i][col] == 'W') {
                        this.board[row + i][col] = 'B';
                        this.flipDiscs(i, 'v', row + i, col, disc);
                    }
                }
            }
            if (direction == 'h') {
                if (col + i < 8 && col + i >= 0) {
                    if (this.board[row][col + i] == 'W') {
                        this.board[row][col + i] = 'B';
                        this.flipDiscs(i, 'h', row, col + i, disc);
                    }
                }
            }
            if (direction == 'l') {
                if (row + i < 8 && row + i >= 0) {
                    if (col + i < 8 && col + i >= 0) {
                        if (this.board[row + i][col + i] == 'W') {
                            this.board[row + i][col + i] = 'B';
                            this.flipDiscs(i, 'l', row + i, col + i, disc);
                        }
                    }
                }
            }
            if (direction == 'r') {
                if (row - i >= 0 && row - i < 8) {
                    if (col + i < 8 && col + i >= 0) {
                        if (this.board[row - i][col + i] == 'W') {
                            this.board[row - i][col + i] = 'B';
                            this.flipDiscs(i, 'r', row - i, col + i, disc);
                        }
                    }
                }
            }
        }
    }

    /**
     * isValidMoveAvailable
     * @param disc A varacter pertaining to a disc color.
     * @return var A varean telling the user whether there are
     *        valid moves availabe for that disc.
     */
    isValidMoveAvailable(disc) {


        var r = false;

        for (var i = 0; i < this.height; ++i) {
            for (var y = 0; y < this.width; y++) {
                if (disc == 'W') {
                    if (this.isValid(i, y, 'W')) {
                        r = true;
                    }
                }
                if (disc == 'B') {
                    if (this.isValid(i, y, 'B')) {
                        r = true;
                    }
                }
            }
        }
        return r;

    }

    //function to check down a 'train' of discs in a certain direction
    checkAdjacent(i, direction, row, col, disc) {

        var current = this.board[row][col];
        var r = row;
        var c = col;

        if (disc == 'W') {
            if (direction == 'v') {
                while (r + i < this.height && r + i >= 0) {
                    if (current == 'B') {
                        r = r + i;
                    }
                    if (current == 'W') {
                        return true;
                    }
                    if (current == -1) {
                        break;
                    }
                    current = this.board[r][c];
                }
                if (current == 'W') {
                    return true;
                }
            }
            if (direction == 'h') {
                while (c + i < this.width && c + i >= 0) {
                    if (current == 'B') {
                        c = c + i;
                    }
                    if (current == 'W') {
                        return true;
                    }
                    if (current == -1) {
                        break;
                    }
                    current = this.board[r][c];
                }
                if (current == 'W') {
                    return true;
                }
            }
            if (direction == 'l') {
                while (r + i < this.height && r + i >= 0 && c + i >= 0 && c + i < this.width) {
                    if (current == 'B') {
                        r = r + i;
                        c = c + i;
                    }
                    if (current == 'W') {
                        return true;
                    }
                    if (current == -1) {
                        break;
                    }
                    current = this.board[r][c];
                }
                if (current == 'W') {
                    return true;
                }
            }
            if (direction == 'r') {
                while (r - i >= 0 && r - i < this.height && c + i >= 0 && c + i < this.width) {
                    if (current == 'B') {
                        r = r - i;
                        c = c + i;
                    }
                    if (current == 'W') {
                        return true;
                    }
                    if (current == -1) {
                        break;
                    }
                    current = this.board[r][c];
                }
                if (current == 'W') {
                    return true;
                }
            }
        } else {
            if (direction == 'v') {
                while (r + i < this.height && r + i >= 0) {
                    if (current == 'W') {
                        r = r + i;
                    }
                    if (current == 'B') {
                        return true;
                    }
                    if (current == -1) {
                        break;
                    }
                    current = this.board[r][c];
                }
                if (current == 'B') {
                    return true;
                }
            }
            if (direction == 'h') {
                while (c + i < this.width && c + i >= 0) {
                    if (current == 'W') {
                        c = c + i;
                    }
                    if (current == 'B') {
                        return true;
                    }
                    if (current == -1) {
                        break;
                    }
                    current = this.board[r][c];
                }
                if (current == 'B') {
                    return true;
                }
            }
            if (direction == 'l') {
                while (r + i < this.height && r + i >= 0 && c + i >= 0 && c + i < this.width) {
                    if (current == 'W') {
                        r = r + i;
                        c = c + i;
                    }
                    if (current == 'B') {
                        return true;
                    }
                    if (current == -1) {
                        break;
                    }
                    current = this.board[r][c];
                }
                if (current == 'B') {
                    return true;
                }
            }
            if (direction == 'r') {
                while (r - i >= 0 && r - i < this.height && c + i >= 0 && c + i < this.width) {
                    if (current == 'W') {
                        r = r - i;
                        c = c + i;
                    }
                    if (current == 'B') {
                        return true;
                    }
                    if (current == -1) {
                        break;
                    }
                    current = this.board[r][c];
                }
                if (current == 'B') {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * isBoardFull
     * @return varean Whether or not the board is full.
     */
    isBoardFull() {

        for (var i = 0; i < this.height; ++i) {
            for (var y = 0; y < this.width; ++y) {
                if (this.board[i][y] != 'W' && this.board[i][y] != 'B') {
                    return false;
                }
            }
        }
        return true;

    }

    /**
     * isGameOver
     * @return var Whether or not the game is over.
     */
    isGameOver() {

        if (this.isBoardFull()) {
            return true;
        }
        if (!this.isValidMoveAvailable('W') && !this.isValidMoveAvailable('B')) {
            return true;
        }
        return false;
    }

    /**
     * checkWinner
     * @return var Which player has won.  Return null if
     *        a tie exists.
     */
    checkWinner() {

        var whitePieces = 0;
        var blackPieces = 0;
        var ret;

        if (this.isGameOver()) {
            for (var i = 0; i < this.height; ++i) {
                for (var y = 0; y < this.width; ++y) {
                    if (this.board[i][y] == 'W') {
                        whitePieces++;
                    }
                    if (this.board[i][y] == 'B') {
                        blackPieces++;
                    }
                }
            }
            if (whitePieces > blackPieces) {
                ret = 'W';
            } else if (blackPieces > whitePieces) {
                ret = 'B';
            } else {
                ret = ".";
            }
        }
        return ret;
    }
}