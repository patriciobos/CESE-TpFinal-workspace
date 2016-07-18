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

var data_received = 0;


function loop() {
	if( !data_received )
		makeRequest("ajax.shtml");
    setTimeout("loop()",msUpdateTime);
}

function makeRequest(url){
  var http_request = false;
  data_received = 1;

  if (window.XMLHttpRequest){
    http_request = new XMLHttpRequest();
    if (http_request.overrideMimeType){
      http_request.overrideMimeType('text/xml');
    }
  }

  if(!http_request){
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  http_request.onreadystatechange = function() { alertContents(http_request); };
  http_request.open('GET', url, true);
  http_request.send(null);
}

function alertContents(http_request){

  if (http_request.readyState == 4){
    if (http_request.status == 200){
      parse_vars(http_request.responseText);
      data_received = 0;
    }
    else{
      alert("There was a problem with the AJAX request.\n\r \
           Request status = " + http_request.status );

    }
  }
}

function refreshSensores( sensores, estadoAlarmas ) {

  var i;
  var baseAux = "graph"
  for (i=0; i < sensores.length; i++) {

    document.getElementById("sensor" + i ).innerHTML = sensores[i];
    window[baseAux+i].update([sensores[i]]);

    if ( ( estadoAlarmas[2*i] == "<!--#alarma" + 2*i + "-->ALARMA" ) || ( estadoAlarmas[(2*i)+1] == "<!--#alarma" + ((2*i)+1) + "-->ALARMA" ) )
      window[baseAux+i].colors = ["#ff0000"];

    else
      window[baseAux+i].colors = ["green"];

  }

}


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
  graph0.colors = ["#00ff00"];
  graph0.xAxisLabelArr = [];
  graph0.update([0]);

  var ctx = createCanvas("graphDiv1");

  graph1 = new BarGraph(ctx);
  graph1.maxValue = 30;
  graph1.margin = 2;
  graph1.colors = ["#00ff00"];
  graph1.xAxisLabelArr = [];
  graph1.update([0]);

  var ctx = createCanvas("graphDiv2");

  graph2 = new BarGraph(ctx);
  graph2.maxValue = 14;
  graph2.margin = 2;
  graph2.colors = ["#00ff00"];
  graph2.xAxisLabelArr = [];
  graph2.update([0]);
}
