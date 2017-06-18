window.onload = function(){
  var width = 800;
  var height = 400;
  var margin = 100;
  var dataset =
    [
      {
        "x":Math.random() * (width - (width / 10) * 2) + (width / 10),
        "y":Math.random() * (height - (height / 10) * 2) + (height / 10),
        "page":[
          {
            "str":"D3を使った４分間Cooking！",
            "size":40,
            "x":100,
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
            "str":"発表の目的は",
            "size":40,
            "x":250,
            "y":100
          },
          {
            "str":"D3の雰囲気を感じてもらう",
            "size":40,
            "x":150,
            "y":200
          }
        ]
      },
      {
        "x":Math.random() * (width - (width / 10) * 2) + (width / 10),
        "y":Math.random() * (height - (height / 10) * 2) + (height / 10),
        "page":[
          {
            "str":"↑このグラフを作る",
            "size":40,
            "x":10,
            "y":200
          }
        ]
      },
      {
        "x":Math.random() * (width - (width / 10) * 2) + (width / 10),
        "y":Math.random() * (height - (height / 10) * 2) + (height / 10),
        "page":[
          {
            "str":"早速始めていきます！",
            "size":40,
            "x":200,
            "y":200
          }
        ]
      },
      {
        "x":Math.random() * (width - (width / 10) * 2) + (width / 10),
        "y":Math.random() * (height - (height / 10) * 2) + (height / 10),
        "page":[
          {
            "str":"この資料もD3だけで作っている！",
            "size":40,
            "x":100,
            "y":200
          }
        ]
      },
      {
        "x":Math.random() * (width - (width / 10) * 2) + (width / 10),
        "y":Math.random() * (height - (height / 10) * 2) + (height / 10),
        "page":[
          {
            "str":"ご清聴ありがとうございました",
            "size":40,
            "x":150,
            "y":200
          }
        ]
      }
    ];
  var fontsize = "4px";
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
      style:"font-size:"+fontsize
    })
    .text(function(d){return d.str});

  var index = -1;
  $(window).keydown(function(e){
    var okKey = false;
    switch(e.keyCode){
      //←
      case 37:
        if(index <= 0)break;
        index--;
        pageEnlargement(0);
        pageShrinking(1);
        okKey = true;
        break;
      //→
      case 39:
        if(index > dataset.length - 2)break;
        index++;
        pageEnlargement(0);
        pageShrinking(-1);
        okKey = true;
        break;
    }
    if(okKey &&index === 2){
      drowGraph();
    }else{
      deleteGraph()
    }

    if(index === 3){
      bgmStart();
    }else{
      bgmStop();
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
      .attr("style","font-size:"+fontsize)
      .transition()
      .duration(1000)
      .attr({
        x:function(d){return d.x;},
        y:function(d){return d.y;},
        style:function(d){return "font-size:"+d.size+"px"}
      });
  }
  //縮小
  function pageShrinking(offset){
    if(index + offset <= -1)return;
    var onePage = d3.select(page[0][index + offset]).data([dataset[index + offset]]);
    onePage.transition()
      .duration(1000)
      .attr({
        transform:function(d){return "translate("+d.x+","+d.y+")";},
      });
    onePage.selectAll("text")
      .data(dataset[index + offset].page)
      .transition()
      .duration(1000)
      .attr({
        x:function(d){return d.x / 10;},
        y:function(d){return d.y / 10;},
        style:"font-size:"+fontsize
      });
  }

  var graphData = [100,200,300,40];
  var graphHeight = 30;
  var margin = 10;
  var graph = d3.select("svg").append("g")
    .selectAll("rect")
    .data(graphData)
    .enter()
    .append("rect");
  function drowGraph(){
      graph.attr({
        width:0
      })
      .transition()
      .duration(1000)
      .attr({
        x:margin,
        y:function(d,i){return (graphHeight + 5) * i + margin},
        width:function(d){return d},
        height: graphHeight,
        fill:"green"
      })
  }
  function deleteGraph(){
    if(graph !== null){
      graph.transition()
        .duration(1000)
        .attr({
          width:0
        })
    }
  }

  var bgmFlag = false;
  var bgm = $("#bgm")[0];
  function bgmStart(){
    bgm.currentTime = 0;
    bgm.volume = 1;
    bgm.play();
    bgmFlag = true;
  }
  function bgmStop(){
    if(!bgmFlag)return;
    setTimeout(function(){
      var sub = bgm.volume / 10;
      for(var i = 0; i < 10; i++){
        setTimeout(function(){bgm.volume -= sub},100 * i);
      }
      setTimeout(function(){
        bgm.volume = 0;
        bgm.pause();
      },1100);
      bgmFlag = false;
    },0);
  }
}
