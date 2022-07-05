import {useFilePicker} from 'use-file-picker';
import React, {useEffect} from 'react';
import {Button} from "../Button/Button";
import styles from './FileChooser.module.css';

interface Props {
    setCurrentFile: (files: any) => void;
}

export function FileChooser(props: Props) {
    const [openFileSelector, {filesContent, plainFiles}] = useFilePicker({
        accept: '.csv',
        multiple: false,
        readFilesContent: true,
    });

    useEffect(() => {
        if (filesContent.length > 0) {
            props.setCurrentFile(filesContent[0].content);
        }
    }, [plainFiles]);

    return (
        <div className={styles.root}>
            <Button onClick={() => openFileSelector()}>Select sudoku file</Button>
        </div>
    );
}
