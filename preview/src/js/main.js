import BufferShape from './shapes/Buffer.js';
import DrainShape from './shapes/Drain.js';
import SourceShape from './shapes/Source.js';
import StationShape from './shapes/Station.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';

const options = {
    layout: {
        alignToOtherElementsInTheSameColumn: ['left', 'center'][1],
        verticalDistributionToCanvas: ['top', 'center'][1],
    },
    window: {
        margin: {
            top: 50,
            left: 50,
        }
    },
    shape: {
        margin: {
            top: 80,
            right: 85,
        }
    },
    link: {
        //color: 'blue',
        maxWidth: 46,
        opacity: 0.65,
    },
    entityToShapeMap: {
        'Buffer':  entity => new BufferShape(entity.id, entity.label, entity.efficiencyLevel),
        'Drain':   entity => new DrainShape(entity.id),
        'Source':  entity => new SourceShape(entity.id),
        'Station': entity => new StationShape(entity.id, entity.label, entity.efficiencyLevel, entity.efficiencyRelativeAmountLabel),
    },
    colorCodeForLevel: {
        [sankey.EfficiencyLevel.Low]:    '#F60A20',
        [sankey.EfficiencyLevel.Medium]: '#FF7F00',
        [sankey.EfficiencyLevel.High]:   '#8fb239',
        [undefined]:                     'gray',
        [null]:                          'gray'
    }
};

const svgSymbolFilenames =
    ['station-low',
     'station-medium',
     'station-high',
     'station-not-available',
     'buffer-low',
     'buffer-medium',
     'buffer-high',
     'buffer-not-available'];

function init(){
    const canvas =
        d3.select('body')
        .append('svg')
        .attr('id', 'canvas')
        .attr('width', 2000)
        .attr('height', 600);

    const model = generateDummyProductionLine();

    (function loadExternalImages(){
        const imagesPath = './src/images/';
        sankey.loadSvgImage(imagesPath, ...svgSymbolFilenames);
    })();

    sankey.renderModel(model, canvas, options);
}
window.onload = init;