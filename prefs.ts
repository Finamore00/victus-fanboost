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

        const settingsGroup = new Adw.PreferencesGroup({
            title: _('Settings'),
            description: _('Settings for the extension'),
        });
        page.add(settingsGroup);

        const notificationsToggle = new Adw.SwitchRow({
            title: _('Notification Toggle'),
            subtitle: _('Enable or disable notifications indicator'),
        });
        settingsGroup.add(notificationsToggle);

        window.add(page)

        this._settings!.bind('notification', notificationsToggle, 'active', Gio.SettingsBindFlags.DEFAULT);

        return Promise.resolve();
    }
}