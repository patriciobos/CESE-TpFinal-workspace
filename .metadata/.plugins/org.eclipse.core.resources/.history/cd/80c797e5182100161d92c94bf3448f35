/*
 * http_ssi.c
 *
 *  Created on: 20 de may. de 2016
 *      Author: pato
 */


#include "http_ssi.h"
#include "httpd.h"
#include "lpc_types.h"
#include "string.h"




uint16_t SSIHandler( int iIndex, char *pcBuffer, int iBufferLength )
{

	/* Unused parameter. */
	( void ) iBufferLength;

	/* The SSI handler function that generates text depending on the index of
	the SSI tag encountered. */

	switch( iIndex )
	{

	case ssiACT1_INDEX:
		strcpy( pcBuffer, "state1" );
		break;

	case ssiACT2_INDEX:
		strcpy( pcBuffer, "state2" );
		break;

	case ssiACT3_INDEX:
		strcpy( pcBuffer, "state3" );
		break;

	case ssiACT4_INDEX:
		strcpy( pcBuffer, "state4" );
		break;

	case ssiSENSOR1_INDEX:
		strcpy( pcBuffer, "value1" );
		break;

	case ssiSENSOR2_INDEX:
		strcpy( pcBuffer, "value2" );
		break;

	case ssiSENSOR3_INDEX:
		strcpy( pcBuffer, "value3" );
		break;

	case ssiALARMA1_INDEX:
		strcpy( pcBuffer, "alarm1" );
		break;

	case ssiALARMA2_INDEX:
		strcpy( pcBuffer, "alarm2" );
		break;

	case ssiALARMA3_INDEX:
		strcpy( pcBuffer, "alarm3" );
		break;

	default:
		strcpy( pcBuffer, "Hola" );
		break;
	}

	return strlen( pcBuffer );
}
