var color = d3.scale.category10();

drawPie("mydata2008.csv");
d3.select("#year").on("change", function(d,i){
    d3.select("#myGraph").selectAll("*").remove();
    drawPie("mydata"+this.value+".csv", this.value);
})

function drawPie(filename, year){
    d3.csv(filename, function(error, data){
        var dataSet = [];
        for(var i in data[0]){
            dataSet.push(data[0][i])
        }
    
    var svgEle = document.getElementById("myGraph");
    var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
    var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
    svgWidth = parseFloat(svgWidth);
    svgHeight = parseFloat(svgHeight);

    var pie = d3.layout.pie()

    var arc = d3.svg.arc().innerRadius(30).outerRadius(100);

    var pieElements = d3.select("#myGraph")
        .selectAll("g")
        .data(pie(dataSet))
        .enter()
        .append("g")
        .attr("transform", "translate("+svgWidth/2+","+svgHeight/2+")")

    pieElements
        .append("path")
        .attr({
            class: "pie",
            d: arc
        })
        .style("fill", function(d, i){
            return color(i);ß
        })
        .transition()
        .ease("linear")
        .duration(200)
        .delay(function(d,i){
            return i*200;
        })
        .attrTween("d", function(d,i){
            var interpolate =d3.interpolate(
                {startAngle: d.startAngle, endAngle: d.startAngle},
                {startAngle: d.startAngle, endAngle: d.endAngle}
            );
            return function(t){
                return arc(interpolate(t));
            }
        })

    var textElements = d3.select("#myGraph")
        .append("text")
        .attr("class", "total")
        .attr("transform", "translate("+svgWidth/2+","+(svgHeight/2+5)+")")
        .text("合計:"+d3.sum(dataSet))

    pieElements.append("text")
        .attr("class", "pieNum")
        .attr("transform", function(d,i){
            return "translate("+arc.centroid(d)+")";
        })
        .text(function(d,i){
            return d.value;
        })
    })
}