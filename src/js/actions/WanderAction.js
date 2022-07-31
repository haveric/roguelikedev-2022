import _Action from "./_Action";
import WaitAction from "./WaitAction";
import MovementAction from "./actionWithDirection/MovementAction";

export default class WanderAction extends _Action {
    constructor(entity) {
        super(entity);
    }

    perform() {
        const direction = Math.floor(Math.random() * 7);

        if (direction === 0) {
            return new WaitAction(this.entity).perform();
        } else {
            let q = 0;
            let r = 0;
            switch(direction) {
                case 1: // N
                    q = -1;
                    break;
                case 2: // NE
                    q = -1;
                    r = 1;
                    break;
                case 3: // SE
                    r = 1;
                    break;
                case 4: // S
                    q = 1;
                    break;
                case 5: // SW
                    q = 1;
                    r = -1;
                    break;
                case 6: // NW
                default:
                    r = -1;
                    break;
            }

            return new MovementAction(this.entity, q, r);
        }
    }
}