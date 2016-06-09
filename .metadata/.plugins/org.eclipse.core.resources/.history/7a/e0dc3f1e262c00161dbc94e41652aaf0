/*
 * uarts.h
 *
 *  Created on: 12/11/2015
 *      Author: Juan Manuel Cruz
 */

#ifndef UARTS_H_
#define UARTS_H_


#include "C_API.h"

//#define UARTNum 0
//#define UARTNum 1
//#define UARTNum 2
#define UARTNum 3			/* Use UART3 for EDU CIAA NXP board */


#if (UARTNum == 0)
/* Use UART0 for NGX boards */
#define LPC_UARTX       LPC_USART0
#define UARTx_IRQn      USART0_IRQn
#define UARTx_IRQHandler UART0_IRQHandler
#endif

#if (UARTNum == 1)
/* Use UART1 for LPC-Xpresso boards */
#define LPC_UARTX       LPC_USART1
#define UARTx_IRQn      USART1_IRQn
#define UARTx_IRQHandler UART1_IRQHandler
#endif

#if (UARTNum == 2)
/* Use UART2 "FT232" for EDU CIAA NXP board */
#define LPC_UARTX       LPC_USART2
#define UARTx_IRQn      USART2_IRQn
#define UARTx_IRQHandler UART2_IRQHandler
/* P7.1 to UART2_TxD	*/
#define UARTx_TX_PORT	7
#define UARTx_TX_PIN	1
#define UARTx_TX_MODE	(SCU_MODE_INACT | SCU_MODE_FUNC6)
/* P7.2 to UART2_RxD	*/
#define UARTx_RX_PORT	7
#define UARTx_RX_PIN	2
#define UARTx_RX_MODE	(SCU_MODE_INACT | SCU_MODE_INBUFF_EN | SCU_MODE_ZIF_DIS | SCU_MODE_FUNC6)
#endif

#if (UARTNum == 3)
/* Use UART3 for EDU CIAA NXP board */
#define LPC_UARTX       LPC_USART3
#define UARTx_IRQn      USART3_IRQn
#define UARTx_IRQHandler UART3_IRQHandler
/* P2.3 to UART3_TxD	*/
#define UARTx_TX_PORT	2
#define UARTx_TX_PIN	3
#define UARTx_TX_MODE	(SCU_MODE_INACT | SCU_MODE_FUNC2)
/* P2.4 to UART3_RxD	*/
#define UARTx_RX_PORT	2
#define UARTx_RX_PIN	4
#define UARTx_RX_MODE	(SCU_MODE_INACT | SCU_MODE_INBUFF_EN | SCU_MODE_ZIF_DIS | SCU_MODE_FUNC2)

#endif


void initUarts (LPC_USART_T *pUART);
void configUart (uint32_t baud);
void setUartTx (uint8_t data);
uint8_t getUartData (void);


#endif /* UARTS_H_ */
