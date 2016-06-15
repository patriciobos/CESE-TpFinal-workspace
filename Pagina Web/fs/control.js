window.onload = function() {
  loadCheckboxes();
  loop();
};

var data_received = 0;
var timeOutEnable = 1;

function loop() {
	if( !data_received )
		makeRequest("ajax.shtml");
  if(timeOutEnable == 1)
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

  parseActuadores(parsed);

  parseSensores(parsed);

  parseAlarmas(parsed);

}

function parseActuadores( parsed ) {

  document.getElementById("state1").innerHTML = parsed[0];

  if ( parsed[0] == "<!--#act1-->ENCENDIDO" ) {
    document.getElementById("actuador1").value = "DETENER";
    document.getElementById("state1").className = "actuadorVerde";
  }
  else {
    document.getElementById("actuador1").value = "INICIAR";
    document.getElementById("state1").className = "actuadorRojo";
  }

  document.getElementById("state2").innerHTML = parsed[1];

  if ( parsed[1] == "<!--#act2-->ENCENDIDO" ) {
    document.getElementById("actuador2").value = "DETENER";
    document.getElementById("state2").className = "actuadorVerde";
  }
  else {
    document.getElementById("actuador2").value = "INICIAR";
    document.getElementById("state2").className = "actuadorRojo";
  }

  document.getElementById("state3").innerHTML = parsed[2];

  if ( parsed[2] == "<!--#act3-->ENCENDIDO" ) {
    document.getElementById("actuador3").value = "DETENER";
    document.getElementById("state3").className = "actuadorVerde";
  }
  else {
    document.getElementById("actuador3").value = "INICIAR";
    document.getElementById("state3").className = "actuadorRojo";
  }

  document.getElementById("state4").innerHTML = parsed[3];

  if ( parsed[3] == "<!--#act4-->ENCENDIDO" ) {
    document.getElementById("actuador4").value = "DETENER";
    document.getElementById("state4").className = "actuadorVerde";
  }
  else {
    document.getElementById("actuador4").value = "INICIAR";
    document.getElementById("state4").className = "actuadorRojo";
  }

}

function parseSensores( parsed ) {

  document.getElementById("sensor1").innerHTML = parsed[4];
  document.getElementById("sensor2").innerHTML = parsed[5];
  document.getElementById("sensor3").innerHTML = parsed[6];
}

function  parseAlarmas( parsed ) {

  if ( parsed[11] == "<!--#ctrlAlrm1-->DISABLE" ) {
    document.getElementById("alarm1").innerHTML  = "-";
    document.getElementById("alarm1").className = "alarmaAmarillo";
  }
  else if (parsed[11] == "<!--#ctrlAlrm1-->ENABLE") {
    document.getElementById("alarm1").innerHTML  = parsed[7];

    if ( parsed[7] == "<!--#alarma1-->NORMAL" ) {
      document.getElementById("alarm1").className = "alarmaVerde";
    }
    else {
     document.getElementById("alarm1").className = "alarmaRojo";
    }
  }
  else
    //document.getElementById("alarm1").innerHTML  = "-";
    document.getElementById("alarm1").className = "alarmaRojo";

  /*------------------------------------------------------------*/

  if ( parsed[12] == "<!--#ctrlAlrm2-->DISABLE" ) {
    document.getElementById("alarm2").innerHTML  = "-";
    document.getElementById("alarm2").className = "alarmaAmarillo";
  }
  else if (parsed[12] == "<!--#ctrlAlrm2-->ENABLE") {
    document.getElementById("alarm2").innerHTML  = parsed[8];

    if ( parsed[8] == "<!--#alarma2-->NORMAL" ) {
      document.getElementById("alarm2").className = "alarmaVerde";
    }
    else {
     document.getElementById("alarm2").className = "alarmaRojo";
    }
  }
  else
    document.getElementById("alarm2").className = "alarmaRojo";

  /*------------------------------------------------------------*/

  if ( parsed[13] == "<!--#ctrlAlrm3-->DISABLE" ) {
    document.getElementById("alarm3").innerHTML  = "-";
    document.getElementById("alarm3").className = "alarmaAmarillo";
  }
  else if (parsed[13] == "<!--#ctrlAlrm3-->ENABLE") {
    document.getElementById("alarm3").innerHTML  = parsed[9];

    if ( parsed[9] == "<!--#alarma3-->NORMAL" ) {
      document.getElementById("alarm3").className = "alarmaVerde";
    }
    else {
     document.getElementById("alarm3").className = "alarmaRojo";
    }
  }
  else
    document.getElementById("alarm3").className = "alarmaRojo";

  /*------------------------------------------------------------*/

  if ( parsed[14] == "<!--#ctrlAlrm4-->DISABLE" ) {
    document.getElementById("alarm4").innerHTML  = "-";
    document.getElementById("alarm4").className = "alarmaAmarillo";
  }
  else if (parsed[14] == "<!--#ctrlAlrm4-->ENABLE") {
    document.getElementById("alarm4").innerHTML  = parsed[10];

    if ( parsed[10] == "<!--#alarma4-->NORMAL" ) {
      document.getElementById("alarm4").className = "alarmaVerde";
    }
    else {
     document.getElementById("alarm4").className = "alarmaRojo";
    }
  }
  else
    document.getElementById("alarm4").className = "alarmaRojo";

  /*------------------------------------------------------------*/

}

function controlCheckbox( ) {

  saveCheckboxes();

  if(document.getElementById("alarmControl1").checked)
    document.getElementById("alarmControl1Hidden").disabled = true;

  if(document.getElementById("alarmControl2").checked)
    document.getElementById("alarmControl2Hidden").disabled = true;

  if(document.getElementById("alarmControl3").checked)
    document.getElementById("alarmControl3Hidden").disabled = true;

  if(document.getElementById("alarmControl4").checked)
    document.getElementById("alarmControl4Hidden").disabled = true;
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

  var checkbox = document.getElementById("alarmControl1");
  sessionStorage.setItem("alarmControl1", checkbox.checked);

  checkbox = document.getElementById("alarmControl2");
  sessionStorage.setItem("alarmControl2", checkbox.checked);

  checkbox = document.getElementById("alarmControl3");
  sessionStorage.setItem("alarmControl3", checkbox.checked);

  checkbox = document.getElementById("alarmControl4");
  sessionStorage.setItem("alarmControl4", checkbox.checked);
}

function loadCheckboxes(){

  var checked1 = JSON.parse(sessionStorage.getItem("alarmControl1"));
  document.getElementById("alarmControl1").checked = checked1;

  var checked2 = JSON.parse(sessionStorage.getItem("alarmControl2"));
  document.getElementById("alarmControl2").checked = checked2;

  var checked3 = JSON.parse(sessionStorage.getItem("alarmControl3"));
  document.getElementById("alarmControl3").checked = checked3;

  var checked4 = JSON.parse(sessionStorage.getItem("alarmControl4"));
  document.getElementById("alarmControl4").checked = checked4;

  /*
  if ( !firstLoad ) {
    document.getElementById("formAlarmas").submit();
    firstLoad = 1;
  }
  */
}

