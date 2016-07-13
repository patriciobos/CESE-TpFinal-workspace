window.onload = function() {
  loadCheckboxes();
  loop();
};

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

function parse_vars( data ) {

  var parsed = data.split('\n');

  var i, index;

  var thenum;

  for (i=0; i < actuadores.length; i++ ) {

    actuadores[i] = parsed[i];

  }

  index = actuadores.length;

  for (i=0; i < sensores.length; i++ ) {

    sensores[i] = parsed[i+index].replace(/.*\D/g, "");
    sensores[i]  = parseInt(sensores[i],10)/10;

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

  var baseAux = "graph"
  for (i=0; i < sensores.length; i++) {

    document.getElementById("sensor" + i ).innerHTML = sensores[i];
    window[baseAux+i].update([sensores[i]]);
  }

}

function  refreshAlarmas( estadoAlarmas, controlAlarmas ) {

  var i;

  for (i=0; i < estadoAlarmas.length; i++) {

    if ( controlAlarmas[i] == "<!--#ctrlAlrm" + i + "-->DISABLE" ) {
    document.getElementById("alarm" + i).innerHTML  = estadoAlarmas[i];
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

  var btnPumpIn = document.getElementById("actuador0");
  var actPumpIn = document.getElementById("act0");
  var btnPumpOut = document.getElementById("actuador1");
  var actPumpOut = document.getElementById("act1");
  var btnHeat = document.getElementById("actuador2");
  var actHeat = document.getElementById("act2");
  var btnCO2 = document.getElementById("actuador5");
  var actCO2 = document.getElementById("act5");


  /* Botón0: ENTRADA DE AGUA*/
  /* Botón1: SALIDA DE AGUA*/
  if (
    ((controlAlarmas[Alarm.Water_High] == "<!--#ctrlAlrm" + Alarm.Water_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Water_High] == "<!--#alarma" + Alarm.Water_High + "-->ALARMA" )) ||
    ((controlAlarmas[Alarm.Water_Low] == "<!--#ctrlAlrm" + Alarm.Water_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Water_Low] == "<!--#alarma" + Alarm.Water_Low + "-->ALARMA" )) ||
    ((controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->ALARMA" )) ||
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")         && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->ALARMA" ))
  ) {
    btnPumpIn.disabled = true;
    actPumpIn.className = "tooltip";
    btnPumpOut.disabled = true;
    actPumpOut.className = "tooltip";
  }
  else if (
    ((controlAlarmas[Alarm.Water_High] == "<!--#ctrlAlrm" + Alarm.Water_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Water_High] == "<!--#alarma" + Alarm.Water_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Water_Low] == "<!--#ctrlAlrm" + Alarm.Water_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Water_Low] == "<!--#alarma" + Alarm.Water_Low + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")         && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->NORMAL" ))
  ) {
    btnPumpIn.disabled = false;
     actPumpIn.className = "notooltip";
    btnPumpOut.disabled = false;
    actPumpOut.className = "notooltip";
  }
  else if (
    ((controlAlarmas[Alarm.Water_High] == "<!--#ctrlAlrm" + Alarm.Water_High + "-->DISABLE") ) &&
    ((controlAlarmas[Alarm.Water_Low] == "<!--#ctrlAlrm" + Alarm.Water_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Water_Low] == "<!--#alarma" + Alarm.Water_Low + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")         && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->NORMAL" ))
  ) {
    btnPumpIn.disabled = false;
     actPumpIn.className = "notooltip";
    btnPumpOut.disabled = false;
    actPumpOut.className = "notooltip";
  }
  else if (
    ((controlAlarmas[Alarm.Water_High] == "<!--#ctrlAlrm" + Alarm.Water_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Water_High] == "<!--#alarma" + Alarm.Water_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Water_Low] == "<!--#ctrlAlrm" + Alarm.Water_Low + "-->DISABLE")) &&
    ((controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")         && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->NORMAL" ))
  ) {
    btnPumpIn.disabled = false;
     actPumpIn.className = "notooltip";
    btnPumpOut.disabled = false;
    actPumpOut.className = "notooltip";
  }
  else if (
    ((controlAlarmas[Alarm.Water_High] == "<!--#ctrlAlrm" + Alarm.Water_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Water_High] == "<!--#alarma" + Alarm.Water_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Water_Low] == "<!--#ctrlAlrm" + Alarm.Water_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Water_Low] == "<!--#alarma" + Alarm.Water_Low + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->DISABLE")) &&
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")         && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->NORMAL" ))
  ) {
    btnPumpIn.disabled = false;
     actPumpIn.className = "notooltip";
    btnPumpOut.disabled = false;
    actPumpOut.className = "notooltip";
  }
  else if (
    ((controlAlarmas[Alarm.Water_High] == "<!--#ctrlAlrm" + Alarm.Water_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Water_High] == "<!--#alarma" + Alarm.Water_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Water_Low] == "<!--#ctrlAlrm" + Alarm.Water_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Water_Low] == "<!--#alarma" + Alarm.Water_Low + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->NORMAL" )) &&
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->DISABLE")  )
  ) {
    btnPumpIn.disabled = false;
     actPumpIn.className = "notooltip";
    btnPumpOut.disabled = false;
    actPumpOut.className = "notooltip";
  }

  /* Botón2: CALEFACTOR*/
  if (
    ( ( controlAlarmas[Alarm.Temp_Low] == "<!--#ctrlAlrm" + Alarm.Temp_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_Low] == "<!--#alarma" + Alarm.Temp_Low + "-->ALARMA"   ) ) ||
    ( ( controlAlarmas[Alarm.Temp_High] == "<!--#ctrlAlrm" + Alarm.Temp_High + "-->ENABLE") && ( estadoAlarmas[Alarm.Temp_High] == "<!--#alarma" + Alarm.Temp_High + "-->ALARMA" ) )
     ) {
    btnHeat.disabled = true;
    actHeat.className = "tooltip";

  }

  else if ( (controlAlarmas[Alarm.Temp_Low] == "<!--#ctrlAlrm" + Alarm.Temp_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.Temp_Low] == "<!--#alarma" + Alarm.Temp_Low + "-->NORMAL" ) ) {
    btnHeat.disabled = false;
    actHeat.className = "notooltip";
  }

  /* Botón3: BOMBA DE CO2*/
  if (
    ((controlAlarmas[Alarm.PH_High] == "<!--#ctrlAlrm" + Alarm.PH_High + "-->ENABLE") && ( estadoAlarmas[Alarm.PH_High] == "<!--#alarma" + Alarm.PH_High + "-->ALARMA" )) ||
    ((controlAlarmas[Alarm.PH_Low] == "<!--#ctrlAlrm" + Alarm.PH_Low + "-->ENABLE")   && ( estadoAlarmas[Alarm.PH_Low] == "<!--#alarma" + Alarm.PH_Low + "-->ALARMA" ))
  ) {
    btnCO2.disabled = true;
    actCO2.className = "tooltip";
  }

  else if ( (controlAlarmas[Alarm.PH_High] == "<!--#ctrlAlrm" + Alarm.PH_High + "-->ENABLE")   && ( estadoAlarmas[Alarm.PH_High] == "<!--#alarma" + Alarm.PH_High + "-->NORMAL" ) ) {
    btnCO2.disabled = false;
    actCO2.className = "notooltip";
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

