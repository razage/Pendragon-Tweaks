// Checks for the geniality flag and adds it if it doesn't exist
async function initializeGeniality(actor) {
    if (
        actor.type === "character" &&
        actor.getFlag("pendragon-tweaks", "geniality") === undefined
    ) {
        await actor.setFlag("pendragon-tweaks", "geniality", 0);
    }
}

// Checks if the player is mounted and handles the mounted status accordingly
async function checkMountedStatus(actor) {
    if (actor.type !== "character") return;

    // Get all horse-type items
    let horses = actor.items.filter((item) => item.type === "horse");

    // Check if any horse is equipped
    let hasEquippedHorse = horses.some(
        (horse) => horse.system.equipped === true
    );

    // Get the token linked to this actor (if any)
    let token = actor.getActiveTokens().find((t) => t.isOwner);
    if (!token) return;

    // Apply or remove the status effect
    await token.actor.toggleStatusEffect("mounted-status", {
        active: hasEquippedHorse,
    });
}

// Called once when Foundry is "ready"
Hooks.once("ready", async () => {
    CONFIG.statusEffects.push({
        id: "mounted-status",
        name: game.i18n.localize("pendragon-tweaks.effect.mounted"),
        img: "modules/pendragon-tweaks/icons/mounted-knight.svg",
    });

    // Create a geniality property that I can modify elsewhere
    for (let actor of game.actors) {
        await initializeGeniality(actor);
    }
});

// Called whenever an actor is created
Hooks.on("createActor", async (actor, options, userId) => {
    if (actor.type !== "character") return;

    // Check if the flag is already set (to avoid overriding existing actors)
    if (actor.getFlag("pendragon-tweaks", "geniality") === undefined) {
        await actor.setFlag("pendragon-tweaks", "geniality", 0);
    }
});

// Called every time an item is updated on its sheet
Hooks.on("updateItem", async (item, updateData, options, userId) => {
    let actor = item.actor;
    if (!actor) return; // Ensure the item is inside an actor
    await checkMountedStatus(actor);
});
