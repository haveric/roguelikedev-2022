import sceneState from "../SceneState";

export default class TextUtil {
    constructor() {}

    static getLines(text, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = words[0];
        if (currentLine.startsWith("\n")) {
            currentLine = currentLine.substring("\n".length);
        }

        for (let i = 1; i < words.length; i++) {
            let word = words[i];
            if (word.startsWith("\n")) {
                lines.push(currentLine);
                word = word.substring("\n".length);
                currentLine = word;
            }
            const width = sceneState.ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}