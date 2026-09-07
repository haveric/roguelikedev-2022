export default class _EventHandler {
    constructor() {
        this.mouse = {
            x: -1,
            y: -1
        };
        this.mouseDown = false;
        this.leftClickAction = null;
        this.rightClickAction = null;

        window.addEventListener("mousemove", this);
        window.addEventListener("mousedown", this);
        window.addEventListener("mouseup", this);
        window.addEventListener("click", this);
        window.addEventListener("contextmenu", this);
        window.addEventListener("change", this);
        window.addEventListener("keydown", this);

        this.isPlayerTurn = true;
        this.targetedTile = null;
        this.pathTiles = [];
    }

    teardown() {
        window.removeEventListener("mousemove", this);
        window.removeEventListener("mousedown", this);
        window.removeEventListener("mouseup", this);
        window.removeEventListener("click", this);
        window.removeEventListener("contextmenu", this);
        window.removeEventListener("change", this);
        window.removeEventListener("keydown", this);
    }

    handleEvent(e) {
        switch(e.type) {
            case "mousemove":
                this.onMouseMove(e);
                break;
            case "mousedown":
                this.onMouseDown(e);
                break;
            case "mouseup":
                this.onMouseUp(e);
                break;
            case "click":
                this.onLeftClick(e);
                break;
            case "contextmenu":
                this.onRightClick(e);
                break;
            case "change":
                this.onChange(e);
                break;
            case "keydown":
                this.onKeydown(e);
                break;
        }
    }

    handleInput() {
        let action = null;

        if (this.leftClickAction) {
            action = this.leftClickAction;
            this.leftClickAction = null;
        } else if (this.rightClickAction) {
            action = this.rightClickAction;
            this.rightClickAction = null;
        }

        return action;
    }

    onMouseMove(/*e*/) {}

    onMouseDown(/*e*/) {
        this.mouseDown = true;
    }

    onMouseUp(/*e*/) {
        this.mouseDown = false;
    }

    onLeftClick(/*e*/) {}

    onRightClick(/*e*/) {}

    onChange(/*e*/) {}

    onKeydown(/*e*/) {}

}