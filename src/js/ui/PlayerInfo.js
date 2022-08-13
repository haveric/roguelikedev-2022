import html from "../../html/ui/PlayerInfo.html";
import _UIElement from "./_UIElement";

class PlayerInfo extends _UIElement {
    constructor() {
        super(html);
    }
}

const playerInfo = new PlayerInfo();
export default playerInfo;