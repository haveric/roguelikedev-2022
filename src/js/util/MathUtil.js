export default class MathUtil {
    constructor() {}

    // Random integer between low and high
    static randIntBetween(low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
    }

    static randFloatBetween(low, high) {
        return low + Math.random() * (high - low);
    }
}