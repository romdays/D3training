d3.json("mydata.json", function(error,data){
    var dataSet = [];
    var svgEle = document.getElementById("myGraph")
    var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
    var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("Height")
    svgWidth = parseFloat(svgWidth)-60;
    svgHeight = parseFloat(svgHeight)-60;
    var offsetX = 30;
    var offsetY = 20;
    var scale = 2.0;
    var rangeYear = 10;
    var year =d3.extent(data, function(d){
        return d.year;
    });
    var startYear = year[0];
    var currentYear = 2000;
    var margin = svgWidth/(rangeYear -1);

    pickupData(data, currentYear-startYear)

    drawGraph(dataSet,"item1","itemA");
    drawGraph(dataSet,"item2","itemB");
    drawGraph(dataSet,"item3","itemC");
    drawScale();

function pickupData(data, start){
    dataSet = []
    for(var i=0; i<rangeYear; i++){
        dataSet[i] = data[start + i]
    }
    d3.select("#myGraph").selectAll("*").remove();
}

function drawGraph(dataSet, itemName, cssClassName){
    var line = d3.svg.line()
        .x(function(d,i){
            return i * margin+offsetX;
        })
        .y(function(d,i){
            return svgHeight -(d[itemName]*scale)-offsetY;
        })

    var lineElements = d3.select("#myGraph")
        .append("path")
        .attr("class", "line "+cssClassName)
        .attr("d",line(dataSet))
    }

function drawScale(){
    var yScale = d3.scale.linear()
        .domain([0,100])
        .range([scale*100,0])

    d3.select("#myGraph")
        .append("g")
        .attr("class", "axis")
        .attr("transform","translate("+offsetX+","+((100-(scale-1)*100)+offsetY)+")")
        .call(
            d3.svg.axis()
            .scale(yScale)
            .orient("left")
        )

        d3.select("#myGraph")
            .append("rect")
            .attr("class", "axis_x")
            .attr("width", svgWidth)
            .attr("Height", 1)
            .attr("transform", "translate("+offsetX+","+(svgHeight-offsetY-0.5)+")")

    var xScale = d3.time.scale()
        .domain([new Date(currentYear+"/1/1"),new Date(currentYear+rangeYear-1+"/1/1")])
        //.domain([2004,2013])
        .range([0,svgWidth])

    d3.select("#myGraph")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+offsetX+","+(svgHeight-offsetY)+")")
        .call(
            d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(10)
            .tickFormat(function(d,i){
                var fmtFunc = d3.time.format("%Y年%m月");
                return fmtFunc(d);
            })
        )
        .selectAll("text")
        .attr("transform","rotate(90)")
        .attr("dx","0.7em")
        .attr("dy","-0.4em")
        .style("text-anchor", "start")
    }

    d3.select("#prev").on("click", function(){
        if (currentYear > year[0]){
            currentYear = currentYear-1;
        }

        pickupData(data, currentYear-startYear)
        drawGraph(dataSet,"item1","itemA");
        drawGraph(dataSet,"item2","itemB");
        drawGraph(dataSet,"item3","itemC");
        drawScale();
    })

    d3.select("#next").on("click", function(){
        if (currentYear <= year[1]-rangeYear){
            currentYear = currentYear+1;
        }

        pickupData(data, currentYear-startYear)
        drawGraph(dataSet,"item1","itemA");
        drawGraph(dataSet,"item2","itemB");
        drawGraph(dataSet,"item3","itemC");
        drawScale();
    })
})