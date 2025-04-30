import Gio from 'gi://Gio';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class MyExtension extends Extension {
    gsettings?: Gio.Settings
    menu?: PanelMenu.Button
    action?: Clutter.ClickAction

    enable() {
        this.gsettings = this.getSettings();
        this.menu = new PanelMenu.Button(0.0, this.metadata.name, false);
        // to view more icons, run sudo apt install gtk-3-examples
        // and run gtk3-icon-browser
        const happybtn = new St.Icon({ iconName: 'face-smile-symbolic', style_class: 'system-status-icon' })
        const sadbtn = new St.Icon({ iconName: 'face-sad-symbolic', style_class: 'system-status-icon' })
        // need to add this line to sudoers to be able to run bash scripts without password
        // <your_username> ALL=(ALL:ALL) NOPASSWD: /usr/bin/tee /sys/devices/platform/hp-wmi/hwmon/hwmon*/pwm1_enable
        this.menu.connect('button-press-event', () => {
            try {
                const proc = Gio.Subprocess.new(
                    ['/usr/bin/bash', this.path + '/fanboost.sh'],
                    Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE
                )
                const [success, stdout, stderr] = proc.communicate_utf8(null, null);
                if (proc.get_successful()) {
                    if (stdout.includes('off')) {
                        this.gsettings?.get_boolean('notification') && Main.notify('Beastmode', 'disabled');
                        this.menu?.remove_child(happybtn);
                        this.menu?.add_child(sadbtn);
                    } else {
                        this.gsettings?.get_boolean('notification') && Main.notify('Beastmode', 'enabled');
                        this.menu?.remove_child(sadbtn);
                        this.menu?.add_child(happybtn);
                    }
                }
                else
                    Main.notify('error for extension: beastmode', new String(stderr).toString())
            } catch (error) {
                Main.notify('error for extension: beastmode', new String(error).toString())
            }

        });
        this.menu?.add_child(sadbtn)
        Main.panel.addToStatusArea(this.uuid, this.menu, 0, 'right');
    }

    disable() {
        this.gsettings = undefined;
        this.menu?.destroy();
        this.action = undefined;
    }
}