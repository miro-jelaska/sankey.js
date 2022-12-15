export default function transposeMatrix(original){
    if(!original || !original.length)
        return [];

    const originalRowCount = original.length;
    const originalColumnCount = Math.max(...original.map(row => row.length));

    const transposed = [];
    for(let rowIndex = 0; rowIndex < originalRowCount; rowIndex++){
        for(let columnIndex = 0; columnIndex < originalColumnCount; columnIndex++){
            transposed[columnIndex] = transposed[columnIndex] || [];
            transposed[columnIndex][rowIndex] = original[rowIndex][columnIndex] || null;
        }
    }
    return transposed;
}
