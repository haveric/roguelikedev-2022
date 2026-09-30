import Actor from "./Actor";
import Tile from "./Tile";
import Extend from "../util/Extend";
import actorsBaseList from "../../json/actors/_base.json";
import enemiesList from "../../json/actors/enemies.json";
import playerList from "../../json/actors/player.json";
import tilesBaseList from "../../json/tiles/_base.json";
import floorsList from "../../json/tiles/floors.json";
import wallsList from "../../json/tiles/walls.json";
import itemsBaseList from "../../json/items/_base.json";
import amuletsList from "../../json/items/amulets.json";
import beltsList from "../../json/items/belts.json";
import bodyArmorList from "../../json/items/bodyArmor.json";
import bootsList from "../../json/items/boots.json";
import glovesList from "../../json/items/gloves.json";
import helmetsList from "../../json/items/helmets.json";
import potionsList from "../../json/items/potions.json";
import ringsList from "../../json/items/rings.json";
import scrollsList from "../../json/items/scrolls.json";
import shieldsList from "../../json/items/shields.json";
import torchesList from "../../json/items/torches.json";
import weaponsList from "../../json/items/weapons.json";
import Item from "./Item";

class EntityLoader {
    constructor() {
        this.types = new Map();
        this.templates = new Map();

        this.init();
    }

    init() {
        this.load(new Actor());
        this.load(new Tile());
        this.load(new Item());

        this.loadTemplates();
    }

    load(entity) {
        this.types.set(entity.type, entity);
    }

    create(json, args = {}) {
        let parsedJson;
        if (typeof json === "object") {
            parsedJson = json;
        } else {
            parsedJson = JSON.parse(json);
        }

        if (parsedJson.extends !== undefined) {
            if (this.templates.has(parsedJson.extends)) {
                const template = JSON.parse(this.templates.get(parsedJson.extends));

                delete parsedJson["extends"];
                return this.create(Extend.deep(template, parsedJson), args);
            } else {
                console.error("Json template for id '" + parsedJson.extends + "' is missing. Cannot extend from it.");
            }
        }

        const entity = this.types.get(parsedJson.type);
        const newEntity = new entity.constructor(Extend.deep(parsedJson, args));
        const equippable = newEntity.getComponent("equippable");
        if (equippable) {
            if (equippable.minDamage !== 0 || equippable.maxDamage !== 0) {
                newEntity.description += "\nDamage: " + equippable.getDamageDisplay();
            }
            if (equippable.power !== 0) {
                newEntity.description += "\nPower: +" + equippable.power;
            }
            if (equippable.defense !== 0) {
                newEntity.description += "\nDefense: +" + equippable.defense;
            }
            if (equippable.health !== 0) {
                newEntity.description += "\nHealth: +" + equippable.health;
            }
            if (equippable.lightRadius !== 0) {
                newEntity.description += "\nLight Radius: +" + equippable.lightRadius;
            }
        }
        return newEntity;
    }

    createFromTemplate(id, args = {}) {
        if (this.templates.has(id)) {
            return this.create(this.templates.get(id), args);
        } else {
            console.error("Json template for id '" + id + "' is missing.");
            return null;
        }
    }

    loadTemplate(entities) {
        for (const entity of entities) {
            const id = entity.id;
            if (this.templates.has(id)) {
                console.error("Template for entity id '" + id + "' already exists.");
            } else {
                this.templates.set(id, JSON.stringify(entity));
            }
        }
    }

    loadTemplates() {
        this.loadTemplate(actorsBaseList);
        this.loadTemplate(enemiesList);
        this.loadTemplate(playerList);

        this.loadTemplate(tilesBaseList);
        this.loadTemplate(floorsList);
        this.loadTemplate(wallsList);

        this.loadTemplate(itemsBaseList);
        this.loadTemplate(amuletsList);
        this.loadTemplate(beltsList);
        this.loadTemplate(bodyArmorList);
        this.loadTemplate(bootsList);
        this.loadTemplate(glovesList);
        this.loadTemplate(helmetsList);
        this.loadTemplate(potionsList);
        this.loadTemplate(ringsList);
        this.loadTemplate(scrollsList);
        this.loadTemplate(shieldsList);
        this.loadTemplate(torchesList);
        this.loadTemplate(weaponsList);
    }
}

const entityLoader = new EntityLoader();
export default entityLoader;