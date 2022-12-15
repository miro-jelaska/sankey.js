export default function fromProductionModelToColumnPartitionsForVisualization(productionModel){
    const columns = [];

    function scanVertecesByOutgoingFlows(currentVertex, columnIndex){
        const isAlreadyAdded = !!columns.find(column => column.find(vertex => vertex === currentVertex));
        if(isAlreadyAdded)
            return;

        columns[columnIndex] = columns[columnIndex] || [];
        columns[columnIndex].push(currentVertex);
        const outgoingVerteces = productionModel.GetOutgoingVertex(currentVertex.id)
        for(let nextVertex of outgoingVerteces){
            scanVertecesByOutgoingFlows(nextVertex, columnIndex + 1);
        }
    }
    scanVertecesByOutgoingFlows(productionModel.source, 0);

    return columns;
}
