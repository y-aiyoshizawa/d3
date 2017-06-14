window.onload = function(){
  var index = -1;
  var width = 800;
  var height = 450;
  var margin = 100;
  var dataset =
    [
      {
        "x":Math.random() * (width - (width / 10) * 2) + (width / 10),
        "y":Math.random() * (height - (height / 10) * 2) + (height / 10),
        "page":[
          {
            "str":"応用言語成果発表",
            "size":40,
            "x":width / 2 + 20,
            "y":100
          },
          {
            "str":"社員番号:205 相吉澤優太",
            "size":20,
            "x":400,
            "y":200
          },
          {
            "str":"2017/06/21",
            "size":20,
            "x":100,
            "y":300
          }
        ]
      },
      {
        "x":Math.random() * (width - (width / 10) * 2) + (width / 10),
        "y":Math.random() * (height - (height / 10) * 2) + (height / 10),
        "page":[
          {
            "str":"タイトル",
            "size":40,
            "x":width / 2 + 20,
            "y":100
          },
          {
            "str":"タイトル2",
            "size":20,
            "x":400,
            "y":200
          }
        ]
      },
      {
        "x":Math.random() * (width - (width / 10) * 2) + (width / 10),
        "y":Math.random() * (height - (height / 10) * 2) + (height / 10),
        "page":[
          {
            "str":"タイトル3",
            "size":40,
            "x":width / 2 + 20,
            "y":100
          },
          {
            "str":"タイトル2",
            "size":20,
            "x":400,
            "y":200
          }
        ]
      }
    ];
  var screen = d3.select("svg").append("g").selectAll("g").data(dataset);
  var page = screen.enter().append("g");
  var texts = page.attr("transform",function(d){return "translate("+d.x+","+d.y+")";})
    .selectAll("text")
    .data(function(d,i){return dataset[i].page;})
    .enter()
    .append("text");
  texts.attr({
      x:function(d){return d.x / 10;},
      y:function(d){return d.y / 10;},
      style:"font-size:5"
    })
    .text(function(d){return d.str});


  $(window).keydown(function(e){
    switch(e.keyCode){
      //←
      case 37:
        if(index <= 0)break;
        index--;
        pageEnlargement(0);
        pageShrinking(1);
        break;
      //→
      case 39:
        if(index > dataset.length - 2)break;
        index++;
        pageEnlargement(0);
        pageShrinking(-1);
        break;
    }
  });

  var chart = $("#chart"),
      aspect = chart.width() / chart.height(),
      container = chart.parent();
  $(window).on("resize", function() {
      var targetWidth = container.width();
      chart.attr("width", targetWidth);
      chart.attr("height", Math.round(targetWidth / aspect));
  }).trigger("resize");

  //拡大
  function pageEnlargement(offset){
    var onePage = d3.select(page[0][index + offset]);
    onePage.transition()
      .duration(1000)
      .attr("transform","translate(0,0)");

    onePage.selectAll("text")
      .data(dataset[index + offset].page)
      .attr("style","font-size:5")
      .transition()
      .duration(1000)
      .attr({
        x:function(d){return d.x - d.size * d.str.length;},
        y:function(d){return d.y;},
        style:function(d){return "font-size:"+d.size}
      });
  }
  //縮小
  function pageShrinking(offset){
    if(index + offset <= -1)return;
    var onePage = d3.select(page[0][index + offset]).data([dataset[index + offset]]);
    onePage.transition()
      .duration(1000)
      .attr("transform",function(d){return "translate("+d.x+","+d.y+")";});
    onePage.selectAll("text")
      .data(dataset[index + offset].page)
      .transition()
      .duration(1000)
      .attr({
        x:function(d){return d.x / 10;},
        y:function(d){return d.y / 10;},
        style:function(d){return "font-size:5"}
      });
  }
}
