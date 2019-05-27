var svgWidth=640;
var svgHeight=640;
var earthSize=280;
var degree = 0;
var earth = d3.geo.orthographic()
    .translate([svgWidth/2, svgHeight/2])
    .scale(earthSize)
    .clipAngle(90)
    .rotate([degree, -25])
var path = d3.geo.path()
    .projection(earth)

d3.json("data/world.json", function(error, world){
    d3.select("#myGraph")
        .append("circle")
        .attr("cx", svgWidth/2)
        .attr("cy", svgHeight/2)
        .attr("r", earthSize)
        .style("fill", "blue")
    var earthPath = d3.select("#myGraph")
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function(d,i){
            if(d.properties.name=="Antarctica"){
                return "#fff"
            }else if(d.properties.name=="Japan"){
                return "red";
            }
            return "#aaa"
        })
    d3.timer(function(){
        earth.rotate([degree, -25]);
        degree = degree+1;
        earthPath.attr("d", path);
    })
})