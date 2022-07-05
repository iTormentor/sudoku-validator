import styles from './Board.module.css';
import {range} from "lodash";
import {extractBoxesFromRows, SudokuData} from "../../service/verifier";
import {HTMLAttributes} from "react";

type Props = {
    sudokuData: SudokuData;
} & HTMLAttributes<HTMLDivElement>

export function Board(props: Props) {
    const {
        sudoku,
        sudoku_valid
    } = props.sudokuData;

    const boxes = extractBoxesFromRows(sudoku);

    return (
        <div
            {...props}
            className={`${styles.container} ${sudoku_valid ? styles.valid : styles.invalid}`}
        >
            <div className={`${styles.grid} ${styles.boxContainer}`}>
                {
                    range(9).map((x: number) =>
                        <div key={x} className={`${styles.grid} ${styles.box}`}>
                            {
                                range(9).map((y: number) =>
                                    <div key={y} className={styles.element}>
                                        {boxes[x][y] || undefined}
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}
