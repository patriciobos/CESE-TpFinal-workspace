/*
 * actuators.h
 *
 *  Created on: 23 de may. de 2016
 *      Author: pato
 */

#ifndef INC_ACTUATORS_H_
#define INC_ACTUATORS_H_


enum {
	portNum_0 = 0,
	portNum_1,
	portNum_2,
	portNum_3
};

#define ACTUATORs_NUMBER 4

char* getActuatorState(int portNum);

void toggleActuatorState(int portNum);

const char *actuatorsHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]);
const char *AJAXHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]);

#endif /* INC_ACTUATORS_H_ */
