window.onload = function() {
  loop();
};

var data_received = 0;


function parse_vars( data ) {

  var parsed = data.split('\n');

  var i, index;

  for (i=0; i < actuadores.length; i++ ) {

    actuadores[i] = parsed[i];

  }

  index = actuadores.length;

  for (i=0; i < sensores.length; i++ ) {

    //sensores[i] = parsed[i+index];
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

  refreshActuadores( actuadores );

  refreshSensores( sensores, estadoAlarmas );

  refreshAlarmas( estadoAlarmas,controlAlarmas );

}

function refreshActuadores( actuadores ) {

  var i;

  for (i=0; i < actuadores.length; i++){

    document.getElementById("state" + i ).innerHTML = actuadores[i];

    if ( actuadores[i] == "<!--#act" + i + "-->ENCENDIDO" ) {
      //document.getElementById("actuador" + i ).value = "DETENER";
      document.getElementById("state" + i ).className = "actuadorVerde";
    }
    else {
      //document.getElementById("actuador" + i ).value = "INICIAR";
      document.getElementById("state" + i ).className = "actuadorRojo";
    }
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
