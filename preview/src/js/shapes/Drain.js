export default class Drain extends sankey.ShapeBase {
    constructor(id){
        super(id, 16, 50);
    }

    Render(){
        const group =
            d3.select('#canvas')
            .append('g');

        group.append('rect')
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'black');

        const widthOfBorder = 4;
        group.append('rect')
            .attr('x', this.x + widthOfBorder)
            .attr('y', this.y + widthOfBorder)
            .attr('width', this.width - 2 * widthOfBorder)
            .attr('height', this.height - 2 * widthOfBorder)
            .attr('class', 'white');
    }
}
