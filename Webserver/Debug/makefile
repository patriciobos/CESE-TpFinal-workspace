################################################################################
# Automatically-generated file. Do not edit!
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include lwIP/src/netif/subdir.mk
-include lwIP/src/core/ipv4/subdir.mk
-include lwIP/src/core/subdir.mk
-include lwIP/src/arch/subdir.mk
-include lwIP/src/api/subdir.mk
-include freeRTOS/src/subdir.mk
-include Httpserver/src/subdir.mk
-include HAL/Chip/src/subdir.mk
-include HAL/Board/src/subdir.mk
-include HAL/Base/subdir.mk
-include Control/src/subdir.mk
-include subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
endif

-include ../makefile.defs

# Add inputs and outputs from these tool invocations to the build variables 

# All Target
all: Webserver.axf

# Tool invocations
Webserver.axf: $(OBJS) $(USER_OBJS)
	@echo 'Building target: $@'
	@echo 'Invoking: MCU Linker'
	arm-none-eabi-gcc -nostdlib -Xlinker -Map="Webserver.map" -Xlinker --gc-sections -mcpu=cortex-m4 -mfpu=fpv4-sp-d16 -mfloat-abi=softfp -mthumb -T "Webserver_Debug.ld" -o "Webserver.axf" $(OBJS) $(USER_OBJS) $(LIBS)
	@echo 'Finished building target: $@'
	@echo ' '
	$(MAKE) --no-print-directory post-build

# Other Targets
clean:
	-$(RM) $(EXECUTABLES)$(OBJS)$(C_DEPS) Webserver.axf
	-@echo ' '

post-build:
	-@echo 'Performing post-build steps'
	-arm-none-eabi-size "Webserver.axf"; # arm-none-eabi-objcopy -v -O binary "Webserver.axf" "Webserver.bin" ; # checksum -p LPC4337 -d "Webserver.bin";
	-@echo ' '

.PHONY: all clean dependents
.SECONDARY: post-build

-include ../makefile.targets
