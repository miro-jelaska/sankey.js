export default function loadSvgImage(path, ...imageFilenames){
    for(let filename of imageFilenames){
        d3
        .xml(`${path}${filename}.svg`)
        .mimeType('image/svg+xml')
        .get(function(error, xml) {
            if (error) throw error;
            document.body.appendChild(xml.documentElement);
        });
    }
}
