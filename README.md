# Victus Fanboost
Bash script for toggling fan boost mode in certain Victus laptops.

# Usage

To use the script, first make sure both the `fanboost.sh` and `fanboost-toggle.sh` scripts have execution (`chmod +x`) permissions under your user.
Afterwards you can enable/disable fanboost by running the `fanboost-toggle.sh` script and inputting your admin credentials in the pop-up polkit password prompt.
It's worth nothing that ussage of the script must be done through the `fanboost-toggle.sh` script and **NOT THE MAIN fanboost.sh SCRIPT**. This is because the `fanboost-toggle.sh` script is the one actually tasked with elevating your permissions to allow you to write to the `pwm1_enable` that controls the laptop's fan speed.

## Password-less execution.
The script has been modified to make use of polkit's `pkexec` instead of raw `sudo`. This change was made so the script could be mapped to keyboard and graphical widgets and still be able to elevate permissions through Polkit's pop-up password prompt instead of silently failing like in the case of a misconfigured sudoers. This however, means configuration for password-less execution is a bit more involved.

### Create Polkit action for fanboost script.
First, create a new Polkit action in the `/usr/share/polkit-1/actions` directory with the following contents:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE policyconfig PUBLIC
 "-//freedesktop//DTD PolicyKit Policy Configuration 1.0//EN"
 "http://www.freedesktop.org/software/polkit/policyconfig-1.dtd">
<policyconfig>

  <action id="dev.Finamore00.victusfanboost">
    <message>Authentication is required to enable fanboost.</message>
    <defaults>
      <allow_any>auth_admin</allow_any>
      <allow_inactive>auth_admin</allow_inactive>
      <allow_active>auth_admin</allow_active>
    </defaults>
    <annotate key="org.freedesktop.policykit.exec.path"> path_to_fanboost.sh </annotate>
  </action>

</policyconfig>
```

Making sure to replace `path_to_fanboost.sh` with the actual location of the `fanboost.sh` script.

### Create Polkit rule to allow your user to execute the action without password
After creating the Polkit action, create a rule in the `/etc/polkit-1/rules.d` directory giving your user permission to enact the action without prompting for a password. The following example rule adds the permission for all members of the wheel group

```
polkit.addRule(function(action, subject) {
	if (action.id == "dev.Finamore00.victusfanboost" &&
	subject.isInGroup("wheel")) {
		return polkit.Result.YES;
	}
});
```

And this one can be used to add the permission to a specific user

```
polkit.addRule(function(action, subject) {
	if (action.id == "dev.Finamore00.victusfanboost" &&
	subject.user == "your_awesome_username") {
		return polkit.Result.YES;
	}
});
```

# Compatible Devices

This script has very much NOT BEEN TESTED ON ANY MACHINE OTHER THAN MINE. So far it's only confirmed to work in the Victus 15 fb-1xxx  and Victus 15-fa0xxx models. Any use of this script is done AT YOUR OWN RISK and it is assumed you take responsibility for any possible hardware damage.
