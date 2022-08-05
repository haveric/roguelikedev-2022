export default class HexUtil {
    static PI = Math.PI;
    static HEX_A = this.PI / 3;
    static HEX_RADIUS_H = 20;
    static HEX_RADIUS_V = 20;//15;
    static OFFSET_V = 2 * this.HEX_RADIUS_V;
    static OFFSET_H = this.HEX_RADIUS_H;

    constructor() {}

    static drawHex(ctx, x, y) {
        ctx.beginPath();
        for (let i = 0; i < 6; i ++) {
            ctx.lineTo(x + HexUtil.HEX_RADIUS_H * Math.cos(HexUtil.HEX_A * i), y + HexUtil.HEX_RADIUS_V * Math.sin(HexUtil.HEX_A * i));
        }
        ctx.closePath();
    }

    static hexToArray(q, r) {
        return {
            x: Math.floor(r + (q / 2.0)),
            y: q
        };
    }

    static arrayToHex(row, col) {
        return {
            q: col,
            r: row - Math.floor(col / 2.0)
        };
    }

    static axialRound(fraqQ, fraqR) {
        let q = Math.round(fraqQ);
        let r = Math.round(fraqR);
        const fraqS = -fraqQ - fraqR;
        const s = Math.round(fraqS);

        const qDiff = Math.abs(q - fraqQ);
        const rDiff = Math.abs(r - fraqR);
        const sDiff = Math.abs(s - fraqS);

        if (qDiff > rDiff && qDiff > sDiff) {
            q = -r - s;
        } else if (rDiff > sDiff) {
            r = -q - s;
        }

        return {
            q: q,
            r: r
        };
    }

    static pixelToHex(point) {
        point.x -= this.HEX_RADIUS_H;
        point.y -= this.HEX_RADIUS_V;

        const q = ((2/3 * point.x)) / this.HEX_RADIUS_H;
        const r = ((-1/3 * point.x + Math.sqrt(3) / 3 * point.y)) / this.HEX_RADIUS_V;

        return this.axialRound(q, r);
    }

}
