/*
 * http_cgi.c
 *
 *  Created on: 24 de may. de 2016
 *      Author: pato
 */


#include "http_cgi.h"
#include "httpd.h"
#include "actuators.h"
#include "alarms.h"

#include "board_api.h"

tCGI cgi_handlers[]={
		{"/actuadores.cgi",actuatorsHandler},
		{"/alarmas.cgi",alarmsHandler}
};
tCGI * ptrCGIHandlers;


//Initialise cgi environment
int CGI_init( void) {

//	cgi_handler.pcCGIName = "/actuadores.cgi";
//
//	cgi_handler.pfnCGIHandler = actuatorsHandler;

	http_set_cgi_handlers(cgi_handlers, 2);

	DEBUGSTR("httpCGIHandler initialized............[OK]\r\n");

	return 0;
}
