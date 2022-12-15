
const stationSvgIdCode = {
    [sankey.EfficiencyLevel.Low]:    '#station-low',
    [sankey.EfficiencyLevel.Medium]: '#station-medium',
    [sankey.EfficiencyLevel.High]:   '#station-high',
    [undefined]:              '#station-not-available',
    [null]:                   '#station-not-available',
};

export default class Station extends sankey.ShapeBase {
    constructor(id, label, efficiencyLevel, efficiencyRelativeAmountLabel){
        super(id, 75, 68.05);
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
        this._efficiencyRelativeAmountLabel = efficiencyRelativeAmountLabel;
    }

    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }
    get efficiencyRelativeAmountLabel() { return this._efficiencyRelativeAmountLabel; }

    Render(){
        const group =
            d3
            .select('#canvas')
            .append("g");

        group
            .append('use')
            .attr('href', stationSvgIdCode[this.efficiencyLevel])
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('x', this.x)
            .attr('y', this.y);

        const label =
            group
            .append('text')
            .attr('x', this.x + 5)
            .attr('y', this.y + 49)
            .text(this.label || 'N/A')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '10px')
            .attr('fill', 'white');

        const efficiencyRelativeAmountLabel =
            group
            .append('text')
            .attr('x', this.x + 5)
            .attr('y', this.y + 62)
            .text(this.efficiencyRelativeAmountLabel || 'N/A')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11px')
            .attr('fill', 'white');
    }
}
