/*
 * alarms.h
 *
 *  Created on: 6 de jun. de 2016
 *      Author: pato
 */

#ifndef INC_ALARMS_H_
#define INC_ALARMS_H_

enum {alarmNum_0 = 0,
	  alarmNum_1,
	  alarmNum_2,
	  alarmNum_3,
	  alarmNum_4,
	  alarmNum_5
};

enum {
	alarmWater_High = 0,
	alarmWater_Low,
	alarmTemp_High,
	alarmTemp_Low,
	alarmPH_High,
	alarmPH_Low
};

typedef enum{
	IDLE,
	TEMPERATURE,
	pH,
	WATERLEVEL,
	APPLY
} controlFSM;

#define MAX_ALARM_NUMBER  6


char* getAlarmState(uint8_t alarmNum);

void toggleAlarmState(uint8_t alarmNum);

void setAlarmState(uint8_t alarmNum);

void clearAlarmState(uint8_t alarmNum);

char* getAlarmControl(uint8_t alarmNum);

void updateSensors(void);

void updateAlarms(void);

void controlActuators(void);

void vControl(void *pvParameters);

const char *alarmsHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]);

#endif /* INC_ALARMS_H_ */
