/*
 * http_ssi.h
 *
 *  Created on: 20 de may. de 2016
 *      Author: pato
 */

#ifndef INC_HTTP_SSI_H_
#define INC_HTTP_SSI_H_

#include "lpc_types.h"
#include "actuators.h"

uint16_t SSIHandler( int iIndex, char *pcBuffer, int iBufferLength );

/* Definitions of the various SSI callback functions within the pccSSITags
array.  If pccSSITags is updated, then these definitions must also be updated. */
enum {
	ssiACT0_INDEX = 0,
	ssiACT1_INDEX,
	ssiACT2_INDEX,
	ssiACT3_INDEX,
	ssiSENSOR0_INDEX,
	ssiSENSOR1_INDEX,
	ssiSENSOR2_INDEX,
	ssiALARMA0_INDEX,
	ssiALARMA1_INDEX,
	ssiALARMA2_INDEX,
	ssiALARMA3_INDEX,
	ssiALARMA4_INDEX,
	ssiALARMA5_INDEX,
	ssiCONTROL_ALARMA0_INDEX,
	ssiCONTROL_ALARMA1_INDEX,
	ssiCONTROL_ALARMA2_INDEX,
	ssiCONTROL_ALARMA3_INDEX,
	ssiCONTROL_ALARMA4_INDEX,
	ssiCONTROL_ALARMA5_INDEX
};


/* The SSI strings that are embedded in the served html files.  If this array
is changed, then the index position defined by the #defines such as
ssiACT1_INDEX above must also be updated. */
static const char *pccSSITags[] =
{
	"act0",
	"act1",
	"act2",
	"act3",
	"sensor0",
	"sensor1",
	"sensor2",
	"alarma0",
	"alarma1",
	"alarma2",
	"alarma3",
	"alarma4",
	"alarma5",
	"ctrlAlrm0",
	"ctrlAlrm1",
	"ctrlAlrm2",
	"ctrlAlrm3",
	"ctrlAlrm4",
	"ctrlAlrm5"
};



#endif /* INC_HTTP_SSI_H_ */
