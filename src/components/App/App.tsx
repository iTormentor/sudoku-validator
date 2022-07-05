import React, {ReactNode, useEffect, useState} from 'react';
import styles from './App.module.css';
import {Board} from "../Board/Board";
import {FileChooser} from "../FileChooser/FileChooser";
import {parseFileTo2dArray} from "../../service/file_parser";
import {normalizeSudoku, SudokuData} from "../../service/verifier";
import {Button} from "../Button/Button";

function App() {
    const [selectedFile, setSelectedFile] = useState<String>("");
    const [sudokuData, setSudokuData] = useState<SudokuData>(getSudokuInitialData());

    function handleValidate() {
        const rowsWorker = new Worker(new URL('../../workers/validateRowsWorker', import.meta.url));
        const columnsWorker = new Worker(new URL('../../workers/validateColumnsWorker', import.meta.url));
        const boxesWorker = new Worker(new URL('../../workers/validateBoxesWorker', import.meta.url));

        rowsWorker.onmessage = (e: MessageEvent) => {
            setSudokuData((state: SudokuData) => ({...state, rows_valid: e.data}));
            rowsWorker.terminate();
        };
        columnsWorker.onmessage = (e: MessageEvent) => {
            setSudokuData((state: SudokuData) => ({...state, columns_valid: e.data}));
            columnsWorker.terminate();
        };
        boxesWorker.onmessage = (e: MessageEvent) => {
            setSudokuData((state: SudokuData) => ({...state, boxes_valid: e.data}));
            boxesWorker.terminate();
        };

        rowsWorker.postMessage(sudokuData.sudoku);
        columnsWorker.postMessage(sudokuData.sudoku);
        boxesWorker.postMessage(sudokuData.sudoku);
    }

    function getSudokuInitialData(): SudokuData {
        return {
            sudoku: normalizeSudoku([]),
            sudoku_valid: undefined,
            rows_valid: undefined,
            columns_valid: undefined,
            boxes_valid: undefined
        };
    }

    function setCurrentFile(input: String) {
        // Guard condition
        if (input === selectedFile) {
            return;
        }
        setSudokuData(getSudokuInitialData());
        setSelectedFile(input);
    }

    useEffect(() => {
        // Parse selected file into a 2d array
        const parsed = parseFileTo2dArray(selectedFile);
        setSudokuData({...sudokuData, sudoku: normalizeSudoku(parsed)});
    }, [selectedFile]);

    function getIndicator(condition?: boolean): ReactNode {
        switch (condition) {
            case true:
                return <div className={`${styles.indicator} ${styles.green}`}>✓</div>;
            case false:
                return <div className={`${styles.indicator} ${styles.red}`}>⨯</div>;
            default:
                return <div className={`${styles.indicator} ${styles.blue}`}>﹖</div>;
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.infoCard}>
                    <h1 className={styles.header}>
                        Sudoku validator
                    </h1>
                    <FileChooser setCurrentFile={setCurrentFile}/>
                    <div className={styles.validationSteps}>
                        <div className={styles.validationStep}>
                            {getIndicator(sudokuData.rows_valid)}
                            <div>Rows</div>
                        </div>
                        <div className={styles.validationStep}>
                            {getIndicator(sudokuData.columns_valid)}
                            <div>Columns</div>
                        </div>
                        <div className={styles.validationStep}>
                            {getIndicator(sudokuData.boxes_valid)}
                            <div>Boxes</div>
                        </div>
                    </div>
                    <Button onClick={handleValidate}>Validate sudoku</Button>
                </div>
                <Board sudokuData={sudokuData}/>
            </div>
        </div>
    );
}

export default App;
