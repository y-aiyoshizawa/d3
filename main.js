window.onload = function(){

    var dataset = [];
    for(var i = 1; i <= 17; i++){
        dataset.push( i * 10 );
    }

    var w = 1000;
    var h = 500;
    var r = 300;
    var x = w / 2;
    var y = h;

    var svg = d3.select("body").append("svg").attr({width:w,height:h});
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr({
            cx: function(d,i){ return x - r * Math.cos(degreeToRadian(d))},
            cy: function(d,i){ return y - r * Math.sin(degreeToRadian(d))},
            r:10,
            fill:"red"
        });
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr({
            x: function(d,i){ return x - r * Math.cos(degreeToRadian(d))},
            y: function(d,i){ return y - r * Math.sin(degreeToRadian(d))},
        })
        .text(function(d) {
            return d;
        });

    // var dataset = [11,25,91,11,22,33,44,55,66,77,88,99];
    //
    // var w = 1000;
    // var h = dataset.length * 25 + 50;
    // var padding = 20;
    //
    // var xScale = d3.scale.linear()
    //     .domain([0,d3.max(dataset)])
    //     .range([padding,w - padding])
    //     .nice();
    //
    // var svg = d3.select("body").append("svg").attr({width:w,height:h});
    //
    // var xAxis = d3.svg.axis()
    //     .scale(xScale)
    //     .orient("bottom");
    //
    // svg.append("g")
    //     .attr({
    //         class: "axis",
    //         transform: "translate(0,"+(h-50)+")"
    //     })
    //     .call(xAxis)
    // var count = 0;
    //
    // svg.selectAll("rect")
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //     .transition()
    //     .duration(1500)
    //     .ease("elastic")
    //     .each("start",function(d,i){
    //         d3.select(this).attr({
    //             x:padding,
    //             y: function(d,i){
    //                 return count++ * 25;
    //             },
    //             width: 0,
    //             height:20,
    //             fill: "blue"
    //         });
    //     })
    //     .attr({
    //         x:padding,
    //         y: function(d,i){return i * 25;},
    //         width: function(d){return xScale(d) - padding;},
    //         height:20,
    //         fill: "green"
    //     });
}
function degreeToRadian(degree){
    return degree * Math.PI / 180;
}
