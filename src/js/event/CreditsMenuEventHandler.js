import _EventHandler from "./_EventHandler";
import engine from "../Engine";
import creditsMenu from "../ui/CreditsMenu";

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
            if (this.mouse.x > button.position.x && this.mouse.x < button.position.x + button.position.width && this.mouse.y > button.position.y && this.mouse.y < button.position.y + button.position.height) {
                button.hover = true;
            } else {
                button.hover = false;
            }

            engine.needsRenderUpdate = true;
        }
    }

    onLeftClick(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of creditsMenu.buttons) {
            if (this.mouse.x > button.position.x && this.mouse.x < button.position.x + button.position.width && this.mouse.y > button.position.y && this.mouse.y < button.position.y + button.position.height) {
                e.preventDefault();
                button.callback();

                creditsMenu.hide();

                break;
            }
        }
    }
}