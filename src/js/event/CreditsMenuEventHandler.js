import _EventHandler from "./_EventHandler";
import engine from "../Engine";
import creditsMenu from "../ui/menu/CreditsMenu";

export default class CreditsMenuEventHandler extends _EventHandler {
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

        for (const button of creditsMenu.buttons) {
            button.hover = button.isInside(this.mouse.x, this.mouse.y);

            engine.needsRenderUpdate = true;
        }
    }

    onLeftClick(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of creditsMenu.buttons) {
            if (button.isInside(this.mouse.x, this.mouse.y)) {
                e.preventDefault();
                button.callback();

                creditsMenu.hide();

                break;
            }
        }
    }
}