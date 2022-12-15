export default function mapEntityPartitionsToShapePartitions(transposedColumnPartitions, options){
    const columnPartitionsWithShapes =
        transposedColumnPartitions.map(
            column => column.map(
                element =>
                    !!element
                    ? options.entityToShapeMap[element.constructor.name](element)
                    : null
            )
        );
    columnPartitionsWithShapes.RowCount = columnPartitionsWithShapes.length;
    columnPartitionsWithShapes.ColumnCount = columnPartitionsWithShapes[0].length;

    return columnPartitionsWithShapes;
}
