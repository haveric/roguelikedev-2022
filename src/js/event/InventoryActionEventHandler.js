import _EventHandler from "./_EventHandler";
import controls from "../controls/Controls";
import engine from "../Engine";
import sceneState from "../SceneState";
import inventoryActionModal from "../ui/InventoryActionModal";
import DefaultPlayerEventHandler from "./DefaultPlayerEventHandler";

export default class InventoryActionEventHandler extends _EventHandler {
    constructor() {
        super();
    }

    teardown() {
        super.teardown();
    }

    handleInput() {
        const action = super.handleInput();
        if (action) {
            return action;
        }

        // DEBUG Actions
        if (controls.testPressed("debug_map")) {
            sceneState.debugRenderMap = sceneState.debugRenderMap !== true;
            engine.needsRenderUpdate = true;
        }

        return action;
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of inventoryActionModal.buttons) {
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

        for (const button of inventoryActionModal.buttons) {
            if (this.mouse.x > button.position.x && this.mouse.x < button.position.x + button.position.width && this.mouse.y > button.position.y && this.mouse.y < button.position.y + button.position.height) {
                if (button.action) {
                    button.action.afterPerform = () => {
                        engine.eventHandler.teardown();
                        engine.eventHandler = new DefaultPlayerEventHandler();

                        engine.needsRenderUpdate = true;
                    };

                    this.leftClickAction = button.action;

                    inventoryActionModal.hide();
                }
                break;
            }
        }
    }
}