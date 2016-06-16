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

#define ALARMs_NUMBER  6

#define ALARM0_THRESHOLD 15
#define ALARM1_THRESHOLD 15
#define ALARM2_THRESHOLD 10
#define ALARM3_THRESHOLD 22
#define ALARM4_THRESHOLD 18
#define ALARM5_THRESHOLD 8


//typedef enum alarmControl {DISABLE = 0, ENABLE = !DISABLE} alarmControl_t;

char* getAlarmState(uint8_t alarmNum);

void toggleAlarmState(uint8_t alarmNum);

void setAlarmState(uint8_t alarmNum);

void clearAlarmState(uint8_t alarmNum);

char* getAlarmControl(uint8_t alarmNum);

void vAlarmControl(void *pvParameters);

const char *alarmsHandler(int iIndex, int iNumParams, char *pcParam[], char *pcValue[]);

#endif /* INC_ALARMS_H_ */
