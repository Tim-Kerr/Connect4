import { Color } from './enums/Color';

/**
 * Checks for a win condition.
 * 
 * @param board: The current board
 * @param color: The last color played
 * @param column: The column last played
 */
const win = (board: Color[][], color: Color, column: number): boolean => {
    // Check vertical win
    if (check(x => x, y => y + 1, board, color, column) + check(x => x, y => y - 1, board, color, column) >= 3) {
        return true;
    }

    // Check horizontal win
    if (check(x => x + 1, y => y, board, color, column) + check(x => x - 1, y => y, board, color, column) >= 3) {
        return true;
    }

    // Check up and to the right diagonal 
    if (check(x => x + 1, y => y + 1, board, color, column) + check(x => x - 1, y => y - 1, board, color, column) >= 3) {
        return true;
    }

    // Check down and to the left diagonal
    if (check(x => x - 1, y => y + 1, board, color, column) + check(x => x + 1, y => y - 1, board, color, column) >= 3) {
        return true;
    }

    return false;
}

/**
 * Checks the nearest 3 slots to the last play to count the number of adjacent slots with the same color.
 * The x & y coordinates of the slots being checked are updated by the xTraversalFunc & yTraversalFunc.
 * Returns the number of adjacent slots with the same color
 */
const check = (xTraversalFunc: (x: number) => number, yTraversalFunc: (y: number) => number, board: Color[][], color: Color, column: number): number => {
    let count = 0;
    let x = column;
    let y = board[x].length - 1;
    for (let i = 0; i < 3; i++) {
        x = xTraversalFunc(x);
        y = yTraversalFunc(y);

        if (x >= board.length || x < 0) break;
        if (y >= board[x].length || y < 0) break;

        if (board[x][y] === color) count++;
        else break;
    }

    return count;
}

export { win };