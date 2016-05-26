################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/Board/src/board.c \
../HAL/Board/src/board_sysinit.c \
../HAL/Board/src/lpc_phy_smsc87x0.c 

OBJS += \
./HAL/Board/src/board.o \
./HAL/Board/src/board_sysinit.o \
./HAL/Board/src/lpc_phy_smsc87x0.o 

C_DEPS += \
./HAL/Board/src/board.d \
./HAL/Board/src/board_sysinit.d \
./HAL/Board/src/lpc_phy_smsc87x0.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/Board/src/%.o: ../HAL/Board/src/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: MCU C Compiler'
	arm-none-eabi-gcc -D__MULTICORE_NONE -D__USE_LPCOPEN -DDEBUG -D__CODE_RED -DCORE_M4 -D__LPC43XX__ -D__NEWLIB__ -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/Httpserver/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/Control/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/lwIP/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/lwIP/inc/ipv4" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/freeRTOS/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Board/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Chip/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Chip/inc/usbd" -I"/usr/local/lpcxpresso_8.0.0_526/lpcxpresso/tools/arm-none-eabi/include" -O0 -g3 -Wall -c -fmessage-length=0 -fno-builtin -ffunction-sections -fdata-sections -fsingle-precision-constant -mcpu=cortex-m4 -mfpu=fpv4-sp-d16 -mfloat-abi=softfp -mthumb -D__NEWLIB__ -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.o)" -MT"$(@:%.o=%.d)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


