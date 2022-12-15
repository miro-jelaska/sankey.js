import fromProductionModelToColumnPartitionsForVisualization from './fromProductionModelToColumnPartitionsForVisualization.js';
import transposeMatrix from '../util/transposeMatrix.js';
import mapEntityPartitionsToShapePartitions from './mapEntityPartitionsToShapePartitions.js';
import getNormalizedPartitions from './getNormalizedPartitions.js';
import applyLayout from '../visualisation/applyLayout.js';
import renderLinks from './renderLinks.js';
import renderGradients from './renderGradients.js';
import renderShapes from '../visualisation/renderShapes.js';

export default function renderModel(model, canvas, options){
    if(!model.IsValid())
        throw new Error('Model not valid.');

    const columnPartitions = fromProductionModelToColumnPartitionsForVisualization(model);
    const transposedColumnPartitions = transposeMatrix(columnPartitions);
    let columnPartitionsWithShapes = mapEntityPartitionsToShapePartitions(transposedColumnPartitions, options);
    columnPartitionsWithShapes = getNormalizedPartitions(columnPartitionsWithShapes, model);
    applyLayout(options, columnPartitionsWithShapes);

    renderLinks(model, columnPartitionsWithShapes, canvas, options);
    if(!options.link.color)
        renderGradients(canvas, options);
    renderShapes(columnPartitionsWithShapes, canvas);
}
