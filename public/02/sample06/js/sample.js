var dataSet = [300, 130, 5, 60, 240];


d3.select("#myGraph")
    .selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", function(d, i){
        return i*25;
    })
    .attr("width", function(d, i){
        return d;
    })
    .attr("height", "20px")

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