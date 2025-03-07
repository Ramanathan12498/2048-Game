// Create a 4x4 grid as a 2D array (filled with 0s initially)
let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

// Wait for the HTML page to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    
    // Select the game board element
    const board = document.getElementById("game-board");

    // Function to create the game board
    function createBoard() {
        board.innerHTML = ""; // Clear the board before redrawing

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                let tile = document.createElement("div");
                tile.classList.add("tile");

                // Check if there's a number in this tile
                if (grid[row][col] !== 0) {
                    tile.textContent = grid[row][col]; // Show the number
                    tile.style.background = "#eee4da"; // Light background for numbers
                    tile.style.fontSize = "32px"; // Make number visible
                    tile.style.fontWeight = "bold";
                } else {
                    tile.textContent = ""; // Keep empty tiles blank
                }

                board.appendChild(tile); // Add the tile to the game board
            }
        }
    }

    // Function to place a random 2 or 4 in an empty tile
    function addRandomTile() {
        let emptyTiles = [];

        // Find all empty tiles in the grid
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (grid[row][col] === 0) {
                    emptyTiles.push({ row, col }); // Store empty tile positions
                }
            }
        }

        // If no empty tiles are left, return
        if (emptyTiles.length === 0) {
            console.log("No empty spaces left.");
            return;
        }

        // Pick a random empty tile
        let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

        // Assign it a 2 (90% chance) or 4 (10% chance)
        let newValue = Math.random() < 0.9 ? 2 : 4;
        grid[randomTile.row][randomTile.col] = newValue;

        console.log(`Added ${newValue} at [${randomTile.row}, ${randomTile.col}]`); // Debug log

        // Redraw the board with the updated numbers
        createBoard();
    }
   // ✅ Step 5: Movement Functions (Move Tiles in 4 Directions)

   function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = grid[row].filter(num => num !== 0); // Remove zeros
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) { // If two numbers are the same
                newRow[i] *= 2; // Merge them
                newRow[i + 1] = 0; // Remove duplicate
            }
        }
        newRow = newRow.filter(num => num !== 0); // Remove new zeros
        while (newRow.length < 4) newRow.push(0); // Fill empty spaces with zeros
        grid[row] = newRow;
    }
    
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        let newRow = grid[row].filter(num => num !== 0);
        for (let i = newRow.length - 1; i > 0; i--) {
            if (newRow[i] === newRow[i - 1]) {
                newRow[i] *= 2;
                newRow[i - 1] = 0;
            }
        }
        newRow = newRow.filter(num => num !== 0);
        while (newRow.length < 4) newRow.unshift(0);
        grid[row] = newRow;
    }
}

function moveUp() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== 0) newCol.push(grid[row][col]);
        }
        for (let i = 0; i < newCol.length - 1; i++) {
            if (newCol[i] === newCol[i + 1]) {
                newCol[i] *= 2;
                newCol[i + 1] = 0;
            }
        }
        newCol = newCol.filter(num => num !== 0);
        while (newCol.length < 4) newCol.push(0);
        for (let row = 0; row < 4; row++) {
            grid[row][col] = newCol[row];
        }
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== 0) newCol.push(grid[row][col]);
        }
        for (let i = newCol.length - 1; i > 0; i--) {
            if (newCol[i] === newCol[i - 1]) {
                newCol[i] *= 2;
                newCol[i - 1] = 0;
            }
        }
        newCol = newCol.filter(num => num !== 0);
        while (newCol.length < 4) newCol.unshift(0);
        for (let row = 0; row < 4; row++) {
            grid[row][col] = newCol[row];
        }
    }
}

function checkWin() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 2048) {
                alert("🎉 You Win! 🎉"); // Show win message
                document.removeEventListener("keydown", handleKeyPress); // Stop the game
                return;
            }
        }
    }
}

function checkGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) return false; // If an empty tile exists, game is not over

            // Check if a merge is possible (same number adjacent)
            if (
                (col < 3 && grid[row][col] === grid[row][col + 1]) || // Right neighbor
                (row < 3 && grid[row][col] === grid[row + 1][col])    // Bottom neighbor
            ) {
                return false; // If a move is possible, game is not over
            }
        }
    }

    alert("❌ Game Over! No moves left! ❌"); // Show game over message
    document.removeEventListener("keydown", handleKeyPress); // Stop the game
    return true;
}

function restartGame() {
    // ✅ Reset the grid (Fill it with zeros)
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // ✅ Enable keyboard movement again
    document.addEventListener("keydown", handleKeyPress);

    // ✅ Add two new tiles to start a fresh game
    addRandomTile();
    addRandomTile();
    
    // ✅ Update the board
    createBoard();
}

// ✅ Step 6: Handle Keyboard Input (Arrow Keys)
function handleKeyPress(event) {
    let moved = false; // Track if any movement happened

    if (event.key === "ArrowUp") {
        moveUp();
        moved = true;
    } else if (event.key === "ArrowDown") {
        moveDown();
        moved = true;
    } else if (event.key === "ArrowLeft") {
        moveLeft();
        moved = true;
    } else if (event.key === "ArrowRight") {
        moveRight();
        moved = true;
    }

    if (moved) {
        addRandomTile(); // Add a new tile only if movement happened
        createBoard();   // Update the board
        checkWin();      // Check if 2048 is reached
        checkGameOver(); // Check if no moves are left
    }
}

// ✅ Step 7: Add Keyboard Event Listener
document.addEventListener("keydown", handleKeyPress);

document.getElementById("restart-button").addEventListener("click", restartGame);

    // Add two tiles to start the game
    addRandomTile();
    addRandomTile();

    // Draw the board
    createBoard();
});
