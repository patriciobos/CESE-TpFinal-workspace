/*
 * alarms.c
 *
 *  Created on: 6 de jun. de 2016
 *      Author: pato
 */

#include "include.h"
#include "lpc_types.h"

#include "board.h"

#include "FreeRTOS.h"

#include "actuators.h"
#include "sensors.h"
#include "alarms.h"


state_t alarmState[4] = {OFF,OFF,OFF,OFF};
FunctionalState alarmControl[4] = {DISABLE, DISABLE, DISABLE, DISABLE};

extern volatile uint8_t sensorNivelAgua;
extern volatile uint8_t sensorTemperatura;
extern volatile uint8_t sensorPh;


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


char* getAlarmControl(uint8_t alarmNum){

	char * AlarmControlState;

	//todo: por defecto habilita el control.  REVISAR LA SEGURIDAD
	if(DISABLE == alarmControl[alarmNum])
		return AlarmControlState = "DISABLE";
	else
		return AlarmControlState = "ENABLE";
}


void vAlarmControl(void *pvParameters){

	volatile portTickType periodo = 1000/portTICK_RATE_MS;

//	volatile uint16_t data0, data1, data2, data3;

	UBaseType_t uxHighWaterMark;


	while(1){

		portTickType ticks = xTaskGetTickCount();

		/*---------------------------------------------*/
		/*-------------------ALARMA1-------------------*/
		/*---------------------------------------------*/
		if ( sensorNivelAgua >= ALARM1_THRESHOLD_MAX ){
			setAlarmState(alarmNum_1);
		}
		else {
			clearAlarmState(alarmNum_1);
		}

		/*---------------------------------------------*/
		/*-------------------ALARMA2-------------------*/
		/*---------------------------------------------*/
		if ( sensorNivelAgua <= ALARM2_THRESHOLD_MIN ){
			setAlarmState(alarmNum_2);
		}
		else {
			clearAlarmState(alarmNum_2);
		}

		/*---------------------------------------------*/
		/*-------------------ALARMA3-------------------*/
		/*---------------------------------------------*/
		if ( sensorTemperatura >= ALARM3_THRESHOLD_MAX ){
			setAlarmState(alarmNum_3);
		}
		else if ( sensorTemperatura <= ALARM3_THRESHOLD_MIN ) {
			setAlarmState(alarmNum_3);
		}
		else {
			clearAlarmState(alarmNum_3);
		}

		/*---------------------------------------------*/
		/*-------------------ALARMA4-------------------*/
		/*---------------------------------------------*/
		if ( sensorPh >= ALARM4_THRESHOLD_MAX ){
			setAlarmState(alarmNum_4);
		}
		else if ( sensorPh <= ALARM4_THRESHOLD_MIN ) {
			setAlarmState(alarmNum_4);
		}
		else {
			clearAlarmState(alarmNum_4);
		}

//		data0 = readAdc(adc[0]);
//		data1 = readAdc(adc[1]);
//		data2 = readAdc(adc[2]);
//		data3 = readAdc(ADC_CH3);

//		DEBUGOUT("data0    : %d\r\n", data0);
//		DEBUGOUT("data1    : %d\r\n", data1);
//		DEBUGOUT("data2    : %d\r\n", data2);
//		DEBUGOUT("data3    : %d\r\n", data3);

		/* Inspect our own high water mark on entering the task. */
		uxHighWaterMark = uxTaskGetStackHighWaterMark( NULL );

		vTaskDelayUntil(&ticks,periodo);




	}
	return;
}




const char *alarmsHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]) {

	uint8_t index;
	char tmpBuff[8];

	for(index = 0; index < ALARMS_NUMBER; index ++){

		sprintf(tmpBuff, "alarma%u", index+1);

		if( strncmp(pcParam[index], tmpBuff, 7) == 0)
		{
			if( strcmp(pcValue[index], "disable") == 0)
				alarmControl[index] = DISABLE;
			else if( strcmp(pcValue[index], "enable") == 0)
				alarmControl[index] = ENABLE;

		};

	}


	return "/index.shtml";
}
