/*
 * sensores.c
 *
 *  Created on: 8 de jun. de 2016
 *      Author: pato
 */


#include "sensors.h"
#include "lpc_types.h"

volatile uint8_t sensorNivelAgua = 0;
volatile uint8_t sensorTemperatura = 15;
volatile uint8_t sensorPh = 1;

uint8_t sensorValue[] = {0, 15, 1};

uint8_t sensorMaxLimit[] = {35, 21, 7};
uint8_t sensorMinLimit[] = {30, 17, 7};

