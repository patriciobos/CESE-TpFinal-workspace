/*
 * alarms.c
 *
 *  Created on: 6 de jun. de 2016
 *      Author: pato
 */

#include "include.h"
#include "lpc_types.h"

#include "FreeRTOS.h"

#include "actuators.h"
#include "sensors.h"
#include "alarms.h"


state_t alarmState[4] = {OFF,OFF,OFF,OFF};
FunctionalState alarmControl[4] = {DISABLE, DISABLE, DISABLE, DISABLE};

extern volatile uint8_t debugInt1;
extern volatile uint8_t debugInt2;
extern volatile uint8_t debugInt3;


char* getAlarmState(uint8_t alarmNum){

	char *ptrAlarmState;

	if(OFF == alarmState[alarmNum])
		return ptrAlarmState = "NORMAL";
	else
		return ptrAlarmState = "ALARMA";

}

void toggleAlarmState(uint8_t alarmNum){

	if( OFF == alarmState[alarmNum])
		alarmState[alarmNum] = ON;

	else if(ON == alarmState[alarmNum])
		alarmState[alarmNum] = OFF;

}

void setAlarmState(uint8_t alarmNum){

	alarmState[alarmNum] = ON;
}

void clearAlarmState(uint8_t alarmNum){

	alarmState[alarmNum] = OFF;
}



void vAlarmHandler(void *pvParameters){

	volatile portTickType periodo = 1000/portTICK_RATE_MS;

	UBaseType_t uxHighWaterMark;


	while(1){

		portTickType ticks = xTaskGetTickCount();

		if ( debugInt1 >= ALARM1_THRESHOLD ){
			setAlarmState(alarmNum_1);
		}
		else
			clearAlarmState(alarmNum_1);

		if ( debugInt1 <= ALARM2_THRESHOLD ){
			setAlarmState(alarmNum_2);
		}
		else
			clearAlarmState(alarmNum_2);


		vTaskDelayUntil(&ticks,periodo);

		/* Inspect our own high water mark on entering the task. */
		uxHighWaterMark = uxTaskGetStackHighWaterMark( NULL );


	}
	return;
}
