import _Component from "../_Component";

export default class _AI extends _Component {
    constructor(args = {}, type) {
        super(args, "ai", type);
    }

    save() {
        return null;
    }

    perform() {
        console.error("Not Implemented");
    }
}