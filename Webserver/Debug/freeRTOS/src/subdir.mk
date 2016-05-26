################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../freeRTOS/src/FreeRTOSCommonHooks.c \
../freeRTOS/src/croutine.c \
../freeRTOS/src/event_groups.c \
../freeRTOS/src/heap_4.c \
../freeRTOS/src/list.c \
../freeRTOS/src/port.c \
../freeRTOS/src/queue.c \
../freeRTOS/src/redlib_memfix.c \
../freeRTOS/src/tasks.c \
../freeRTOS/src/timers.c 

OBJS += \
./freeRTOS/src/FreeRTOSCommonHooks.o \
./freeRTOS/src/croutine.o \
./freeRTOS/src/event_groups.o \
./freeRTOS/src/heap_4.o \
./freeRTOS/src/list.o \
./freeRTOS/src/port.o \
./freeRTOS/src/queue.o \
./freeRTOS/src/redlib_memfix.o \
./freeRTOS/src/tasks.o \
./freeRTOS/src/timers.o 

C_DEPS += \
./freeRTOS/src/FreeRTOSCommonHooks.d \
./freeRTOS/src/croutine.d \
./freeRTOS/src/event_groups.d \
./freeRTOS/src/heap_4.d \
./freeRTOS/src/list.d \
./freeRTOS/src/port.d \
./freeRTOS/src/queue.d \
./freeRTOS/src/redlib_memfix.d \
./freeRTOS/src/tasks.d \
./freeRTOS/src/timers.d 


# Each subdirectory must supply rules for building sources it contributes
freeRTOS/src/%.o: ../freeRTOS/src/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: MCU C Compiler'
	arm-none-eabi-gcc -D__MULTICORE_NONE -D__USE_LPCOPEN -DDEBUG -D__CODE_RED -DCORE_M4 -D__LPC43XX__ -D__NEWLIB__ -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/Httpserver/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/Control/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/lwIP/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/lwIP/inc/ipv4" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/freeRTOS/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Board/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Chip/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Chip/inc/usbd" -I"/usr/local/lpcxpresso_8.0.0_526/lpcxpresso/tools/arm-none-eabi/include" -O0 -g3 -Wall -c -fmessage-length=0 -fno-builtin -ffunction-sections -fdata-sections -fsingle-precision-constant -mcpu=cortex-m4 -mfpu=fpv4-sp-d16 -mfloat-abi=softfp -mthumb -D__NEWLIB__ -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.o)" -MT"$(@:%.o=%.d)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


