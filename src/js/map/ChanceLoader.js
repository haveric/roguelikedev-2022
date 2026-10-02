import entityGroups from "../../json/generation/_entityGroups.json";
import itemGroups from "../../json/generation/_itemGroups.json";
import cave from "../../json/generation/cave.json";

class ChanceLoader {
    constructor() {
        this.entityGroups = new Map();
        this.itemGroups = new Map();
        this.generators = new Map();

        this.loadEntityGroups(entityGroups);
        this.loadItemGroups(itemGroups);

        this.loadGenerator(cave);
    }

    loadEntityGroups(entityGroups) {
        for (const group of entityGroups) {
            this.entityGroups.set(group.id, group.entities);
        }
    }

    loadItemGroups(itemGroups) {
        for (const group of itemGroups) {
            this.itemGroups.set(group.id, group.items);
        }
    }

    loadGenerator(generatorJson) {
        for (const generator of generatorJson) {
            this.generators.set(generator.id, generator.levels);
        }
    }

    getChancesForLevel(name, level) {
        let chances;
        const generator = this.generators.get(name);
        for (const group of generator) {
            if (group.level > level) {
                break;
            }

            chances = group;
        }

        return chances;
    }

    getActorForLevel(name, level) {
        let chances;
        let actors;
        let levelToCheck = level;
        while(levelToCheck > 0 && !actors) {
            chances = this.getChancesForLevel(name, levelToCheck);
            actors = chances.actors;
            levelToCheck --;
        }
        let actorOrGroup = this.getRandomFromGroup(actors);
        while (actorOrGroup.group !== undefined) {
            const actorGroup = this.entityGroups.get(actorOrGroup.group);
            actorOrGroup = this.getRandomFromGroup(actorGroup);
        }

        return actorOrGroup.id;
    }

    getItemForLevel(name, level) {
        let chances;
        let items;
        let levelToCheck = level;
        while(levelToCheck > 0 && !items) {
            chances = this.getChancesForLevel(name, levelToCheck);
            items = chances.items;
            levelToCheck --;
        }

        let itemOrGroup = this.getRandomFromGroup(items);
        while (itemOrGroup.group !== undefined) {
            const itemGroup = this.itemGroups.get(itemOrGroup.group);
            itemOrGroup = this.getRandomFromGroup(itemGroup);
        }

        return itemOrGroup.id;
    }

    getRandomFromGroup(group) {
        let totalWeight = 0;
        for (const chance of group) {
            totalWeight += chance.weight;
        }

        let returnChance;
        let currentWeight = 0;
        const rand = Math.random() * totalWeight;
        for (const chance of group) {
            currentWeight += chance.weight;

            if (rand < currentWeight) {
                returnChance = chance;
                break;
            }
        }

        return returnChance;
    }
}

const chanceLoader = new ChanceLoader();
export default chanceLoader;