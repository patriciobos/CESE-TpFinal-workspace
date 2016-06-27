var actuadores = new Array(6);
var sensores = new Array(3);
var estadoAlarmas = new Array(6);
var controlAlarmas = new Array(6);

var msUpdateTime = 1500;

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
