export default class Source extends sankey.ShapeBase {
    constructor(id){
        super(id, 16, 50);
    }

    Render(){
        const group =
            d3.select("#canvas")
            .append("g");

        group.append('rect')
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'black');
    }
}
