window.onload = function(){
    var dataset = [11,25,91,11,22,33,44,55,66,77,88,99];

    var w = 1000;
    var h = dataset.length * 25 + 50;
    var padding = 20;

    var xScale = d3.scale.linear()
        .domain([0,d3.max(dataset)])
        .range([padding,w - padding])
        .nice();

    var svg = d3.select("body").append("svg").attr({width:w,height:h});

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    svg.append("g")
        .attr({
            class: "axis",
            transform: "translate(0,"+(h-50)+")"
        })
        .call(xAxis)
    var count = 0;

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .transition()
        .duration(1500)
        .ease("elastic")
        .each("start",function(d,i){
            d3.select(this).attr({
                x:padding,
                y: function(d,i){
                    return count++ * 25;
                },
                width: 0,
                height:20,
                fill: "blue"
            });
        })
        .attr({
            x:padding,
            y: function(d,i){return i * 25;},
            width: function(d){return xScale(d) - padding;},
            height:20,
            fill: "green"
        });
}
