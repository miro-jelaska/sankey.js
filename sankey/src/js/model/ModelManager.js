import EntityBase from './EntityBase.js';
import Edge from './Edge.js';
import EfficiencyLevel from './EfficiencyLevel.js';

export default class ModelManager {
    constructor(){
        this.verteces = [];
        this.edges = [];
        this.source = null;
    }

    AddVertex(entity, isSource){
        const immediateParentPrototypeName = Object.getPrototypeOf(entity.constructor).name;
        if(!immediateParentPrototypeName)
            throw new Error(`Immediate parent prototype of entity should be of type "EntityBase". Instead it has no parent.`);
        if(immediateParentPrototypeName !== 'EntityBase')
            throw new Error(`Immediate parent prototype of entity should be of type "EntityBase". Found "${immediateParentPrototypeName}" instead.`);
        if(this.verteces.includes(entity)) {
            console.warn(`Vertex already added to the model. Vertex:`, entity);
            return this;
        }

        this.verteces.push(entity);
        if(isSource) {
            this.source = entity;
        }
        return this;
    }

    AddEdge(vertexTriplet){
        const newFrom = vertexTriplet[0],
              newTo = vertexTriplet[1],
              newIntensity = vertexTriplet[2] || 0;
        const isElementAlreadyAddedToModel =
             this.edges.findIndex(existingEdge =>
                    existingEdge.from === newFrom
                    && existingEdge.to === newTo
                ) !== -1;
        if(isElementAlreadyAddedToModel){
            console.warn('Identical edge already added to the model.', vertexTriplet);
            return;
        }

        const indexOfOriginNode = this.verteces.indexOf(newFrom);
        const indexOfTargetNode = this.verteces.indexOf(newTo);

        if(indexOfOriginNode === -1)
            throw new Error(`Cannot create edge between two verteces if both of them are not previously added (registered) to the model. Cannot find origin node.`);
        if(indexOfTargetNode === -1)
            throw new Error(`Cannot create edge between two verteces if both of them are not previously added (registered) to the model. Cannot find target node.`);
        if(newIntensity < 0)
            throw new Error(`Intensity should be non-negative number. Found ${newIntensity} instead.`);

        this.edges.push(new Edge(newFrom, newTo, newIntensity));
    }

    AddEdges(vertexTriplets){
        vertexTriplets.forEach(function(newVertexTuple) {
            this.AddEdge(newVertexTuple);
        }, this);
    }

    GetOutgoingEdge(vertexId){
        return this.edges.filter(edge => edge.from.id === vertexId);
    }
    GetOutgoingVertex(vertexId){
        return this.GetOutgoingEdge(vertexId).map(edge => edge.to);
    }
    GetIncomingEdge(vertexId){
        return this.edges.filter(edge => edge.to.id === vertexId);
    }
    GetIncomingVertex(vertexId){
        return this.GetIncomingEdge(vertexId).map(edge => edge.from);
    }

    AddVertecesAndEdges(vertecesAndOutgoingFlowsCollection){
        for(let collectionIndex = 0; collectionIndex < vertecesAndOutgoingFlowsCollection.length; collectionIndex++){
            const currentCollection = vertecesAndOutgoingFlowsCollection[vertexIndex];
            const vertex = currentCollection[0];
            const outgoingFlows = currentCollection[1];
            this.verteces.push(vertex)

            for(let flowIndex = 0; flowIndex < outgoingFlows.length; flowIndex++){
                this.AddEdge([vertex, outgoingFlows[flowIndex]]);
            }
        }
    }

    IsValid(){
        const numberOfSources = this.verteces.filter(vertex => vertex.constructor.name === 'Source').length;
        if(numberOfSources !== 1) {
            console.warn(`Model should have exactly one source vertex. Instead found ${numberOfSources} of them.`);
            return false;
        }
        return true;
    }

    Get(id){
        return this.verteces.find(vertex => vertex.id === id);
    }
}
