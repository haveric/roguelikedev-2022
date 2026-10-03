import _EventHandler from "./_EventHandler";
import engine from "../Engine";
import mainMenu from "../ui/menu/MainMenu";
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
        }

        return null;
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of mainMenu.buttons) {
            button.hover = button.isInside(this.mouse.x, this.mouse.y);

            engine.needsRenderUpdate = true;
        }
    }

    onLeftClick(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of mainMenu.buttons) {
            if (button.isInside(this.mouse.x, this.mouse.y)) {
                e.preventDefault();
                button.callback();

                mainMenu.hide();

                break;
            }
        }
    }
}