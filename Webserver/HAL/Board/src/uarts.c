/* uarts.c
 *
 *  Created on: 12/11/2015
 *      Author: Juan Manuel Cruz
 */


#include "uarts.h"


/* Transmit and receive ring buffers */
static RINGBUFF_T txring, rxring;

/* Transmit and receive ring buffer sizes */
#define UART_SRB_SIZE 128	/* Send */
#define UART_RRB_SIZE 32	/* Receive */

/* Transmit and receive buffers */
static uint8_t rxbuff[UART_RRB_SIZE], txbuff[UART_SRB_SIZE];


void configUart (uint32_t baud)
{
	/* Setup UART for baud-8-N1 */
	Chip_UART_Init (LPC_UARTX);
	Chip_UART_SetBaud (LPC_UARTX, baud);
	Chip_UART_ConfigData (LPC_UARTX, (UART_LCR_WLEN8 | UART_LCR_SBS_1BIT));
	Chip_UART_SetupFIFOS (LPC_UARTX, (UART_FCR_FIFO_EN | UART_FCR_TRG_LEV2));
	Chip_UART_TXEnable (LPC_UARTX);

	/* Before using the ring buffers, initialize them using the ring
	   buffer init function */
	RingBuffer_Init (&rxring, rxbuff, 1, UART_RRB_SIZE);
	RingBuffer_Init (&txring, txbuff, 1, UART_SRB_SIZE);

	/* Reset and enable FIFOs, FIFO trigger level 3 (14 chars) */
	Chip_UART_SetupFIFOS (LPC_UARTX, (UART_FCR_FIFO_EN | UART_FCR_RX_RS |
							UART_FCR_TX_RS | UART_FCR_TRG_LEV3));

	/* Enable receive data and line status interrupt */
	Chip_UART_IntEnable (LPC_UARTX, (UART_IER_RBRINT | UART_IER_RLSINT));

	/* preemption = 1, sub-priority = 1 */
	NVIC_SetPriority (UARTx_IRQn, 1);
	NVIC_EnableIRQ (UARTx_IRQn);
}


void setUartTx(uint8_t data)
{
	Chip_UART_SendRB (LPC_UARTX, &txring, &data, 1);
}


uint8_t getUartData(void)
{
	uint8_t data;

	Chip_UART_ReadRB (LPC_UARTX, &rxring, &data, 1);

	return data;
}


void initUarts(LPC_USART_T *pUART)
{
	Chip_SCU_PinMuxSet (UARTx_TX_PORT, UARTx_TX_PIN, UARTx_TX_MODE);
	Chip_SCU_PinMuxSet (UARTx_RX_PORT, UARTx_RX_PIN, UARTx_RX_MODE);
}


/**
 * @brief	UART interrupt handler using ring buffers
 * @return	Nothing
 */
void UARTx_IRQHandler(void)
{
	/* Want to handle any errors? Do it here. */

	/* Use default ring buffer handler. Override this with your own
	   code if you need more capability. */
	Chip_UART_IRQRBHandler (LPC_UARTX, &rxring, &txring);
}

