import EfficiencyLevel from './../model/EfficiencyLevel.js';

export default function applyLayout(options, layoutedShapes){
    layoutedShapes.RowCount =  layoutedShapes.length;
    if(!layoutedShapes.RowCount)
        throw new Error(`layoutedShapes > Expected more than 0 rows but found 0 rows.`);
    layoutedShapes.ColumnCount =  layoutedShapes[0].length;
    if(!layoutedShapes.ColumnCount)
        throw new Error(`layoutedShapes > Expected more than 0 columns but found 0 columns.`);
    for(let row = 0; row < layoutedShapes.RowCount; row++){
        if(layoutedShapes[row].length != layoutedShapes.ColumnCount)
            throw new Error(`layoutedShapes > Expected rectangular 2D array with ${layoutedShapes.RowCount} rows an ${layoutedShapes.ColumnCount} columns. Found row with ${layoutedShapes[row].length} instead.`);
    }

    applyRelativeAlignmentToOtherElementsInSameColumn(options, layoutedShapes);
    applyVerticalDistribution(options, layoutedShapes)
}


function getMaxWidthForColumn(layoutedShapes, columnIndex){
    if(!layoutedShapes[0][columnIndex]){
        return 0;
    }
    const column = layoutedShapes.map(row => row[columnIndex]);
    return Math.max(...column.map(element => element ? element.width : 0));
}

function getMaxHeightForRow(layoutedShapes, rowIndex){
    if(!layoutedShapes[rowIndex])
        return 0;
    return Math.max(...layoutedShapes[rowIndex].map(element => element ? element.height : 0));
}


function applyRelativeAlignmentToOtherElementsInSameColumn(options, layoutedShapes){
    if(options.layout.alignToOtherElementsInTheSameColumn === 'center')
        alignToOtherElementsInTheSameColumn_center(options, layoutedShapes);
    else if(options.layout.alignToOtherElementsInTheSameColumn === 'left')
        alignToOtherElementsInTheSameColumn_left(options, layoutedShapes);
    else
        throw new Error(`Incorrect =lue for options.alignToOtherElementsInTheSameColumn of ${options.layout.alignToOtherElementsInTheSameColumn}`);
}

function alignToOtherElementsInTheSameColumn_center(options, layoutedShapes){
    const alignVertically = true;
    for(let rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++){
        let xPosition = options.window.margin.left;
        for(let columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++){
            if(layoutedShapes[rowIndex][columnIndex] === null){
                xPosition = xPosition + getMaxWidthForColumn(layoutedShapes, columnIndex) + options.shape.margin.right;
                continue;
            }
            const elementWidth = layoutedShapes[rowIndex][columnIndex].width;

            layoutedShapes[rowIndex] = layoutedShapes[rowIndex] || [];
            xPosition = xPosition + (getMaxWidthForColumn(layoutedShapes, columnIndex) - elementWidth)/2;
            layoutedShapes[rowIndex][columnIndex].Translate(xPosition, 0);
            xPosition = xPosition + (getMaxWidthForColumn(layoutedShapes, columnIndex) - elementWidth)/2 + elementWidth;
            xPosition = xPosition + options.shape.margin.right;
        }
    }
}

function alignToOtherElementsInTheSameColumn_left(options, layoutedShapes){
    const alignVertically = true;
    for(let rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++){
        let xPosition = options.window.margin.left;
        for(let columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++){
            if(layoutedShapes[rowIndex][columnIndex] === null){
                xPosition = xPosition + getMaxWidthForColumn(layoutedShapes, columnIndex) + options.shape.margin.right;
                continue;
            }
            const elementWidth = layoutedShapes[rowIndex][columnIndex].width;

            layoutedShapes[rowIndex] = layoutedShapes[rowIndex] || [];
            layoutedShapes[rowIndex][columnIndex].Translate(xPosition, 0);
            xPosition = xPosition + getMaxWidthForColumn(layoutedShapes,columnIndex) + options.shape.margin.right;
        }
    }
}


function applyVerticalDistribution(options, layoutedShapes){
    if(options.layout.verticalDistributionToCanvas === 'top')
        verticalDistributionToCanvas_top(options, layoutedShapes);
    else if(options.layout.verticalDistributionToCanvas === 'center')
        verticalDistributionToCanvas_center(options, layoutedShapes);
    else
        throw new Error(`Incorrect value for options.alignToOtherElementsInTheSameColumn of ${options.layout.alignToOtherElementsInTheSameColumn}`);
}

function verticalDistributionToCanvas_top(options, layoutedShapes){
    let yPosition = options.window.margin.top;
    for(let rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++){
        for(let columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++){
        if(!layoutedShapes[rowIndex][columnIndex]){
                continue;
            }
            layoutedShapes[rowIndex][columnIndex].Translate(0, yPosition);
        }
        yPosition = yPosition + getMaxHeightForRow(layoutedShapes, rowIndex) + options.shape.margin.top;
    }
}


function verticalDistributionToCanvas_center(options, layoutedShapes){
    function applyEvenVerticalDistribution(){
        for(let columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++){
            let yPosition =  options.window.margin.top;
            for(let rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++){
                if(layoutedShapes[rowIndex][columnIndex] === null){
                    continue;
                }

                layoutedShapes[rowIndex][columnIndex].Translate(0, yPosition);
                yPosition = yPosition + layoutedShapes[rowIndex][columnIndex].height + options.shape.margin.top;
            }
        }
    };

    function* columnBoudingBoxesGenerator(){
        for(let columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++){
            const columnElementBoundingBox = {
                x1: layoutedShapes[0][columnIndex].GetBoundingBox().x1,
                y1: layoutedShapes[0][columnIndex].GetBoundingBox().y1,
                x2: 0,
                y2: 0
            };

            for(let rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++){
                if(!layoutedShapes[rowIndex][columnIndex]){
                    continue;
                }
                const currentBounding = layoutedShapes[rowIndex][columnIndex].GetBoundingBox();
                columnElementBoundingBox.x2 = currentBounding.x2;
                columnElementBoundingBox.y2 = currentBounding.y2;
            }
            yield columnElementBoundingBox;
        }
    };

    applyEvenVerticalDistribution();
    const columnBoudingBoxes = [...columnBoudingBoxesGenerator()];
    const maxColumnBoundingBoxHeight = Math.max(...columnBoudingBoxes.map(columnBox => columnBox.y2 - columnBox.y1));
    for(let columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++){
        const deltaY = (maxColumnBoundingBoxHeight - (columnBoudingBoxes[columnIndex].y2 - columnBoudingBoxes[columnIndex].y1))/2;
        for(let rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++){
            if(!layoutedShapes[rowIndex][columnIndex]){
                continue;
            }
            layoutedShapes[rowIndex][columnIndex].Translate(0, deltaY);
        }
    }
}
