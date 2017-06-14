window.onload = function(){
  var height = 10;
  var dataset = [240,300,120,30];
  var colors = ["red","green","blue","orange"];
  d3.select("body")
    .append("svg")
    .attr({
      width:800,
      height:600
    })
    .append("g")
    .selectAll("g")
    .data(dataset)
    .enter()
    .append("rect")
    .attr({
      x:0,
      y:function(d,i){return (height + 5) * i},
      width:function(d){return d},
      height:height,
    });
    // .transition()
    // .duration(1000)
    // .delay(function(d,i){
    //   return i * 300;
    // })
    // .attr({
    //   width:function(d){return d},
    //   fill:function(d,i){return colors[i]}
    // });
};
