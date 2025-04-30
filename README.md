# Beastmode

This gnome-shell extension allows you to run the fan at full speed with a button click.

## Compatibility

This script has very much NOT BEEN TESTED ON ANY MACHINE OTHER THAN MINE. So far it's only confirmed to work in the Victus 15 fb-1xxx models and Victus 15 fa-1xxx models. Any use of this script is done AT YOUR OWN RISK and it is assumed you take responsibility for any possible hardware damage.

## Usage

You can run the script with 2 ways:

1. **Using the gnome-shell extension**: The extension adds a button to the top bar of your GNOME desktop environment. Clicking this button will toggle the fan speed between normal and full speed.
2. **Using the command line**: You can run the script directly from the command line. Open a terminal and run the following command:

   ```bash
   ./fanboost.sh
   ```

   This will toggle the fan speed between normal and full speed.

## Prerequisites

add the following to your sudoers file:

```bash
<your_username> ALL=(ALL:ALL) NOPASSWD: /usr/bin/tee /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable
```

Replace `<your_username>` with your actual username.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SamriddhVermaSRM/victus-fanboost.git
   cd victus-fanboost
   ```

2. Install the extension:
   ```bash
   make install
   ```
3. Restart the gnome-shell:
   ```text
   alt+f2
   write restart and press enter
   ```
4. Enable the extension:

   ```bash
    gnome-extensions enable beastmode@sam
   ```

5. You can also enable the extension using the GNOME Extensions app or GNOME Tweaks.
