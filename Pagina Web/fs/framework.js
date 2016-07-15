var actuadores = new Array(6);
var sensores = new Array(3);
var estadoAlarmas = new Array(6);
var controlAlarmas = new Array(6);

var graph0;
var graph1;
var graph2;

var msUpdateTime = 1000;

var Alarm = Object.freeze({
  Water_High : 0,
  Water_Low  : 1,
  Temp_High  : 2,
  Temp_Low   : 3,
  PH_High    : 4,
  PH_Low     : 5
});

function changebuttonClasses(elem) {

  if ( elem.className.match(/(?:^|\s)active(?!\S)/) )
    return;

  else {
    document.getElementById("menu1").className = document.getElementById("menu1").className.replace ( /(?:^|\s)active(?!\S)/g , '' );

    document.getElementById("menu2").className = document.getElementById("menu2").className.replace ( /(?:^|\s)active(?!\S)/g , '' );

    document.getElementById("menu3").className = document.getElementById("menu3").className.replace ( /(?:^|\s)active(?!\S)/g , '' );

    elem.className = "active";
  }
}

function createCanvas(divName) {

    var div = document.getElementById(divName);
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }
    var ctx = canvas.getContext("2d");
    return ctx;
  }

function createGraphs() {

  var ctx = createCanvas("graphDiv0");

  graph0 = new BarGraph(ctx);
  graph0.maxValue = 20;
  graph0.margin = 2;
  graph0.colors = ["#555555"];
  graph0.xAxisLabelArr = [];
  graph0.update([0]);

  var ctx = createCanvas("graphDiv1");

  graph1 = new BarGraph(ctx);
  graph1.maxValue = 30;
  graph1.margin = 2;
  graph1.colors = ["#555555"];
  graph1.xAxisLabelArr = [];
  graph1.update([0]);

  var ctx = createCanvas("graphDiv2");

  graph2 = new BarGraph(ctx);
  graph2.maxValue = 14;
  graph2.margin = 2;
  graph2.colors = ["#555555"];
  graph2.xAxisLabelArr = [];
  graph2.update([0]);
}
