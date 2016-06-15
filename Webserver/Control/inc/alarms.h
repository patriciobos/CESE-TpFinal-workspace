/*
 * alarms.h
 *
 *  Created on: 6 de jun. de 2016
 *      Author: pato
 */

#ifndef INC_ALARMS_H_
#define INC_ALARMS_H_

enum {alarmNum_1 = 0,
	  alarmNum_2,
	  alarmNum_3,
	  alarmNum_4
};

#define ALARMS_NUMBER  4

#define ALARM1_THRESHOLD_MAX 15
#define ALARM2_THRESHOLD_MIN 10
#define ALARM3_THRESHOLD_MAX 22
#define ALARM3_THRESHOLD_MIN 18
#define ALARM4_THRESHOLD_MAX 8
#define ALARM4_THRESHOLD_MIN 6

//typedef enum alarmControl {DISABLE = 0, ENABLE = !DISABLE} alarmControl_t;

char* getAlarmState(uint8_t alarmNum);

void toggleAlarmState(uint8_t alarmNum);

void setAlarmState(uint8_t alarmNum);

void clearAlarmState(uint8_t alarmNum);

char* getAlarmControl(uint8_t alarmNum);

void vAlarmControl(void *pvParameters);

const char *alarmsHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]);

#endif /* INC_ALARMS_H_ */
