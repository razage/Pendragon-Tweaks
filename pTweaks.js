// Checks if the player is mounted and handles the mounted status accordingly
async function checkMountedStatus(actor) {
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
});

// Called when a token is created when an actor is dragged into a scene
Hooks.on("createToken", async (tokenDoc, options, userId) => {
    const actor = tokenDoc.actor;

    if (actor && actor.type === "character") {
        await checkMountedStatus(actor);
    }
});

// Called every time an item is updated on its sheet
Hooks.on("updateItem", async (item, updateData, options, userId) => {
    let actor = item.actor;

    // Ensure the item is inside an actor and that the actor is a character
    if (!actor || actor.type !== "character") return;

    await checkMountedStatus(actor);
});
