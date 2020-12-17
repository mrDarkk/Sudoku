var board = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]

];

const isValidSudoku = (board) => {
    const obj = {
        rows: {}, // 9 rows, each containing 9 cells across
        columns: {}, // 9 columns, each containing 9 cells down
        blocks: {}, // 9 blocks, each containing 3x3 cells inside
    };

    let isValid = true;

    loop1:
        for (let r = 0; r < board.length; r++) {

            loop2: for (let c = 0; c < board[r].length; c++) {

                const cellValue = board[r][c];

                if (cellValue === 0

                ) {
                    continue;
                }

                // 1: validate rows
                if (!obj.rows.hasOwnProperty(r)) {
                    obj.rows[r] = {};
                }

                if (obj.rows[r].hasOwnProperty(cellValue)) {
                    isValid = false;
                    break loop1;
                } else {
                    obj.rows[r][cellValue] = null;
                }

                // 2: validate columns
                if (!obj.columns.hasOwnProperty(c)) {
                    obj.columns[c] = {};
                }

                if (obj.columns[c].hasOwnProperty(cellValue)) {
                    isValid = false;
                    break loop1;
                } else {
                    obj.columns[c][cellValue] = null;
                }

                // 3: validate grid
                const b = getBlockNumber(r, c);

                if (!obj.blocks.hasOwnProperty(b)) {
                    obj.blocks[b] = {};
                }

                if (obj.blocks[b].hasOwnProperty(cellValue)) {
                    isValid = false;
                    break loop1;
                } else {
                    obj.blocks[b][cellValue] = null;
                }
            }
        }

    return isValid;
};

const getBlockNumber = (row, column) => {
    const rowQuotient = parseInt(row / 3, 10);
    const columnQuotient = parseInt(column / 3, 10);

    let blockNumber;

    switch (`${rowQuotient}${columnQuotient}`) {
        case '00':
            blockNumber = 0;
            break;
        case '01':
            blockNumber = 1;
            break;
        case '02':
            blockNumber = 2;
            break;
        case '10':
            blockNumber = 3;
            break;
        case '11':
            blockNumber = 4;
            break;
        case '12':
            blockNumber = 5;
            break;
        case '20':
            blockNumber = 6;
            break;
        case '21':
            blockNumber = 7;
            break;
        case '22':
            blockNumber = 8;
            break;
    };

    return blockNumber;
};


function nextEmptySpot(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0)
                return [i, j];
        }
    }
    return [-1, -1];
}


function checkRow(board, row, value) {
    for (var i = 0; i < board[row].length; i++) {
        if (board[row][i] === value) {
            return false;
        }
    }

    return true;
}


function checkColumn(board, column, value) {
    for (var i = 0; i < board.length; i++) {
        if (board[i][column] === value) {
            return false;
        }
    }

    return true;
};

function checkSquare(board, row, column, value) {
    boxRow = Math.floor(row / 3) * 3;
    boxCol = Math.floor(column / 3) * 3;

    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (board[boxRow + r][boxCol + c] === value)
                return false;
        }
    }

    return true;
};

function checkValue(board, row, column, value) {
    if (checkRow(board, row, value) &&
        checkColumn(board, column, value) &&
        checkSquare(board, row, column, value)) {
        return true;
    }

    return false;
};



function solve(board) {
    let emptySpot = nextEmptySpot(board);
    let row = emptySpot[0];
    let col = emptySpot[1];


    // there is no more empty spots
    if (row === -1) {
        return board;
    }

    for (let num = 1; num <= 9; num++) {

        if (checkValue(board, row, col, num)) {
            board[row][col] = num;
            solve(board);
        }
    }

    if (nextEmptySpot(board)[0] !== -1)
        board[row][col] = 0;

    return board;

}


console.log(isValidSudoku(board));

if (isValidSudoku(board) == true) {
    console.log(solve(board));
} else {
    console.log("invalid sudoku !!!")
}