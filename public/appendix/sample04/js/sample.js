var dataSet = [
    {location: "校庭", value: 90},
    {location: "自宅", value: 35},
    {location: "校舎", value: 70},
    {location: "田畑など", value: 25},
    {location: "その他", value: 60},
];

var svgWidth = 320;
var svgHeight = 320;
var iRadius = 50;
var oRadius = iRadius + 10;
var color = d3.scale.category10()

for (var i=0; i<dataSet.length; i++){
    dataSet[i].startAngle =(360/dataSet.length)*i*Math.PI/180;
    dataSet[i].endAngle =(360/dataSet.length)*(i+1)*Math.PI/180;
}
var arc = d3.svg.arc()
    .innerRadius(iRadius)
    .outerRadius(function(d){ return oRadius+d.value})

var s = dataSet.sort(function(a,b){return a.value - b.value})

d3.select("#myGraph")
    .selectAll("path")
    .data(dataSet)
    .enter()
    .append("path")
    .attr("class", "pie")
    .attr("d", arc)
    .attr("fill", function(d,i){
        return color(i)
    })
    .attr("transform", "translate("+svgWidth/2+","+svgHeight/2+")")

d3.select("#myGraph")
    .selectAll("text")
    .data(dataSet)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("transform", function(d,i){
        var c = arc.centroid(d)
        var x = c[0]+svgWidth/2
        var y = c[1]+svgHeight/2
        return "translate("+x+","+y+")"
    })
    .text(function(d,i){
        return d.location+"("+d.value+")"
    })