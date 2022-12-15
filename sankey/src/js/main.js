import EfficiencyLevel from './model/EfficiencyLevel.js';
import EntityBase from './model/EntityBase.js';
import loadSvgImage from './util/loadSvgImage.js';
import ModelManager from './model/ModelManager.js';
import renderModel from './visualisation/renderModel.js';
import ShapeBase from './visualisation/shapes/ShapeBase.js';

(function(global) {
    const module = {
        EfficiencyLevel,
        EntityBase,
        loadSvgImage,
        ModelManager,
        renderModel,
        ShapeBase,
    };

    global.sankey = global.sankey || module;
})(typeof window === 'undefined' ? this : window);
