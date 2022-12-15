import ShapeBase from './ShapeBase.js'
import EfficiencyLevel from './../../model/EfficiencyLevel.js';

const ImaginaryShapeUniqueId = Symbol('ImaginaryVertex');
export default class ImaginaryShape extends ShapeBase {
    static get Id(){
        return ImaginaryShapeUniqueId;
    }

    constructor(imaginaryWidth, imaginaryHeight){
        super(ImaginaryShape.Id, imaginaryWidth,imaginaryHeight);
    }

    Render(){
        // It is imaginary, used for layouting and is not renderable.
    }
}
