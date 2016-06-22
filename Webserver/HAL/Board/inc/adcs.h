/*
 * adcs.h
 *
 *  Created on: 06/23/2016
 *      Author: Patricio Bos
 */

#ifndef ADCS_H_
#define ADCS_H_



/*	ADC_CH0 => DAC				*
 * 	ADC_CH1 => ADC0_1 & ADC1_1	*
 *	ADC_CH2 => ADC0_2 & ADC1_2	*
 *	ADC_CH3 => ADC0_3 & ADC1_3	*/

void init_ADCs(void);
uint16_t ADC_Polling_Read(ADC_CHANNEL_T adcChannel);
void App_print_ADC_value(uint16_t data);


#endif /* ADCS_H_ */
