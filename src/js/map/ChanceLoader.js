import cave from "../../json/generation/cave.json";

class ChanceLoader {
    constructor() {
        this.entityGroups = new Map();

        this.generators = new Map();

        this.loadGenerator(cave);
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
        const chances = this.getChancesForLevel(name, level);
        const actors = chances.actors;

        let actorOrGroup = this.getRandomFromGroup(actors);
        while (actorOrGroup.group !== undefined) {
            const actorGroup = this.entityGroups.get(actorOrGroup.group);
            actorOrGroup = this.getRandomFromGroup(actorGroup);
        }

        return actorOrGroup.id;
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