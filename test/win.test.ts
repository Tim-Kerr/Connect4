import { win } from '../src/win';
import { Color } from '../src/enums/Color';

/**
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * R  R  R  R  O  O  O
 */
test('4 in a row horizontally. Red wins.', () => {
    const board: Color[][] = [
        [Color.RED],
        [Color.RED],
        [Color.RED],
        [Color.RED],
        [],
        [],
        []
    ];

    // Test 4 in a row horizonal match with each possible last move to complete the win.
    for (let i = 0; i < 4; i++) {
        expect(win(board, Color.RED, i)).toBe(true);
    }
});

/**
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * R  O  O  O  O  O  O
 * R  O  O  O  O  O  O
 * R  O  O  O  O  O  O
 * R  O  O  O  O  O  O
 */
test('4 in a row vertically. Red wins.', () => {
    const board: Color[][] = [
        [Color.RED, Color.RED, Color.RED, Color.RED],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    expect(win(board, Color.RED, 0)).toBe(true);
});

/**
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  R  O  O  O
 * O  O  R  B  O  O  O
 * O  R  B  B  O  O  O
 * R  B  B  R  O  O  O
 */
test('4 in a row diagonally up and to the right. Red wins.', () => {
    const board: Color[][] = [
        [Color.RED],
        [Color.BLACK, Color.RED],
        [Color.BLACK, Color.BLACK, Color.RED],
        [Color.RED, Color.BLACK, Color.BLACK, Color.RED],
        [],
        [],
        []
    ];

    // Test 4 in a row diagonal up and to the right with each possible last move to complete the win.
    for (let i = 0; i < 4; i++) {
        expect(win(board, Color.RED, i)).toBe(true);
    }
});

/**
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * R  O  O  O  O  O  O
 * B  R  O  O  O  O  O
 * R  B  R  O  O  O  O
 * B  B  B  R  O  O  O
 */
test('4 in a row diagonally up and to the left. Red wins.', () => {
    const board: Color[][] = [
        [Color.BLACK, Color.RED, Color.BLACK, Color.RED],
        [Color.BLACK, Color.BLACK, Color.RED],
        [Color.BLACK, Color.RED],
        [Color.RED],
        [],
        [],
        []
    ];

    // Test 4 in a row diagonal up and to the left with each possible last move to complete the win.
    for (let i = 0; i < 4; i++) {
        expect(win(board, Color.RED, i)).toBe(true);
    }
});

/**
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  R  O  O  O
 */
test('1 in a row. No win', () => {
    const board: Color[][] = [
        [],
        [],
        [],
        [Color.RED],
        [],
        [],
        []
    ];

    expect(win(board, Color.RED, 3)).toBe(false);
});

/**
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  R  R  O  O
 */
test('2 in a row. No win', () => {
    const board: Color[][] = [
        [],
        [],
        [],
        [Color.RED],
        [Color.RED],
        [],
        []
    ];

    expect(win(board, Color.RED, 3)).toBe(false);
});

/**
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  R  R  R  O
 */
test('3 in a row. No win', () => {
    const board: Color[][] = [
        [],
        [],
        [],
        [Color.RED],
        [Color.RED],
        [Color.RED],
        []
    ];

    expect(win(board, Color.RED, 3)).toBe(false);
});


/**
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * O  O  O  O  O  O  O
 * R  B  0  R  O  R  O
 */
test('Gaps in between matching colors within match range. No win', () => {
    const board: Color[][] = [
        [Color.RED],
        [Color.BLACK],
        [],
        [Color.RED],
        [],
        [Color.RED],
        []
    ];

    expect(win(board, Color.RED, 2)).toBe(false);
});

/**
 * O  O  O  O  O  O  O
 * O  R  O  O  O  O  O
 * O  R  B  O  O  O  O
 * O  B  R  O  O  O  O
 * O  B  R  B  R  O  O
 * R  B  B  R  B  R  O
 */
test('Opposing pieces in between matching colors within match range. No win', () => {
    const board: Color[][] = [
        [Color.RED],
        [Color.BLACK, Color.BLACK, Color.BLACK, Color.RED, Color.RED],
        [Color.BLACK, Color.RED, Color.RED, Color.BLACK],
        [Color.RED, Color.BLACK],
        [Color.BLACK, Color.RED],
        [Color.RED],
        []
    ];

    expect(win(board, Color.RED, 3)).toBe(false);
});