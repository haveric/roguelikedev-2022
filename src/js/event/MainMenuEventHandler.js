import _EventHandler from "./_EventHandler";
import engine from "../Engine";
import mainMenu from "../ui/MainMenu";
import controls from "../controls/Controls";
import DefaultPlayerEventHandler from "./DefaultPlayerEventHandler";

export default class MainMenuEventHandler extends _EventHandler {
    constructor() {
        super();
    }

    teardown() {
        super.teardown();
    }

    handleInput() {
        if (engine.state === "game" && controls.testPressed("pause")) {
            mainMenu.hide();

            engine.setEventHandler(new DefaultPlayerEventHandler());
            engine.needsRenderUpdate = true;
        }

        return null;
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of mainMenu.buttons) {
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

        for (const button of mainMenu.buttons) {
            if (this.mouse.x > button.position.x && this.mouse.x < button.position.x + button.position.width && this.mouse.y > button.position.y && this.mouse.y < button.position.y + button.position.height) {
                e.preventDefault();
                button.callback();

                mainMenu.hide();

                break;
            }
        }
    }
}