d3.selectAll("button")
    .on("click", function(){
        var csvFile = this.getAttribute("data-src");
    

//d3.csv("mydata.csv", function(error, data){
d3.csv(csvFile, function(error, data){
    var dataSet=[];
    var labelName=[];
    for(var i in data[0]){
        dataSet.push(data[0][i]);
        labelName.push(i);
    }

    var svgEle = document.getElementById("myGraph")
    var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
    var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
    svgWidth = parseFloat(svgWidth);
    svgHeight = parseFloat(svgHeight);

    var offsetX = 30;
    var offsetY = 20;
    var barElements;
    var textElements;
    var dataMax = 300;
    var barWidth = 20;
    var barMargin = 5;


    barElements = d3.select("#myGraph")
        .selectAll("rect")
        .data(dataSet)

    barElements.enter()
    .append("rect")
    .attr("class", "barred")
    .attr({
        width: barWidth/2,
        x: function(d, i){
            return i*(barWidth+barMargin)+offsetX+barWidth/2;
        },
        height: function(d, i){
            return d;
        },
        y: function(d, i){
            return svgHeight-d-offsetY;
        },
    })
    //barElements.enter()
    .append("rect")
    .attr("class", "bar")
    .attr({
        width: barWidth/2,
        x: function(d, i){
            return i*(barWidth+barMargin)+offsetX;
        },
        height: function(d, i){
            return d;
        },
        y: function(d, i){
            return svgHeight-d-offsetY;
        },
    })

    barElements.exit().remove()

    // barElements.enter()
    //     .append("rect")
    //     .attr("class", "bar")
    //     .attr({
    //         width: barWidth,
    //         x: function(d, i){
    //             return i*(barWidth+barMargin)+offsetX;
    //         },
    //         height: 0,
    //         y: function(d, i){
    //             return svgHeight-offsetY;
    //         },
    //     })
    //     .on("mouseover", function(){
    //         d3.select(this)
    //             .style("fill", "red")
    //     })
    //     .on("mouseout", function(){
    //         d3.select(this)
    //             .style("fill", "orange")
    //     })

    // barElements.transition()
    //     .duration(1000)
    //     .delay(function(d, i){
    //         return i*100;
    //     })
    //     .attr({
    //         height: function(d, i){
    //             return d;
    //         },
    //         y: function(d, i){
    //             return svgHeight-d-offsetY;
    //         }
    //     })

    textNumElements = d3.select("#myGraph")
        .selectAll("text.barNum")
        .data(dataSet)

    barElements.enter()
        .append("text")
        .attr("class", "barNum")
        .attr("x", function(d, i){
            return i*(barWidth+barMargin)+10+offsetX;
        })
        .attr("y", svgHeight - 5-offsetY)
        .text(function(d, i){
            return d;
        })

    textNumElements
        .text(function(d, i){
            return d;
        })

    var yScale = d3.scale.linear()
        .domain([0,dataMax])
        .range([dataMax, 0])
    d3.select("#myGraph")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+offsetX+","+((svgHeight-300)-offsetY)+")")
        .call(
            d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(20)
            )

    d3.select("#myGraph")
        .append("rect")
        .attr("class", "barName")
        .attr("width", 320)
        .attr("height", 1)
        .attr("transform", "translate("+offsetX+","+(svgHeight-offsetY)+")")

    barElements.enter()
        .append("text")
        .attr("class", "barName")
        .attr("x", function(d, i){
            return i*25+10+offsetX;
        })
        .attr("y", svgHeight-offsetY+15)
        .text(function(d, i){
            return labelName[i];
        })
        
    textNameElements = d3.select("#myGraph")
        .selectAll("text.barName")
        .data(dataSet)

    textNameElements.text(function(d, i){
            return labelName[i];
        })
    })
})