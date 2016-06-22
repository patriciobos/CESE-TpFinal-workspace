/*
 * adcs.c
 *
 *  Created on: 12/11/2015
 *      Author: Juan Manuel Cruz
 */

#include "chip.h"
#include "adcs.h"
#include "board_api.h"


#define _ADC_CHANNLE ADC_CH3
#define _LPC_ADC_ID LPC_ADC0
#define _LPC_ADC_IRQ ADC0_IRQn

static ADC_CLOCK_SETUP_T ADCSetup;


void init_ADCs(void){

	/*ADC Init */
	Chip_ADC_Init(_LPC_ADC_ID, &ADCSetup);
//	Chip_ADC_EnableChannel(_LPC_ADC_ID, ADC_CH2, ENABLE);

//	Chip_ADC_EnableChannel(_LPC_ADC_ID, ADC_CH3, ENABLE);
}

/* Polling routine for ADC example */
uint16_t ADC_Polling_Read(ADC_CHANNEL_T adcChannel)
{
	uint16_t dataADC;

	ADC_CHANNEL_T channel = adcChannel;

	Chip_ADC_EnableChannel(_LPC_ADC_ID, channel, ENABLE);

	/* Select using burst mode or not */
	Chip_ADC_SetBurstCmd(_LPC_ADC_ID, DISABLE);

	/* Get  adc value  */
	/* Start A/D conversion if not using burst mode */
	Chip_ADC_SetStartMode(_LPC_ADC_ID, ADC_START_NOW, ADC_TRIGGERMODE_RISING);

	/* Waiting for A/D conversion complete */
	while (Chip_ADC_ReadStatus(_LPC_ADC_ID, channel, ADC_DR_DONE_STAT) != SET) {}
	/* Read ADC value */
	Chip_ADC_ReadValue(_LPC_ADC_ID, channel, &dataADC);

	Chip_ADC_EnableChannel(_LPC_ADC_ID, channel, DISABLE);

	return dataADC;

}

/* Print ADC value and delay */
void App_print_ADC_value(uint16_t data)
{
	volatile uint32_t j;
	j = 5000000;
	DEBUGOUT("ADC value is : 0x%04x\r\n", data);
	/* Delay */
	while (j--) {}
}
