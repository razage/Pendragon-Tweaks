const removeStatuses = [
    "fly",
    "silence",
    "shock",
    "corrode",
    "degen",
    "hover",
    "burrow",
    "invisible",
    "target",
    "eye",
    "fireShield",
    "coldShield",
];

let statusEffects = [
    {
        id: "mounted-status",
        name: "pendragon-tweaks.effect.mounted",
        img: "modules/pendragon-tweaks/icons/mounted-knight.svg",
    },
    {
        id: "disarmed-status",
        name: "pendragon-tweaks.effect.disarmed",
        img: "modules/pendragon-tweaks/icons/shattered-sword.svg",
    },
];

export default function createStatusEffects(overwrite = false) {
    let output = CONFIG.statusEffects;

    // If overwrite is enabled, just replace all the default effects
    if (overwrite) {
        output = output.filter((effect) => !removeStatuses.includes(effect.id));
        console.log("after filtering: ", output);
    }

    // Apply localization and append to the output
    statusEffects.forEach((effect) => {
        effect.name = game.i18n.localize(effect.name);
        output.push(effect);
    });

    // Send all the status effects to the Config
    CONFIG.statusEffects = output;
}
