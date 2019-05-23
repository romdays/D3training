d3.selectAll(".bar")
    // .style({
    //     fill: "red",
    //     stroke: "black"
    // })

    // .attr("class", "bar_note")

    .attr("style", function(d, i){
        if(i==2){
            return "fill:red;stroke:black"
        }
    })