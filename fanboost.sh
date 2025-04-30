PWM1_ENABLE_STATUS=$(cat /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable)

# Check the current status and toggle it
if [[ $PWM1_ENABLE_STATUS -eq "2" ]]; then
    echo "0" | sudo tee /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable > /dev/null
    echo "Fan boost on"
else
    echo "2" | sudo tee /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable > /dev/null
    echo "Fan boost off"
fi
