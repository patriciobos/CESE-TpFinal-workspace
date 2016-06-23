/*
 * http_ssi.c
 *
 *  Created on: 20 de may. de 2016
 *      Author: pato
 */

#include "string.h"
#include "lpc_types.h"

#include "httpd.h"
#include "http_ssi.h"

#include "sensors.h"
#include "alarms.h"
//#include "actuators.h"


extern volatile uint8_t sensorNivelAgua;
extern volatile uint8_t sensorTemperatura;
extern volatile uint8_t sensorPh;

extern uint8_t sensorValue[];

uint16_t SSIHandler( int iIndex, char *pcBuffer, int iBufferLength )
{

	/* Unused parameter. */
	( void ) iBufferLength;

	/* The SSI handler function that generates text depending on the index of
	the SSI tag encountered. */

	char *ptrState;

	switch( iIndex )
	{

	case ssiACT0_INDEX:
		ptrState = getActuatorCharState(portNum_0);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiACT1_INDEX:
		ptrState = getActuatorCharState(portNum_1);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiACT2_INDEX:
		ptrState = getActuatorCharState(portNum_2);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiACT3_INDEX:
		ptrState = getActuatorCharState(portNum_3);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiSENSOR0_INDEX:
		sprintf(pcBuffer,"%u",sensorValue[0]);
		break;

	case ssiSENSOR1_INDEX:
		sensorNivelAgua++;
		sprintf(pcBuffer,"%u",sensorValue[1]);
		break;

	case ssiSENSOR2_INDEX:
		sensorTemperatura++;
		sprintf(pcBuffer,"%u",sensorValue[2]);
		break;

	case ssiALARMA0_INDEX:
		ptrState = getAlarmState(alarmNum_0);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiALARMA1_INDEX:
		ptrState = getAlarmState(alarmNum_1);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiALARMA2_INDEX:
		ptrState = getAlarmState(alarmNum_2);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiALARMA3_INDEX:
		ptrState = getAlarmState(alarmNum_3);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiALARMA4_INDEX:
		ptrState = getAlarmState(alarmNum_4);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiALARMA5_INDEX:
		ptrState = getAlarmState(alarmNum_5);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiCONTROL_ALARMA0_INDEX:
		ptrState = getAlarmControl(alarmNum_0);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiCONTROL_ALARMA1_INDEX:
		ptrState = getAlarmControl(alarmNum_1);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiCONTROL_ALARMA2_INDEX:
		ptrState = getAlarmControl(alarmNum_2);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiCONTROL_ALARMA3_INDEX:
		ptrState = getAlarmControl(alarmNum_3);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiCONTROL_ALARMA4_INDEX:
		ptrState = getAlarmControl(alarmNum_4);
		strcpy( pcBuffer, ptrState );
		break;

	case ssiCONTROL_ALARMA5_INDEX:
		ptrState = getAlarmControl(alarmNum_5);
		strcpy( pcBuffer, ptrState );
		break;

	default:
		strcpy( pcBuffer, "Error" );
		break;
	}

	return strlen( pcBuffer );
}
