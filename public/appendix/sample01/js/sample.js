var dataSet = {
    nodes:[
        {name: "Apple"},
        {name: "Google"},
        {name: "Amazon"},
        {name: "Facebook"}
    ],
    links:[
        {source:0, target:1},
        {source:1, target:2},
        {source:2, target:3},
        {source:3, target:0},
    ]
}

var force = d3.layout.force()
    .nodes(dataSet.nodes)
    .links(dataSet.links)
    .size([320,320])
    .linkDistance(90)
    .linkStrength(5)
    .gravity(.1)
    .start()

var link = d3.select("#myGraph")
    .selectAll("line")
    .data(dataSet.links)
    .enter()
    .append("line")
    .attr("class", "forceLine")

var node = d3.select("#myGraph")
    .selectAll("circle")
    .data(dataSet.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .call(force.drag)

force.on("tick", function(){
    link.attr({
        x1: function(d){return d.source.x;},
        y1: function(d){return d.source.y;},
        x2: function(d){return d.target.x;},
        y2: function(d){return d.target.y;},
    })
    node.attr({
        cx: function(d){return d.x;},
        cy: function(d){return d.y;},
    })
})