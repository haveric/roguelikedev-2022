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
            const word = words[i];
            const splitWords = word.split("\n");
            if (splitWords.length > 1) {
                currentLine = this.addWord(splitWords[0].trim(), lines, currentLine, maxWidth);
                lines.push(currentLine);
                currentLine = splitWords[1];
            } else {
                currentLine = this.addWord(word, lines, currentLine, maxWidth);
            }

        }
        lines.push(currentLine);
        return lines;
    }

    static addWord(word, lines, currentLine, maxWidth) {
        const width = sceneState.ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }

        return currentLine;
    }
}