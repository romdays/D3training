var svgHeight = 400;

d3.selectAll("button")
    .on("click", function(){
        var csvFile = this.getAttribute("data-src");
        var barElements;

        d3.csv(csvFile, function(error, data){
            var dataSet=[];
            for(var i=0; i<data.length; i++){
                dataSet.push(data[i]["商品A"]);
            }

            barElements = d3.select("#myGraph")
                .selectAll("rect")
                .data(dataSet)
            
            barElements.enter()
                .append("rect")
                .datum(function(d,i){
                    console.log(i+"="+d);
                    return d;
                })
                .attr("class", "bar")
                .attr({
                    width: 20,
                    x: function(d, i){
                        return i*25;
                    }
                })
                
            barElements.attr({
                height: function(d, i){
                    return d;
                },
                y: function(d, i){
                    return svgHeight-d;
                },
            })
            barElements.exit().remove()
        })
    })