export default class ColorUtil {
    constructor() {}

    static toRGB(color) {
        const { style } = new Option();
        style.color = color;
        let rgb = style.color;
        rgb = rgb.replace("rgb(", "");
        rgb = rgb.replace("rgba(", "");
        rgb = rgb.replace(")", "");
        return rgb.split(",");
    }
}