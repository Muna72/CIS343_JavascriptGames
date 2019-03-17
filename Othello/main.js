/**
 * Othello
 * Javascript project for CIS 343.
 * Command-line version of Othello.
 */

// Import our board definitions
const board = require('./board.js');
// Import a synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * saveFile
 * SYNCHRONOUS (blocking) file save function.
 * @param file - The full filename path we want to save to.
 * @param contents - The object we wish to save as a JSON file.
 */
function saveFile(file, contents){
    let fs = require('fs');
    fs.writeFileSync(file, JSON.stringify(contents));
}

/**
 * loadFile
 * SYNCHRONOUS (blocking) file read function.
 * @param file - The full filename path we wish to load an object from.
 * @return contents - The object converted from JSON.
 */
function loadFile(file){

    //var $ = require('jQuery');

    //var data = $.getJSON(file);

    var fs = require("fs");
// Get content from file
    var data = fs.readFileSync(file);
// Define to JSON type
    var stateObj = JSON.parse(data);
    return stateObj;
}

/**
 * Driver function.  "main" method, if you will.
 */
function start(){
    // Local variables
    var myBoard;
    var startType = prompt("Load previous board state from file? (Y/N)");

    if(startType.toUpperCase() == "N") {
        var height = prompt('What height for your board? ');
        var width = prompt('What width for your board? ');

        while (height % 2 != 0 || width % 2 != 0 || height != width) {
            console.log("Board height and width must be the same number (even number)");
            height = prompt('Please re-enter height for your board: ');
            width = prompt('Please re-enter width for your board: ');
        }

        // SYNCHRONOUSLY read from keyboard
        console.log('Creating a board with size ' + height + ' x ' + width + '.');
        // Create new board object
        myBoard = new board(height, width, 0);
    }
    if(startType.toUpperCase() == "Y") {
        var file = prompt("Please enter filename to load data from: ");

        var fileData = loadFile(file);
        var h = fileData.height;
        var w = fileData.width;
        var state = fileData.board;
        myBoard = new board(h, w, state);
    }

    // Print board
    myBoard.prvarBoard();
    var startingPlayer = prompt("Enter which player goes first (B/W): ");
    var first = new Boolean(true);
    var currPlayer;

    // Loop, asking user input, calling appropriate functions.
    while (!myBoard.isGameOver()) {

        myBoard.prvarBoard();

        if(first) {
            currPlayer = startingPlayer;
        }

        if (!myBoard.isValidMoveAvailable(currPlayer)) {
            console.log("No valid moves available for player " + currPlayer + ". You lose your turn.");
        } else {
            do {
                var loc = prompt("Player " + currPlayer + ":" + " Enter location to place your disc (row col): ");
                var locArray = loc.split(' ');
                var row = locArray[0];
                var col = locArray[1];

                if (row < 1 || row > height || col < 1 || col > width) {
                    console.log("Sorry, invalid input. Try again.\n");
                    continue;
                }
                row--;	// adjust it for zero-indexed array of board
                col--;  // adjust it for zero-indexed array of board
                if (!myBoard.isValid(row,col,currPlayer)) {
                    console.log("Sorry, that is not a valid move. Try again.\n");
                    continue;
                }
                break;
            } while (true);
            myBoard.placeDiskAt(row,col,currPlayer);
        }
        if(currPlayer == "B") {
            currPlayer = "W";
        }
        else {
            currPlayer = "B";
        }
        first = false;
    }

    var winner = myBoard.checkWinner();
    if (winner == 'B' || winner == 'W') {
        if(winner == 'B') {
            console.log("Game is over. Black player Wins!");
        }
        if(winner == 'W') {
            console.log("Game is over. White player wins!");
        }
    } else {
        console.log("Game is over. No winner.");
    }

    // Save board example code.
    saveFile("test.json", myBoard);
}

console.clear();
start();