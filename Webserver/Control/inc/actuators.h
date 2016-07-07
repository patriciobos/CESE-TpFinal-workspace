/*
 * actuators.h
 *
 *  Created on: 23 de may. de 2016
 *      Author: pato
 */

#ifndef INC_ACTUATORS_H_
#define INC_ACTUATORS_H_

#include "include.h"

enum {
	portNum_0 = 0,
	portNum_1,
	portNum_2,
	portNum_3,
	portNum_4,
	portNum_5
};

enum {
	pumpIn = 0,
	pumpOut,
	heat,
	light1,
	light2,
	CO2
};

#define MAX_ACTUATOR_NUMBER 6


void initActuators(void);

state_t getActuatorState(int portNum);

char* getActuatorCharState(int portNum);

void toggleActuatorState(int portNum);

const char *actuatorsHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]);
const char *AJAXHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]);

#endif /* INC_ACTUATORS_H_ */
