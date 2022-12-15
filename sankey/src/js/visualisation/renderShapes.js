export default function renderShapes(columnPartitionsWithShapes, canvas){
    for(let row of columnPartitionsWithShapes){
        for(let shape of row){
            shape && shape.Render(canvas);
        }
    }
}
