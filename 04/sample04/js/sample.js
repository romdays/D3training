var svg1 = d3.select("#myGraph")
            .append("svg")
svg1.append("rect")
    .attr("x", 10)
    .attr("y", 50)
    .attr("width", 200)
    .attr("height", 30)
    .style({
        fill: "red",
        stroke: "black"
    })