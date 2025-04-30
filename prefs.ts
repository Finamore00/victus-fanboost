import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class GnomeRectanglePreferences extends ExtensionPreferences {
    _settings?: Gio.Settings

    fillPreferencesWindow(window: Adw.PreferencesWindow): Promise<void> {
        this._settings = this.getSettings();

        const page = new Adw.PreferencesPage({
            title: _('General'),
            iconName: 'dialog-information-symbolic',
        });

        const animationGroup = new Adw.PreferencesGroup({
            title: _('Beast Mode'),
            description: _('enable fan full speed'),
        });
        page.add(animationGroup);

        const animationEnabled = new Adw.SwitchRow({
            title: _('Full Speed'),
            subtitle: _('Enable or disable full speed'),
        });
        animationGroup.add(animationEnabled);

        window.add(page)

        this._settings!.bind('beast-mode', animationEnabled, 'active', Gio.SettingsBindFlags.DEFAULT);

        return Promise.resolve();
    }
}