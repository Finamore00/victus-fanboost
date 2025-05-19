# Victus Fanboost
Bash script for toggling fan boost mode in certain Victus laptops.

# Usage

The script will automatically read the current setting of the fans and activate or deactivate the boost state accordingly. This script needs sudo privileges in order to be able to write to the fan control file. It is recommended that you give your user sudo permissions to use `tee` on the file without requiring a password. This can be done by adding the following line to your `/etc/sudoers` file:

```
<your_username> ALL=(ALL:ALL) NOPASSWD: /usr/bin/tee /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable
```

# Compatible Devices

This script has very much NOT BEEN TESTED ON ANY MACHINE OTHER THAN MINE. So far it's only confirmed to work in the Victus 15 fb-1xxx  and Victus 15-fa0xxx models. Any use of this script is done AT YOUR OWN RISK and it is assumed you take responsibility for any possible hardware damage.
