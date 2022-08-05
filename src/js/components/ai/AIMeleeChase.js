import _AI from "./_AI";
import CustomFov from "../../map/fov/CustomFov";
import MeleeAction from "../../actions/actionWithDirection/MeleeAction";
import WanderAction from "../../actions/WanderAction";
import BumpAction from "../../actions/actionWithDirection/BumpAction";
import WaitAction from "../../actions/WaitAction";
import engine from "../../Engine";

export default class AIMeleeChase extends _AI {
    constructor(args = {}) {
        super(args, "aiMeleeChase");

        this.fov = new CustomFov();
        this.chaseLocation = null;

        this.radius = 5;
        this.movementActions = 1;
        this.currentMovement = 0;

        if (this.hasComponent()) {
            this.radius = this.loadArg("radius", 5);
            this.movementActions = this.loadArg("movementActions", 1);
            this.currentMovement = this.loadArg("currentMovement", 0);
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {
            aiMeleeChase: {}
        };

        if (this.radius !== 5) {
            saveJson.aiMeleeChase.radius = this.radius;
        }

        if (this.movementActions !== 1) {
            saveJson.aiMeleeChase.movementActions = this.movementActions;
        }

        if (this.currentMovement !== 0) {
            saveJson.aiMeleeChase.currentMovement = this.currentMovement;
        }

        this.cachedSave = saveJson;
        return saveJson;
    }

    perform() {
        const entity = this.parentEntity;
        const entityHex = entity.getComponent("hex");
        if (entityHex) {
            this.fov.compute(entity, this.radius);

            let closestEnemies = [];
            let closestDistance = null;
            const entityFaction = entity.getComponent("faction");
            if (entityFaction) {
                for (const actor of this.fov.visibleActors) {
                    if (actor.isAlive()) {
                        const actorFaction = actor.getComponent("faction");
                        if (entityFaction.isEnemyOf(actorFaction)) {
                            const actorHex = actor.getComponent("hex");
                            if (actorHex) {
                                const distance = entityHex.distanceTo(actorHex);
                                if (closestDistance === null || distance < closestDistance) {
                                    closestEnemies = [];
                                    closestEnemies.push(actor);
                                    closestDistance = distance;
                                } else if (distance === closestDistance) {
                                    closestEnemies.push(actor);
                                }
                            }
                        }
                    }
                }
            }

            let closestEnemy;
            if (closestEnemies.length === 1) {
                closestEnemy = closestEnemies[0];
            } else if (closestEnemies.length > 1) {
                const index = Math.floor(Math.random() * closestEnemies.length);
                closestEnemy = closestEnemies[index];
            }

            if (closestEnemy) {
                const closestEnemyHex = closestEnemy.getComponent("hex");
                this.chaseLocation = {
                    row: closestEnemyHex.row,
                    col: closestEnemyHex.col,
                    q: closestEnemyHex.q,
                    r: closestEnemyHex.r
                };

                if (closestDistance <= 1) {
                    return new MeleeAction(this.parentEntity, closestEnemyHex.q - entityHex.q, closestEnemyHex.r - entityHex.r).perform();
                }
            } else {
                if (this.chaseLocation !== null) {
                    // Reached chase location
                    if (this.chaseLocation.q === entityHex.q && this.chaseLocation.r === entityHex.r) {
                        this.chaseLocation = null;
                    }
                }

                if (this.chaseLocation === null) {
                    return new WanderAction(this.parentEntity).perform();
                }
            }

            this.currentMovement += this.movementActions;

            if (this.currentMovement >= 1) {
                // Move towards enemy
                const costGraph = this.fov.getCostGraph();
                const path = this.fov.getPath(costGraph, entityHex, this.chaseLocation);

                let lastAction;
                while (this.currentMovement >= 1) {
                    if (path && path.length > 0) {
                        const next = path.shift();

                        if (next) {
                            const newRow = next.row + this.fov.left;// - entityHex.row;
                            const newCol = next.col + this.fov.top;// - entityHex.col;
                            const nextTile = engine.gameMap.getTileFromArrayCoords(newRow, newCol);
                            const nextTileHex = nextTile.getComponent("hex");
                            const dq = nextTileHex.q - entityHex.q;
                            const dr = nextTileHex.r - entityHex.r;
                            lastAction = new BumpAction(entity, dq, dr).perform();
                        }
                    } else {
                        lastAction = new WaitAction(entity).perform();
                    }

                    this.currentMovement -= 1;
                }

                return lastAction;
            }
        }
    }
}