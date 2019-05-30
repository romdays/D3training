d3.csv("shuin-data_all_v2.csv", function(error, data){
    var headers = [];
    var dataSet= {};
    for (key in data[0]){
        var temp = [];
        for (var i=0; i<data.length; i++){
            temp.push(data[i][key])
        }
        headers.push(key);
        dataSet[key] = temp;
    }
    main(dataSet, headers);
})

function main(dataSet, headers){
    var colors = {};
    var color10 = d3.scale.category10();
    for (var i=1; i<headers.length; i++){
        colors[headers[i]] = color10(i-1);
    }

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

    
    calcScale();
    for (key of headers.slice(1)){
        drawGraph(key, "origin")
    }
    drawRect();
    drawScale();

    function calcScale(){
        var maxValue = [];
        for (key of headers.slice(1)){
            maxValue.push(d3.max(dataSet[key], function(d){ return parseInt(d) }))
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
                new Date(dataFmt.parse(dataSet[headers[0]][0])),
                new Date(dataFmt.parse(dataSet[headers[0]].slice(-1)[0]))
            ])
            .range([0, svgWidth])
    }

    function drawScale(){
        d3.select("#myGraph")
            .append("text")
            .text("(件)")
            .attr({
                x: offsetX,
                y: offsetY,
                "font-size": 9+"px"
            })

        d3.select("#myGraph")
        .append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate("+offsetX+","+offsetY+")")
        .attr("text-decoration", "underline")
        .call(
            d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5)
        )

        d3.select("#myGraph")
            .append("g")
            .attr("class", "xAxis")
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

    function drawGraph(partyName, nameScope){
        // var tooltip = d3.select("body")
        //     .append("div")
        //     .attr("class", "tip")

        var line = d3.svg.line()
            .x(function(d, i){
                return xScale(new Date(dataFmt.parse(dataSet[headers[0]][i])))+offsetX;
            })
            .y(function(d){
                return yScale(d)+offsetY;
            })

        d3.select("#myGraph")
            .append("path")
            .attr("class", nameScope)
            .style("fill", "none")
            .style("stroke-width", 3)
            .attr("stroke", colors[partyName])
            .attr("d", line(dataSet[partyName]))
            .attr("id", partyName)
            // .on("mouseover", function(){
            //     var fontSize = 16;
            //     var rectSize = fontSize*1.7;
            //     tooltip
            //     .style({
            //         left: d3.mouse(this)[0]+"px",
            //         top: d3.mouse(this)[1]+"px",
            //         "font-size": fontSize+"px",
            //         "border-radius": rectSize/10+"px",
            //         visibility: "visible",
            //     })
            //     .text(d3.select(this).attr("id"))
            // })
            // .on("mouseout", function(){
            //         tooltip.style("visibility", "hidden")
            // })
        
    }

    function drawRect(){
        var fontSize = 16;
        var colorBoxSize = fontSize*.8;
        var rectSize = fontSize*1.7;
        var margin = 0.5;
        var rectElement;
        var rectElements = d3.select("#myGraph")
                .append("g")

        
        for (var i=1; i<headers.length; i++){
            rectElement = rectElements.append("g")
                .attr("id", "partyBox")

                rectElement.append("rect")
                .attr({
                    x: svgWidth+offsetX-d3.sum(headers.slice(i), function(d){
                        return (d.length+1+margin);
                    })*fontSize-fontSize*(1+margin/4),
                    y: offsetY-rectSize/2,
                    rx: rectSize/6,
                    ry: rectSize/6,
                    width: (headers[i].length+1+margin/2)*fontSize,
                    height: rectSize,
                    fill: "none",
                    id: headers[i]
                })

            rectElement.append("text")
                .text(headers[i])
                .style("font-size", fontSize+"px")
                .style("dominant-baseline","central")
                .attr({
                    x: svgWidth+offsetX-d3.sum(headers.slice(i), function(d){
                        return (d.length+1+margin);
                    })*fontSize,
                    y: offsetY,
                })

            rectElement.append("rect")
                .attr({
                    x: svgWidth+offsetX-d3.sum(headers.slice(i), function(d){
                        return (d.length+1+margin);
                    })*fontSize-(fontSize+colorBoxSize)/2,
                    y: offsetY-colorBoxSize/2,
                    rx: colorBoxSize/6,
                    ry: colorBoxSize/6,
                    width: colorBoxSize,
                    height: colorBoxSize,
                    fill: colors[headers[i]]
                })
        }

        rectElements.selectAll("#partyBox")
            .on("mouseover", function(){
                var partyName = d3.select(this)
                    .select("rect")
                    .style("fill", "#eee")
                    .attr("id")

                d3.select("#myGraph")
                    .selectAll(".origin")
                    .data(headers.slice(1))
                    .style("stroke", function(d){
                        return "#ddd";
                    })

                drawGraph(partyName, "highlight")
                
            })
            .on("mouseout", function(){
                var partyName = d3.select(this)
                    .select("rect")
                    .style("fill", "none")
                    .attr("id")

                d3.selectAll(".highlight")
                    .remove()

                var lineElements = d3.select("#myGraph")
                    .selectAll("#origin")
                    .data(headers.slice(1))

                    lineElements.style("stroke", function(d){
                        return colors[d];
                    })

            })
        
            
    }
}