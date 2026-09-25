export default class DateUtil {
    constructor() {

    }

    static formatDate(date) {
        const formatted = new Date(date);
        return formatted.getFullYear() + "-" + (formatted.getMonth() + 1) + "-" + formatted.getDate();
    }

    static formatTime(date) {
        const formatted = new Date(date);
        return formatted.getHours() + ":" + this.formatTwoDigits(formatted.getMinutes()) + ":" + this.formatTwoDigits(formatted.getSeconds());
    }

    static formatTwoDigits(number) {
        if (number < 10) {
            return "0" + number;
        }

        return "" + number;
    }
}