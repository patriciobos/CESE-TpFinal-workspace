/*----------------------------------------------------------*/
/* Definición de variables globales para insertar en el HTML*/
/*----------------------------------------------------------*/

#include "include.h"
#include "actuators.h"
#include "string.h"
#include "lpc_types.h"


state_t actuatorState[MAX_ACTUATOR_NUMBER];

state_t getActuatorState(int portNum){

	return actuatorState[portNum];
}

char* getActuatorCharState(int portNum){

	char *ptrActuatorState;

	if(OFF == actuatorState[portNum])
		return ptrActuatorState = "APAGADO";	//(char *) estadoActuadorApagado;
	else
		return ptrActuatorState = "ENCENDIDO";	//(char *) estadoActuadorEncendido;

}

void initActuators(void){

	uint8_t index;

	for (index = 0; index < MAX_ACTUATOR_NUMBER ; index++) {
		actuatorState[index] = OFF;
	}
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

	for (i=0; i < MAX_ACTUATOR_NUMBER; i++) {

		sprintf(tmpBuff,"cmd%u",i);

		if( strcmp(pcParam[0], tmpBuff) == 0)
		{
			if( strcmp(pcValue[0], "INICIAR") == 0)
				actuatorState[i] = ON;
			else if ( strcmp(pcValue[0], "DETENER") == 0)
				actuatorState[i] = OFF;
		}
	}

	return "/control.shtml";
}

