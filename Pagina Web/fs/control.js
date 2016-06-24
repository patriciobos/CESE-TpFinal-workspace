window.onload = function() {
  loadCheckboxes();
  loop();
};

var data_received = 0;

var actuadores = new Array(4);
var sensores = new Array(3);
var estadoAlarmas = new Array(6);
var controlAlarmas = new Array(6);

var Alarm = Object.freeze({
  Water_High : 0,
	Water_Low  : 1,
	Temp_High  : 2,
	Temp_Low   : 3,
	PH_High    : 4,
	PH_Low     : 5
});

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

  refreshBotones(estadoAlarmas,controlAlarmas);

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

function  refreshBotones( estadoAlarmas, controlAlarmas ) {

  var btn0 = document.getElementById("actuador0");
  var btn1 = document.getElementById("actuador1");
  var btn2 = document.getElementById("actuador2");
  var btn3 = document.getElementById("actuador3");


  /* Botón0: ENTRADA DE AGUA*/
  /* Botón1: SALIDA DE AGUA*/
  if (
    ((controlAlarmas[Alarm.Water_High] == "<!--#ctrlAlrm" + Alarm.Water_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Water_High] == "<!--#alarma" + Alarm.Water_High + "-->ALARMA" )) ||
    ((controlAlarmas[Alarm.Water_Low] == "<!--#ctrlAlrm" + Alarm.Water_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Water_Low] == "<!--#alarma" + Alarm.Water_Low + "-->ALARMA" )) ||
    ((controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->ALARMA" )) ||
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")         && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->ALARMA" ))
  ) {
    btn0.disabled = true;
    btn1.disabled = true;
  }
  else if (
    ((controlAlarmas[Alarm.Water_High] == "<!--#ctrlAlrm" + Alarm.Water_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Water_High] == "<!--#alarma" + Alarm.Water_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Water_Low] == "<!--#ctrlAlrm" + Alarm.Water_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Water_Low] == "<!--#alarma" + Alarm.Water_Low + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")         && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->NORMAL" ))
  ) {
    btn0.disabled = false;
    btn1.disabled = false;
  }

  /* Botón2: CALEFACTOR*/
  if (
    ( ( controlAlarmas[Alarm.Temp_Low] == "<!--#ctrlAlrm" + Alarm.Temp_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_Low] == "<!--#alarma" + Alarm.Temp_Low + "-->ALARMA"   ) ) ||
    ( ( controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->ALARMA" ) )
     ) {
    btn2.disabled = true;

  }

  else if ( (controlAlarmas[Alarm.Temp_Low] == "<!--#ctrlAlrm" + Alarm.Temp_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_Low] == "<!--#alarma" + Alarm.Temp_Low + "-->NORMAL" ) ) {
    btn2.disabled = false;
  }

  /* Botón3: BOMBA DE CO2*/
  if (
    ((controlAlarmas[Alarm.PH_High] == "<!--#ctrlAlrm" + Alarm.PH_High + "-->ENABLE") && ( estadoAlarmas[Alarm.PH_High] == "<!--#alarma" + Alarm.PH_High + "-->ALARMA" )) ||
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->ALARMA" ))
  ) {
    btn3.disabled = true;

  }

  else if ( (controlAlarmas[Alarm.PH_High] == "<!--#ctrlAlrm" + Alarm.PH_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.PH_High] == "<!--#alarma" + Alarm.PH_High + "-->NORMAL" ) ) {
    btn3.disabled = false;
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

