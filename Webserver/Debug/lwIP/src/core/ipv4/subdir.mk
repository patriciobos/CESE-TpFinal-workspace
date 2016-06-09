################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../lwIP/src/core/ipv4/autoip.c \
../lwIP/src/core/ipv4/icmp.c \
../lwIP/src/core/ipv4/igmp.c \
../lwIP/src/core/ipv4/inet.c \
../lwIP/src/core/ipv4/inet_chksum.c \
../lwIP/src/core/ipv4/ip.c \
../lwIP/src/core/ipv4/ip_addr.c \
../lwIP/src/core/ipv4/ip_frag.c 

OBJS += \
./lwIP/src/core/ipv4/autoip.o \
./lwIP/src/core/ipv4/icmp.o \
./lwIP/src/core/ipv4/igmp.o \
./lwIP/src/core/ipv4/inet.o \
./lwIP/src/core/ipv4/inet_chksum.o \
./lwIP/src/core/ipv4/ip.o \
./lwIP/src/core/ipv4/ip_addr.o \
./lwIP/src/core/ipv4/ip_frag.o 

C_DEPS += \
./lwIP/src/core/ipv4/autoip.d \
./lwIP/src/core/ipv4/icmp.d \
./lwIP/src/core/ipv4/igmp.d \
./lwIP/src/core/ipv4/inet.d \
./lwIP/src/core/ipv4/inet_chksum.d \
./lwIP/src/core/ipv4/ip.d \
./lwIP/src/core/ipv4/ip_addr.d \
./lwIP/src/core/ipv4/ip_frag.d 


# Each subdirectory must supply rules for building sources it contributes
lwIP/src/core/ipv4/%.o: ../lwIP/src/core/ipv4/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: MCU C Compiler'
	arm-none-eabi-gcc -D__MULTICORE_NONE -DLWIP_DEBUG -D__USE_LPCOPEN -DDEBUG -D__CODE_RED -DCORE_M4 -D__LPC43XX__ -D__NEWLIB__ -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/Httpserver/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/Control/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/lwIP/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/lwIP/inc/ipv4" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/freeRTOS/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Board/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Chip/inc" -I"/home/pato/Embebidos/TpFinal/Workspaces/TpFinal/Webserver/HAL/Chip/inc/usbd" -O0 -g3 -Wall -c -fmessage-length=0 -fno-builtin -ffunction-sections -fdata-sections -fsingle-precision-constant -mcpu=cortex-m4 -mfpu=fpv4-sp-d16 -mfloat-abi=softfp -mthumb -D__NEWLIB__ -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.o)" -MT"$(@:%.o=%.d)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


