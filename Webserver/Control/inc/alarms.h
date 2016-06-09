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

#define ALARM1_THRESHOLD 7
#define ALARM2_THRESHOLD 3
#define ALARM3_THRESHOLD 7
#define ALARM4_THRESHOLD 9

//typedef enum alarmControl {DISABLE = 0, ENABLE = !DISABLE} alarmControl_t;

char* getAlarmState(uint8_t alarmNum);

void toggleAlarmState(uint8_t alarmNum);

void setAlarmState(uint8_t alarmNum);

void clearAlarmState(uint8_t alarmNum);

void vAlarmHandler(void *pvParameters);

#endif /* INC_ALARMS_H_ */
