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

uint32_t sensorValue[] = {0, 15, 1};

uint32_t sensorLimit[] = {30, 20, 25, 18, 8, 6};


