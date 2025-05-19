# Victus Fanboost Waybar Module
Waybar module for victus fanboost script.

https://github.com/user-attachments/assets/256bea25-f327-4082-99a6-46ac66a81806

# Usage

- copy the module from the config file and place it within your waybar config 

- replace the ```~/<path to fanboost script>/fanboost.sh``` with the location of the fanboost script on your device 

- replace ```kitty``` with your choice of terminal in the config, make sure your terminal supports usage of ```-e```

The script will automatically read the current setting of the fans and activate or deactivate the boost state accordingly. This script needs sudo privileges in order to be able to write to the fan control file. It is recommended that you give your user sudo permissions to use `tee` on the file without requiring a password. This can be done by adding the following line to your `/etc/sudoers` file:

```
<your_username> ALL=(ALL:ALL) NOPASSWD: /usr/bin/tee /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable
```

The module is currently configured to pop open a terminal on your screen to enter your root password and execute the script. If you follow the above procedure to use tee on the file without requiring a password you will probably need to make a few adjustments to the script's notif-send command

# Compatible Devices

This script has very much NOT BEEN TESTED ON ANY MACHINE OTHER THAN MINE. So far it's only confirmed to work in the Victus 15 fb-1xxx and Victus 15-fa0xxx models. Any use of this script is done AT YOUR OWN RISK and it is assumed you take responsibility for any possible hardware damage.

#

for update or queries regarding the waybar module please reach out to raip7172@gmail.com
