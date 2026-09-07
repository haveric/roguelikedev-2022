import sceneState from "../SceneState";

export default class HexUtil {
    static PI = Math.PI;
    static HEX_A = this.PI / 3;
    static HEX_B = this.PI / 6;
    static HEX_RADIUS_H = 20;
    static HEX_RADIUS_V = 20;
    //static OFFSET_V = 2 * this.HEX_RADIUS_V;
    //static OFFSET_H = this.HEX_RADIUS_H;

    constructor() {}

    static drawHex(ctx, x, y, scale = 1) {
        ctx.beginPath();
        for (let i = 0; i < 6; i ++) {
            ctx.lineTo(x + this.getHexRadiusHScaled(scale) * Math.cos(HexUtil.HEX_A * i), y + this.getHexRadiusVScaled(scale) * Math.sin(HexUtil.HEX_A * i));
        }
        ctx.closePath();
    }

    static drawHexAngleTop(ctx, x, y, scale = 1) {
        ctx.beginPath();
        for (let i = 0; i < 6; i ++) {
            ctx.lineTo(x + this.getHexRadiusHScaled() * Math.cos((HexUtil.HEX_A * i) - HexUtil.HEX_B) * scale, y + this.getHexRadiusVScaled() * Math.sin((HexUtil.HEX_A * i) - HexUtil.HEX_B) * scale);
        }
        //ctx.closePath();
    }

    static getHexDrawCoords(hex, qOffset, rOffset, scale = 1) {
        // TODO: Replace arbitrary 1.15
        const x = HexUtil.getHexRadiusHScaled(scale) + (HexUtil.getHexRadiusHScaled(scale) * (1 + Math.cos(HexUtil.HEX_A))) * hex.getDisplayX(qOffset);
        const y = 1.15 * HexUtil.getHexRadiusVScaled(scale) + (2 * HexUtil.getHexRadiusVScaled(scale) * Math.sin(HexUtil.HEX_A)) * hex.getDisplayY(qOffset, rOffset);
        const centerOffset = this.getHexCenterOffset(scale);
        return {
            "x": x + centerOffset.x,
            "y": y + centerOffset.y,
        };
    }

    static getHexCenterOffset(scale = 1) {
        return {
            "x": sceneState.center.x - (1.15 * this.getHexRadiusHScaled(scale)),
            "y": sceneState.center.y - (1.15 * this.getHexRadiusVScaled(scale)),
        };
    }

    static getHexRadiusHScaled(scale = 1) {
        return HexUtil.HEX_RADIUS_H * sceneState.scale * scale;
    }

    static getHexRadiusVScaled(scale = 1) {
        return HexUtil.HEX_RADIUS_V * sceneState.scale * scale;
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

    static pixelToHex(point, scale = 1) {
        const centerOffset = this.getHexCenterOffset(scale);
        point.x -= this.getHexRadiusHScaled(scale) + centerOffset.x;
        point.y -= this.getHexRadiusVScaled(scale) + centerOffset.y;

        const q = ((2/3 * point.x)) / this.getHexRadiusHScaled(scale);
        const r = ((-1/3 * point.x + Math.sqrt(3) / 3 * point.y)) / this.getHexRadiusVScaled(scale);

        return this.axialRound(q, r);
    }

}
