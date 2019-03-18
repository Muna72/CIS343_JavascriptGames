/*
 * Game of Life
 *
 * A version of John Conway's classic Game of Life, written in C.
 * CIS 343 - Winter 2019
 *
 * Author:  Muna Gigowski
 */

// Import our board definitions
const grid = require('./grid.js');
// Import a synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * loadFile
 * SYNCHRONOUS (blocking) file read function.
 * @param file - The full filename path we wish to load an object from.
 * @return contents - The object converted from JSON.
 */
function loadFile(file){

    var fs = require("fs");
// Get content from file
    var data = fs.readFileSync(file);
// Define to JSON type
    var stateObj = JSON.parse(data);
    return stateObj;
}

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


   function start(){

       var stateFileName = prompt('Enter full path to file to read grid starting state: ');

       var fileData = loadFile(stateFileName);
       var x = fileData.height;
       var y = fileData.width;
       var state = fileData.board;
       var gameOfLife = new grid(x, y, state);

    console.log("Beginning with grid size: ", x, y);

    gameOfLife.print_grid();

    // Now, we will accept input in a loop until the user
    // asks us to quit.
    while(1){
        var command = prompt("Press q to quit, w to save to disk, n to iterate multiple times, or any other " +
         "key to continue to the next generation.");
        console.log("-------------------------");

        switch(command){
            case 'q':
                // Case 'q' results in exiting the game.  We must free
                // our memory here.
                process.exit();

            case 'w':
                // Case 'w' writes the current board to disk.
                var saveFileName = prompt("Enter a filename: ");
                saveFile(saveFileName, gameOfLife);
                break;

            case 'n':
                // 'n' causes us to ask the user how
                // many evolutions to perform in a row,
                // then executes them in a loop.
                var numOfCycles = prompt("How many iterations? ");

                console.log("Iterating " + numOfCycles + " times.");
                for(var i=0; i<numOfCycles; ++i){
                gameOfLife.mutate(x, y);
                gameOfLife.print_grid();
            }
                break;

            default:
                // Any other key and we evolve one iteration,
                // print, and keep going.
                gameOfLife.mutate(x, y);
                gameOfLife.print_grid();
        }
    }
}

console.clear();
start();
