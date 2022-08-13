import engine from "./Engine";
import details from "./ui/Details";
import playerInfo from "./ui/PlayerInfo";
import messageConsole from "./ui/MessageConsole";

class SceneState {
    constructor() {
        this.setupGameHtml();

        this.DEFAULT_RESOLUTION_X = 1920;
        this.DEFAULT_RESOLUTION_Y = 1080;
        this.DEFAULT_RATIO = this.DEFAULT_RESOLUTION_X / this.DEFAULT_RESOLUTION_Y;
        this.scale = 1;
        this.resizeCanvas();
        window.addEventListener( "resize", this);

        this.debugRenderMap = false;
    }

    setupGameHtml() {
        const gameDom = document.createElement("div");
        gameDom.classList.add("game");

        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("view");

        gameDom.appendChild(this.canvas);

        playerInfo.open();
        messageConsole.open();
        details.open();

        playerInfo.appendTo(details.dom);
        messageConsole.appendTo(details.dom);
        details.appendTo(gameDom);

        document.body.appendChild(gameDom);

        this.ctx = this.canvas.getContext("2d");
    }

    handleEvent(e) {
        switch(e.type) {
            case "resize":
                this.resizeCanvas();

                break;
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth * .8;
        this.canvas.height = window.innerHeight;

        const scaleX = this.canvas.width / this.DEFAULT_RESOLUTION_X;
        const scaleY = this.canvas.height / this.DEFAULT_RESOLUTION_Y;
        const ratio = this.canvas.width / this.canvas.height;
        const deviceZoomLevel = window.devicePixelRatio;
        if (ratio > this.DEFAULT_RATIO) {
            this.scale = scaleY * deviceZoomLevel;
        } else {
            this.scale = scaleX * deviceZoomLevel;
        }

        engine.needsRenderUpdate = true;
    }

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const sceneState = new SceneState();
export default sceneState;
