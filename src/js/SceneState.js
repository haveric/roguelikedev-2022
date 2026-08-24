import engine from "./Engine";

class SceneState {
    constructor() {
        this.setupGameHtml();

        this.DEFAULT_RESOLUTION_X = 1920;
        this.DEFAULT_RESOLUTION_Y = 1080;
        this.DEFAULT_RATIO = this.DEFAULT_RESOLUTION_X / this.DEFAULT_RESOLUTION_Y;
        this.scale = 1;
        this.center = {
            "x": this.canvas.width / 2 * this.scale,
            "y": this.canvas.height / 2 * this.scale
        };
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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const scaleX = this.canvas.width / this.DEFAULT_RESOLUTION_X;
        const scaleY = this.canvas.height / this.DEFAULT_RESOLUTION_Y;
        const ratio = this.canvas.width / this.canvas.height;
        if (ratio > this.DEFAULT_RATIO) {
            this.scale = scaleY;
        } else {
            this.scale = scaleX;
        }
        this.center = {
            "x": this.canvas.width / 2,
            "y": this.canvas.height / 2
        };

        engine.needsRenderUpdate = true;
        engine.needsBackgroundUpdate = true;
    }

    drawTextAt(text, x, y, fontSize, color = "white", textAlign = "center") {
        this.ctx.fillStyle = color;
        this.ctx.textAlign = textAlign;
        this.ctx.textBaseline = "middle";
        this.ctx.font = "bold " + (this.scale * fontSize) + "px serif";
        this.ctx.fillText(text, x, y);
    }

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const sceneState = new SceneState();
export default sceneState;
