
/*function actuadores() {
	if (document.getElementById("state1").innerHTML == "ENCENDIDO") {
		document.getElementById("state1").focus();
	}	
		

 }
*/

function changeBottonText(elem)
{
    if (elem.value == "INICIAR") 	
	elem.value = "DETENER";

    else if (elem.value == "DETENER") 
	elem.value = "INICIAR";
}

function testAJAX()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("state1").innerHTML = xhttp.responseText;
        }
    };
//    xhttp.open("GET", "ajax.txt", true);
    xhttp.open("GET", "testAJAX.cgi", true);  
  xhttp.send();
}
