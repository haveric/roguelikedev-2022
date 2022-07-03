import _Action from "../_Action";

export default class _ActionWithDirection extends _Action {
    constructor(entity, dq = 0, dr = 0) {
        super(entity);

        this.dq = dq;
        this.dr = dr;
    }

    /**
     * @returns {_ActionWithDirection}
     */
    perform() {
        console.error("Not Implemented");
    }
}