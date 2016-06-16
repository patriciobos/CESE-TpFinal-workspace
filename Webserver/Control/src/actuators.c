/*----------------------------------------------------------*/
/* Definición de variables globales para insertar en el HTML*/
/*----------------------------------------------------------*/

#include "include.h"
#include "actuators.h"
#include "string.h"
#include "lpc_types.h"


state_t actuatorState[4] = {OFF,OFF,OFF,OFF};

char* getActuatorState(int portNum){

	char *ptrActuatorState;

	if(OFF == actuatorState[portNum])
		return ptrActuatorState = "APAGADO";	//(char *) estadoActuadorApagado;
	else
		return ptrActuatorState = "ENCENDIDO";	//(char *) estadoActuadorEncendido;

}

void toggleActuatorState(int portNum){

	if( OFF == actuatorState[portNum])
		actuatorState[portNum] = ON;

	else if(ON == actuatorState[portNum])
		actuatorState[portNum] = OFF;

}

const char *actuatorsHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]) {

	uint8_t i;
	char tmpBuff[5];

	for (i=0; i < ACTUATORs_NUMBER; i++) {

		sprintf(tmpBuff,"cmd%u",i);

		if( strcmp(pcParam[0], tmpBuff) == 0)
		{
			if( strcmp(pcValue[0], "INICIAR") == 0)
				actuatorState[i] = ON;
			else if ( strcmp(pcValue[0], "DETENER") == 0)
				actuatorState[i] = OFF;
		}
	}

//	if( strcmp(pcParam[0], "cmd1") == 0)
//	{
//		if( strcmp(pcValue[0], "INICIAR") == 0)
//			actuatorState[0] = ON;
//		else if ( strcmp(pcValue[0], "DETENER") == 0)
//			actuatorState[0] = OFF;
//	}
//
//	if( strcmp(pcParam[0], "cmd2") == 0)
//	{
//		if( strcmp(pcValue[0], "INICIAR") == 0)
//			actuatorState[1] = ON;
//		else if ( strcmp(pcValue[0], "DETENER") == 0)
//			actuatorState[1] = OFF;
//	}
//
//	if( strcmp(pcParam[0], "cmd3") == 0)
//	{
//		if( strcmp(pcValue[0], "INICIAR") == 0)
//			actuatorState[2] = ON;
//		else if ( strcmp(pcValue[0], "DETENER") == 0)
//			actuatorState[2] = OFF;
//	}
//
//	if( strcmp(pcParam[0], "cmd4") == 0)
//	{
//		if( strcmp(pcValue[0], "INICIAR") == 0)
//			actuatorState[3] = ON;
//		else if ( strcmp(pcValue[0], "DETENER") == 0)
//			actuatorState[3] = OFF;
//	}

	return "/index.shtml";
}

