import _EventHandler from "./_EventHandler";
import engine from "../Engine";
import saveGame from "../ui/menu/SaveGameMenu";

export default class SaveGameEventHandler extends _EventHandler {
    constructor() {
        super();
    }

    teardown() {
        super.teardown();
    }

    handleInput() {
        return null;
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of saveGame.buttons) {
            button.hover = button.isInside(this.mouse.x, this.mouse.y);

            engine.needsRenderUpdate = true;
        }
    }

    onLeftClick(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of saveGame.buttons) {
            if (button.isInside(this.mouse.x, this.mouse.y)) {
                e.preventDefault();
                button.callback();

                break;
            }
        }
    }
}