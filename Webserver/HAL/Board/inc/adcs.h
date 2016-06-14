/*
 * adcs.h
 *
 *  Created on: 12/11/2015
 *      Author: Juan Manuel Cruz
 */

#ifndef ADCS_H_
#define ADCS_H_


//#include "C_API.h"

/*	ADC_CH0 => DAC				*
 * 	ADC_CH1 => ADC0_1 & ADC1_1	*
 *	ADC_CH2 => ADC0_2 & ADC1_2	*
 *	ADC_CH3 => ADC0_3 & ADC1_3	*/

// ADCs

#define adc_t	uint8_t
static const adc_t adc[] = {ADC_CH0, ADC_CH1, ADC_CH2, ADC_CH3};


void initAdcs (void);
void initAdc (const adc_t adcNumber);
uint16_t readAdc (const adc_t adcNumber);


#endif /* ADCS_H_ */
