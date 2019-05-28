d3.csv("shuin-data_all_v2.csv", function(error, data){
    var headers = [];
    for (key in data[0]){
        headers.push(key);
    }
    // for(var i=0; i<data.length; i++){
    //     data[i][headers[0]] = data[i][headers[0]].replace(/[^0-9]/g, "-").slice(0,-1);
    // }
    main(data, headers);
})

function main(dataSet, headers){
    var colors = d3.scale.category10();

    var svgEle = document.getElementById("myGraph");
    var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
    var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
    svgWidth = parseFloat(svgWidth) - 60;
    svgHeight = parseFloat(svgHeight) - 60;
    var offsetX = 60;
    var offsetY = 20;
    var xScale;
    var yScale;
    var dataFmt = d3.time.format("%m月%d日");

    drawScale(dataSet, headers)

    for(var i=1; i<headers.length; i++){
        drawGraph(dataSet, headers, colors, i)
    }

    drawRect(headers, colors)

    function drawScale(dataSet, headers){
        var maxValue = [];
        for (var i=1; i<headers.length; i++){
            maxValue.push(d3.max(dataSet, function(d){ return parseInt(d[headers[i]]) }))
        }
        maxValue = d3.max(maxValue, function(d){ return d })

        function NumOfDigitCeiling(number){
            if (number/10 > 1){
                return NumOfDigitCeiling(number/10)*10;
            }else{
                return Math.ceil(number)
            }
        }
        maxValue = NumOfDigitCeiling(maxValue);

        yScale = d3.scale.linear()
        .domain([0, maxValue])
        .range([svgHeight, 0])

        xScale = d3.time.scale()
            .domain([
                new Date(dataFmt.parse(dataSet[0][headers[0]])),
                new Date(dataFmt.parse(dataSet.slice(-1)[0][headers[0]]))
            ])
            .range([0, svgWidth])

        d3.select("#myGraph")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+offsetX+","+offsetY+")")
        .call(
            d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5)
        )

        d3.select("#myGraph")
            .append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+offsetX+","+(svgHeight+offsetY)+")")
            .call(
                d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(d3.time.day, 3)
                    .tickFormat(function(d,i){
                        return dataFmt(d);
                    })
            )
    }

    function drawGraph(dataSet, headers, colors, ID){
		var line = d3.svg.line()
			.x(function(d, i){
				return xScale(new Date(dataFmt.parse(d[headers[0]])))+offsetX;
			})
			.y(function(d, i){
                return yScale(d[headers[ID]])+offsetY;
			})
            .interpolate("linear")
            
		var lineElements = d3.select("#myGraph")
			.append("path")
            .attr("class", "line")
            .attr("stroke", colors(ID-1))
            .attr("d", line(dataSet))
    }

    function drawRect(headers, colors){
        var rectElements = d3.select.("#myGraph")
                .append("rect")
                .attr()
    }
}