const bufferSvgIdCode = {};
bufferSvgIdCode[sankey.EfficiencyLevel.Low] = '#buffer-low';
bufferSvgIdCode[sankey.EfficiencyLevel.Medium] = '#buffer-medium';
bufferSvgIdCode[sankey.EfficiencyLevel.High] = '#buffer-high';
bufferSvgIdCode[undefined] = '#buffer-not-available';
bufferSvgIdCode[null] = '#buffer-not-available';

export default class Buffer extends sankey.ShapeBase {
    constructor(id, label, efficiencyLevel){
        super(id, 54, 55.49);
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
    }

    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }

    Render(){
        const group =
            d3
            .select('#canvas')
            .append("g");

        group
            .append('use')
            .attr('href', bufferSvgIdCode[this.efficiencyLevel])
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('x', this.x)
            .attr('y', this.y);

        const label =
            group
            .append('text')
            .text(this.label || 'N/A')
            .attr('text-anchor', 'middle')
            .attr('x', this.x + this.width / 2)
            .attr('y', this.y + 49)
            .attr('font-family', 'sans-serif')
            .attr('font-size', '10px')
            .attr('fill', 'white');
    }
}
