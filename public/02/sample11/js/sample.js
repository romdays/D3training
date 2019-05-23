var dataSet =[];

d3.csv("mydata.csv", function(error, data){
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
        .attr("width", 0)
        .attr("height", "20px")
        .on("click", function(){
            d3.select(this)
                .style("fill", "cyan")
        })
        .transition()
        .delay(function(d, i){
            return i*500
        })
        .duration(2500)
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
});

d3.select("#updateButton")
    .on("click", function(){
        for(var i=0; i<dataSet.length; i++){
            dataSet[i] = Math.floor(Math.random()*320);
        }
        d3.select("#myGraph")
            .selectAll("rect")
            .data(dataSet)
            .transition()
            .attr("width", function(d, i){
                return d;
            })
    })
// d3.select("#updateButton")
//     .on("click", function(){
//         for(var i=0; i<dataSet.length; i++){
//             dataSet[i] = Math.floor(Math.random()*320);
//         }
//         d3.select("#myGraph")
//             .selectAll("rect")
//             .data(dataSet)
//             .transition()
//             .attr("width", function(d, i){
//                 return d;
//             })
//     })
