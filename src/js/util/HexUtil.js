export default class HexUtil {
    static PI = Math.PI;
    static HEX_A = this.PI / 3;
    static HEX_RADIUS = 20;

    constructor() {}

    static drawHex(ctx, x, y) {
        ctx.beginPath();
        for (let i = 0; i < 6; i ++) {
            ctx.lineTo(x + HexUtil.HEX_RADIUS * Math.cos(HexUtil.HEX_A * i), y + HexUtil.HEX_RADIUS * Math.sin(HexUtil.HEX_A * i));
        }
        ctx.closePath();
    }

    static hexToArray(q, r) {
        return {
            x: Math.floor(q + (r / 2.0)),
            y: r
        };
    }

    static arrayToHex(row, col) {
        return {
            q: row - Math.floor(col / 2),
            r: col
        };
    }
}
