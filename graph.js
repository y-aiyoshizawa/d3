window.onload = function(){
  var height = 10;
  var dataset = [80,100,40,10];
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
      x:110,
      width:0
    })
    .transition()
    .duration(1000)
    .delay(function(d,i){
      return i * 300;
    })
    .attr({
      transform:"translate(100,100)",
      x:10,
      y:function(d,i){return (height + 5) * i},
      width:function(d){return d * 3},
      height:height,
      fill:function(d,i){return colors[i]}
    });
};
