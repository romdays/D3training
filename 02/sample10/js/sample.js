d3.csv("mydata.csv", function(error, data){
    var dataSet =[];
    for(var i=0; i<data.length; i++){
        dataSet.push(data[i].item1);
    }

    d3.select("#myGraph")
        .selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", 10)
        .attr("y", function(d, i){
            return i*25;
        })
        .attr("height", "20px")
        .attr("width", function(d, i){
            return d;
        })

    var xScale = d3.scale.linear()
        .domain([0, 300])
        .range([0, 300])
    
    d3.select("#myGraph")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(10, "+((1+dataSet.length) *20+5)+")")
        .call(d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
        )
})
