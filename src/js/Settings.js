export default class Settings {
    constructor() {
        this.autosavesEnabled = true;
        this.autosaveAmount = 3;
        this.autosaveTurns = 100;

        this.load();
    }

    load() {
        const settings = localStorage.getItem("settings");
        if (settings) {
            const json = JSON.parse(settings);
            if (json.autosavesEnabled !== undefined) {
                this.autosavesEnabled = json.autosavesEnabled;
            }
            if (json.autosaveAmount !== undefined) {
                this.autosaveAmount = json.autosaveAmount;
            }
            if (json.autosaveTurns !== undefined) {
                this.autosaveTurns = json.autosaveTurns;
            }
        }
    }

    save() {
        const toSave = {
            autosavesEnabled: this.autosavesEnabled,
            autosaveAmount: this.autosaveAmount,
            autosaveTurns: this.autosaveTurns,
        };

        localStorage.setItem("settings", JSON.stringify(toSave));
    }
}