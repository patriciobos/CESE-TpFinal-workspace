window.onload = loop;

var data_received = 0;
var timeOutEnable = 1;

function loop() {
	if( !data_received )
		makeRequest("ajax.shtml");
  if(timeOutEnable == 1)
    setTimeout("loop()",1000);
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
      //document.getElementById("sensor1").innerHTML = http_request.responseText;
      data_received = 0;
    }
    else{
      alert("There was a problem with the AJAX request.\n\r \
           Request status = " + http_request.status );

     // var timeOutEnable = 0;   //inhibe el requerimiento periódico de datos

    }
  }
}


function parse_vars( data ){

  var parsed = data.split('\n');

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


  document.getElementById("sensor1").innerHTML = parsed[4];
  document.getElementById("sensor2").innerHTML = parsed[5];
  document.getElementById("sensor3").innerHTML = parsed[6];


  document.getElementById("alarm1").innerHTML  = parsed[7];

  if ( parsed[7] == "<!--#alarma1-->NORMAL" ) {
    document.getElementById("alarm1").className = "alarmaVerde";
  }
  else {
   document.getElementById("alarm1").className = "alarmaRojo";
  }

  document.getElementById("alarm2").innerHTML  = parsed[8];

  if ( parsed[8] == "<!--#alarma2-->NORMAL" ) {
    document.getElementById("alarm2").className = "alarmaVerde";
  }
  else {
   document.getElementById("alarm2").className = "alarmaRojo";
  }

  document.getElementById("alarm3").innerHTML  = parsed[9];

  if ( parsed[9] == "<!--#alarma3-->NORMAL" ) {
    document.getElementById("alarm3").className = "alarmaVerde";
  }
  else {
   document.getElementById("alarm3").className = "alarmaRojo";
  }

  document.getElementById("alarm4").innerHTML  = parsed[10];

  if ( parsed[10] == "<!--#alarma4-->NORMAL" ) {
    document.getElementById("alarm4").className = "alarmaVerde";
  }
  else {
   document.getElementById("alarm4").className = "alarmaRojo";
  }

  if ( parsed[11] == "<!--#controlAlarma1-->DISABLE" ) {
    document.getElementById("alarmControl1").checked = false;
    document.getElementById("alarm4").className = "alarmaRojo";
  }
  else {
    document.getElementById("alarmControl1").checked = true;
    document.getElementById("menu1").className = document.getElementById("menu1").className.replace ( /(?:^|\s)alarmaAmarillo(?!\S)/g , '' );
  }
}

function strCompare(str1,str2) {

	var n = str1.localeCompare(str2);
	return n;
}



/*
// La función se invoca así: onclick="changeBottonText(this)
function changeBottonText(elem)
{
    if (elem.value == "INICIAR")
	elem.value = "DETENER";

    else if (elem.value == "DETENER")
	elem.value = "INICIAR";

}
*/

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


