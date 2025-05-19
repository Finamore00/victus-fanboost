#!/usr/bin/bash

# Get the current status of pwm1_enable
PWM1_ENABLE_STATUS=$(cat /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable)

# Check the current status and toggle it
if [[ $PWM1_ENABLE_STATUS -eq "2" ]]; then
    echo "Enabling fan boost..."
    echo "0" | sudo tee /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable > /dev/null
    echo "Fan boost has been enabled."
    sudo -u piyush DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus notify-send "Fan Boost Enabled"
    #above line sends a notification telling if fanboost has been enabled 

else
    echo "Disabling fan boost..."
    echo "2" | sudo tee /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable > /dev/null
    echo "Fan boost has been disabled."
    sudo -u piyush DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus notify-send "Fan Boost Disabled"
    #above line sends a notification telling if fanboost has been disabled 
fi
