export default function registerSystemSettings() {
    game.settings.register("pendragon-tweaks", "eraseDefaultStatuses", {
        name: game.i18n.localize(
            "pendragon-tweaks.settings.eraseStatusEffects.label"
        ),
        hint: game.i18n.localize(
            "pendragon-tweaks.settings.eraseStatusEffects.desc"
        ),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false,
    });
}
