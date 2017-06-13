window.onload = function(){
  var dataset =
    [
      {
        "str":"タイトル",
        "size":40,
        "x":320,
        "y":100
      },
      {
        "str":"タイトル2",
        "size":20,
        "x":400,
        "y":200
      }
    ];
  var screen = d3.select("svg").append("g").selectAll("text").data(dataset);
  screen.enter()
    .append("text")
    .attr({
      x:0,
      y:0
    })
    .transition()
    .duration(1000)
    .attr({
      x:function(d){return d.x},
      y:function(d){return d.y},
      style:function(d){return "font-size:" + d.size}
    })
    .text(function(d){return d.str});

    var chart = $("#chart"),
        aspect = chart.width() / chart.height(),
        container = chart.parent();
    $(window).on("resize", function() {
        var targetWidth = container.width();
        chart.attr("width", targetWidth);
        chart.attr("height", Math.round(targetWidth / aspect));
    }).trigger("resize");
}
