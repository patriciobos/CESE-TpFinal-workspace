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


/** Initialize the CGI environment
 *	This function registers the pairs of file's name and CGI function for the HTTPD server
 * @returns nothing*/
void initCGIs( void) {

	http_set_cgi_handlers(cgi_handlers, (sizeof (cgi_handlers) / sizeof (tCGI) ) );

	DEBUGSTR("httpCGIHandlers registered...............[OK]\r\n");

	return;
}
