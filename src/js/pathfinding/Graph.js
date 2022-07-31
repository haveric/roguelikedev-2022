import HexNode from "./HexNode";
import AStar from "./AStar";
import HexUtil from "../util/HexUtil";

export default class Graph {
    constructor(gridIn) {
        this.nodes = [];
        this.grid = [];
        for (let x = 0; x < gridIn.length; x++) {
            this.grid[x] = [];

            for (let y = 0, row = gridIn[x]; y < row.length; y++) {
                const node = new HexNode(x, y, row[y]);
                this.grid[x][y] = node;
                this.nodes.push(node);
            }
        }
        this.init();
    }

    init() {
        this.dirtyNodes = [];
        for (let i = 0; i < this.nodes.length; i++) {
            AStar.cleanNode(this.nodes[i]);
        }
    }

    cleanDirty() {
        for (let i = 0; i < this.dirtyNodes.length; i++) {
            AStar.cleanNode(this.dirtyNodes[i]);
        }
        this.dirtyNodes = [];
    }

    markDirty(node) {
        this.dirtyNodes.push(node);
    }

    neighbors(node) {
        const ret = [];
        const q = node.q;
        const r = node.r;

        this.addNeighbor(ret, q, r - 1);
        this.addNeighbor(ret, q + 1, r - 1);
        this.addNeighbor(ret, q + 1, r);
        this.addNeighbor(ret, q, r + 1);
        this.addNeighbor(ret, q - 1, r + 1);
        this.addNeighbor(ret, q - 1, r);

        return ret;
    }

    addNeighbor(array, q, r) {
        const xy = HexUtil.hexToArray(q, r);

        if (this.grid[xy.x] && this.grid[xy.x][xy.y]) {
            array.push(this.grid[xy.x][xy.y]);
        }
    }

    /*
    toString() {
        const graphString = [];
        const nodes = this.grid;
        for (let x = 0; x < nodes.length; x++) {
            const rowDebug = [];
            const row = nodes[x];
            for (let y = 0; y < row.length; y++) {
                rowDebug.push(row[y].weight);
            }
            graphString.push(rowDebug.join(" "));
        }
        return graphString.join("\n");
    }
     */
}