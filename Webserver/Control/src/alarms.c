/*
 * alarms.c
 *
 *  Created on: 6 de jun. de 2016
 *      Author: pato
 */

#include "include.h"
#include "lpc_types.h"
#include "math.h"

#include "board.h"
#include "adcs.h"

#include "FreeRTOS.h"

#include "actuators.h"
#include "sensors.h"
#include "alarms.h"


state_t alarmState[ALARMs_NUMBER];
FunctionalState alarmControl[ALARMs_NUMBER];

/* flags indica si hay una accion de control en ejecución*/
volatile state_t flags[] = {OFF, OFF, OFF, OFF, OFF, OFF};

//extern volatile uint8_t sensorNivelAgua;
//extern volatile uint8_t sensorTemperatura;
//extern volatile uint8_t sensorPh;

extern uint32_t sensorValue[];
extern uint32_t sensorMaxLimit[];
extern uint32_t sensorMinLimit[];

extern state_t actuatorState[];

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

	volatile portTickType periodo = 1500/portTICK_RATE_MS;

//	volatile uint16_t data0, data1, data2;

	uint8_t i;

	/*inicialización del estado y del control de las alarmas*/
	for (i=0; i < ALARMs_NUMBER; i++) {

		alarmState[i]= OFF;
		alarmControl[i] = DISABLE;
	}

	UBaseType_t uxHighWaterMark;

	//init_ADCs();


	while(1){

		portTickType ticks = xTaskGetTickCount();

		updateStatus();

		controlAcuario();

		/* Inspect our own high water mark on entering the task. */
		uxHighWaterMark = uxTaskGetStackHighWaterMark( NULL );

		vTaskDelayUntil(&ticks,periodo);




	}
	return;
}

/* Lee el valor de los ADCs y actualiza los valores de los sensores
 * aplica la escala correspondiente a cada sensor para dar un valor con unidades.
 * Actualiza el estado de las alarmas.
 * No devuelve ningún valor */

void updateStatus() {

	volatile uint32_t data0, data1, data2, aux;

	uint8_t i;

	/* Leer los sensores conectados a los ADCs*/
	data0 = ADC_Polling_Read(ADC_CH3);
	data1 = ADC_Polling_Read(ADC_CH2);
	data2 = ADC_Polling_Read(ADC_CH1);

	/* Conversiones de escala para los sensores*/

//	data1 = (data1*(30)>>10);


	data0 = 5*(data0*2*20/1024);
	data1 = 5*(((data1*2*(30-16)))/1024)+160;
	data2 = (data2*10*14>>10);

	/* Asignar los valores leidos*/
	sensorValue[0] = data0;
	sensorValue[1] = data1;
	sensorValue[2] = data2;



	/* Actualizar el estado de las alarmas según los nuevos valores leidos*/
	for (i=0; i < SENSORs_NUMBER; i++) {

		if ( sensorValue[i] > sensorMaxLimit[i] ){
			setAlarmState(2*i);
		}
		else {
			clearAlarmState(2*i);
		}

		if ( sensorValue[i] < sensorMinLimit[i] ){
			setAlarmState((2*i)+1);
		}
		else {
			clearAlarmState((2*i)+1);
		}

	}
}


