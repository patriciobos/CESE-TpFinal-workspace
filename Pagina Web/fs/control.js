window.onload = function() {
  loadCheckboxes();
  loop();
};

var data_received = 0;

var actuadores = new Array(4);
var sensores = new Array(3);
var estadoAlarmas = new Array(6);
var controlAlarmas = new Array(6);


function loop() {
	if( !data_received )
		makeRequest("ajax.shtml");
    setTimeout("loop()",2000);
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

function parse_vars( data ) {

  var parsed = data.split('\n');

  var i, index;

  for (i=0; i < actuadores.length; i++ ) {

    actuadores[i] = parsed[i];

  }

  index = actuadores.length;

  for (i=0; i < sensores.length; i++ ) {

    sensores[i] = parsed[i+index];

  }

  index += sensores.length;

  for (i=0; i < estadoAlarmas.length; i++ ) {

    estadoAlarmas[i] = parsed[i+index];

  }

  index += estadoAlarmas.length;

  for (i=0; i < controlAlarmas.length; i++ ) {

    controlAlarmas[i] = parsed[i+index];

  }

  refreshActuadores(actuadores);

  refreshSensores(sensores);

  refreshAlarmas(estadoAlarmas,controlAlarmas);

}

function refreshActuadores( actuadores ) {

  var i;

  for (i=0; i < actuadores.length; i++){

    document.getElementById("state" + i ).innerHTML = actuadores[i];

    if ( actuadores[i] == "<!--#act" + i + "-->ENCENDIDO" ) {
      document.getElementById("actuador" + i ).value = "DETENER";
      document.getElementById("state" + i ).className = "actuadorVerde";
    }
    else {
      document.getElementById("actuador" + i ).value = "INICIAR";
      document.getElementById("state" + i ).className = "actuadorRojo";
    }
  }

}

function refreshSensores( sensores ) {

  var i;

  for (i=0; i < sensores.length; i++) {

    document.getElementById("sensor" + i ).innerHTML = sensores[i];
  }

}

function  refreshAlarmas( estadoAlarmas, controlAlarmas ) {

  var i;

  for (i=0; i < estadoAlarmas.length; i++) {

    if ( controlAlarmas[i] == "<!--#ctrlAlrm" + i + "-->DISABLE" ) {
    document.getElementById("alarm" + i).innerHTML  = "-";
    document.getElementById("alarm" + i).className = "alarmaAmarillo";
    }
    else if (controlAlarmas[i] == "<!--#ctrlAlrm" + i + "-->ENABLE") {
      document.getElementById("alarm" + i).innerHTML  = estadoAlarmas[i];

      if ( estadoAlarmas[i] == "<!--#alarma" + i + "-->NORMAL" ) {
        document.getElementById("alarm" + i).className = "alarmaVerde";
      }
      else {
       document.getElementById("alarm" + i).className = "alarmaRojo";
      }
    }
    else {
      document.getElementById("alarm" + i).innerHTML  = ""
      document.getElementById("alarm" + i).className = "alarmaRojo";
    }

  }

}

function controlCheckbox( ) {

  var i;

  saveCheckboxes();

  for (i=0; i < controlAlarmas.length; i++) {

    if(document.getElementById("alarmControl" + i).checked)
      document.getElementById("alarmControl" + i + "Hidden").disabled = true;
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

function saveCheckboxes(){

  var i;
  var checkbox;

  for (i=0; i < controlAlarmas.length; i++) {

    checkbox = document.getElementById("alarmControl" + i);
    sessionStorage.setItem("alarmControl" + i, checkbox.checked);
  }
}

function loadCheckboxes(){

  var i;
  var checkbox;

  for (i=0; i < controlAlarmas.length; i++) {

    checkbox = JSON.parse(sessionStorage.getItem("alarmControl" + i));
    document.getElementById("alarmControl" + i).checked = checkbox;

  }

}

