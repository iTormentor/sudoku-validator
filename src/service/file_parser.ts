const lineSeparator = '\n';
const separator = ',';

export function parseFileTo2dArray(input: String): Array<Array<number>> {
    const result: Array<Array<number>> = [];
    const rows: Array<String> = extractRows(input);

    rows.forEach((line) => {
        if (line !== "") {
            const numbers: Array<number> = extractNumbers(line);
            result.push(numbers);
        }
    });

    return result;
}

function extractRows(input: String): Array<String> {
    return input.split(lineSeparator);
}

function extractNumbers(input: String): Array<number> {
    return input.split(separator).map(value => Number(value));
}