void controlAcuario(){

	state_t actuatorFakeState[ACTUATORs_NUMBER];

	uint8_t i;

	for(i=0; i < ACTUATORs_NUMBER; i++){

		actuatorFakeState[i] = getActuatorState(i);
	}


	/* Control temperature*/
	if (ENABLE == alarmControl[alarmTemp_High]) {

		if(ON == alarmState[alarmTemp_High]){
			actuatorFakeState[heat] = OFF;
			flags[alarmTemp_High] = ON;
		}
		else if (ON == flags[alarmTemp_High]) {
			flags[alarmTemp_High] = OFF;
		}
	}

	if (ENABLE == alarmControl[alarmTemp_Low]) {

		if(ON == alarmState[alarmTemp_Low]){
			actuatorFakeState[heat] = ON;
			flags[alarmTemp_Low] = ON;
		}
		else if (ON == flags[alarmTemp_Low]) {
			actuatorFakeState[heat] = OFF;
			flags[alarmTemp_Low] = OFF;
		}
	}

	/* Control pH*/
	if (ENABLE == alarmControl[alarmPH_High]) {

		if(ON == alarmState[alarmPH_High]){
			actuatorFakeState[CO2] = ON;
			flags[alarmPH_High] = ON;
		}
		else if (ON == flags[alarmPH_High]) {
			actuatorFakeState[CO2] = OFF;
			flags[alarmPH_High] = OFF;
		}
	}

	if (ENABLE == alarmControl[alarmPH_Low]) {

		if(ON == alarmState[alarmPH_Low]){
			actuatorFakeState[CO2] = OFF;
			flags[alarmPH_Low] = ON;
		}
		else if (ON == flags[alarmPH_Low]) {
			flags[alarmPH_Low] = OFF;
		}
	}

	/* if alarmTemp_high OR alarmPH_low are ENABLE checks recycleWater status
	 * and start or stop the pumps. */
	if (ENABLE == (alarmControl[alarmTemp_High] || alarmControl[alarmPH_Low]) ) {
		if( ON == (flags[alarmTemp_High] || flags[alarmPH_Low]) ) {
			actuatorFakeState[pumpIn] = ON;
			actuatorFakeState[pumpOut] = ON;
		}
		else if (OFF == (flags[alarmTemp_High] && flags[alarmPH_Low]) ) {
			actuatorFakeState[pumpIn] = OFF;
			actuatorFakeState[pumpOut] = OFF;
		}
	}
	/* Control Water Level*/
	if (ENABLE == alarmControl[alarmWater_High]) {

		if(ON == alarmState[alarmWater_High]){
			actuatorFakeState[pumpIn] = OFF;
			actuatorFakeState[pumpOut] = ON;
			flags[alarmWater_High] = ON;
		}
		else if (ON == flags[alarmWater_High]) {
			actuatorFakeState[pumpOut] = OFF;
			flags[alarmWater_High] = OFF;
		}
	}

	if (ENABLE == alarmControl[alarmWater_Low]) {

		if(ON == alarmState[alarmWater_Low]){
			actuatorFakeState[pumpIn] = ON;
			actuatorFakeState[pumpOut] = OFF;
			flags[alarmWater_Low] = ON;
		}
		else if (ON == flags[alarmWater_Low]) {
			actuatorFakeState[pumpIn] = OFF;
			flags[alarmWater_Low] = OFF;
		}


	}

	/* Apply changes to actuators*/

	for(i=0; i < ACTUATORs_NUMBER; i++){

		actuatorState[i] = actuatorFakeState[i];
	}
	//DEBUGOUT("%d, %d, %d\r\n", data0, data1, data2);
	DEBUGOUT("%d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d\r\n",
											sensorValue[0],
											sensorValue[1],
											sensorValue[2],
											alarmState[0],
											alarmState[1],
											alarmState[2],
											alarmState[3],
											alarmState[4],
											alarmState[5],
											actuatorState[0],
											actuatorState[1],
											actuatorState[2],
											actuatorState[3],
											actuatorState[4],
											actuatorState[5] );
}

const char *alarmsHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]) {

	uint8_t index;
	char tmpBuff[8];

	for(index = 0; index < ALARMs_NUMBER; index ++){

		sprintf(tmpBuff, "alarma%u", index);

		if( strncmp(pcParam[index], tmpBuff, 7) == 0)
		{
			if( strcmp(pcValue[index], "disable") == 0)
				alarmControl[index] = DISABLE;
			else if( strcmp(pcValue[index], "enable") == 0)
				alarmControl[index] = ENABLE;

		}
	}
	return "/control.shtml";
}
