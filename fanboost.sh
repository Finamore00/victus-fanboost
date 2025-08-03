#!/usr/bin/bash

# Get the current status of pwm1_enable
PWM1_ENABLE_STATUS=$(cat /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable)

# Check the current status and toggle it
if [[ $PWM1_ENABLE_STATUS -eq "2" ]]; then
    echo "0" > /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable
else
    echo "2" > /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable
fi
