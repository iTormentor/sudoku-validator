import {isEqual, range} from "lodash";

const VALID_COLLECTION = new Set(range(1, 10));

export interface SudokuData {
    sudoku: Array<Array<number>>;
    sudoku_valid?: boolean;
    rows_valid?: boolean;
    columns_valid?: boolean;
    boxes_valid?: boolean;
}

function validateCollection(numbers: Array<number>): boolean {
    return isEqual(new Set(numbers), VALID_COLLECTION);
}

export function validateColumns(numbers: Array<Array<number>>): boolean {
    return range(9).map(y => validateCollection(numbers.map(row => row[y]))).every(Boolean);
}

export function validateBoxes(numbers: Array<Array<number>>): boolean {
    return extractBoxesFromRows(numbers).map(box => validateCollection(box)).every(Boolean);
}
export function validateRows(numbers: Array<Array<number>>): boolean {
    return numbers.map(e => validateCollection(e)).every(Boolean);
}

export function extractBoxesFromRows(numbers: Array<Array<number>>): Array<Array<number>> {
    return range(9).map(box_index => {
        // y position of the box
        const box_y_index = Math.floor(box_index / 3);
        // The y range of rows accessed for current box
        const y_range: [number, number] = [box_y_index * 3, (box_y_index * 3) + 3];
        // The x range of numbers in the rows accessed in current box
        const x_range: [number, number] = [(3 * box_index) - (9 * box_y_index), ((3 * box_index) - (9 * box_y_index)) + 3];
        // Temporary array to store the current box
        const box: Array<number> = [];
        range(...y_range).forEach(y => {
            range(...x_range).forEach(x => {
                box.push(numbers[y][x]);
            });
        });
        return box;
    });
}

export function normalizeSudoku(sudoku: Array<Array<number>>): Array<Array<number>> {
    const normalized: Array<Array<number>> = [];
    range(9).forEach(row => {
        const cur_row: Array<number> = [];
        range(9).forEach(e => {
            cur_row.push(sudoku[row]?.[e] || 0);
        });
        normalized.push(cur_row);
    });
    return normalized;
}
