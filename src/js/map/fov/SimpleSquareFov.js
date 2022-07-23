import _BaseFov from "./_BaseFov";

export default class SimpleSquareFov extends _BaseFov {
    constructor() {
        super();
    }

    compute(entity, radius) {
        super.compute(entity, radius);

        for (let i = this.left; i < this.right; i++) {
            for (let j = this.top; j < this.bottom; j++) {
                this.exploreTile(i, j);
            }
        }
    }
}