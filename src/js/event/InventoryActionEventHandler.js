import _EventHandler from "./_EventHandler";
import controls from "../controls/Controls";
import engine from "../Engine";
import sceneState from "../SceneState";
import inventoryActionModal from "../ui/menu/InventoryActionModal";
import DefaultPlayerEventHandler from "./DefaultPlayerEventHandler";
import _Action from "../actions/_Action";
import _Component from "../components/_Component";

export default class InventoryActionEventHandler extends _EventHandler {
    constructor() {
        super();
    }

    teardown() {
        super.teardown();
    }

    handleInput() {
        const action = null;

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
            button.hover = button.isInside(this.mouse.x, this.mouse.y);

            engine.needsRenderUpdate = true;
        }
    }

    onLeftClick(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        for (const button of inventoryActionModal.buttons) {
            if (button.isInside(this.mouse.x, this.mouse.y)) {
                const actionOrComponent = button.actionOrComponent;
                if (actionOrComponent) {
                    e.preventDefault();

                    if (actionOrComponent instanceof _Action) {
                        engine.processAction(actionOrComponent);

                        engine.setEventHandler(new DefaultPlayerEventHandler());
                    } else if (actionOrComponent instanceof _Component) {
                        const action = actionOrComponent.getAction();
                        if (action) {
                            engine.processAction(action);

                            engine.setEventHandler(new DefaultPlayerEventHandler());
                        }
                    } else {
                        console.error("Unknown actionOrComponent type");
                    }

                    inventoryActionModal.hide();
                    engine.needsRenderUpdate = true;
                }
                break;
            }
        }
    }
}