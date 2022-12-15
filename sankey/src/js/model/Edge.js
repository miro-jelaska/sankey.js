export default class Edge {
    constructor(from, to, intensity = 0){
        this._from = from;
        this._to = to;
        this._intensity = intensity;
        this._id = Symbol('Edge');
    }

    get from(){ return this._from; }
    get to(){ return this._to; }
    get intensity(){ return this._intensity; }
    get id(){ return this._id; }
}
