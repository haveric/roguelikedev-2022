export default class Message {
    constructor(subMessages = []) {
        this.subMessages = subMessages;
        this.count = 1;
    }

    isEqual(subMessages) {
        if (this.subMessages.length !== subMessages.length) {
            return false;
        }

        for (let i = 0; i < this.subMessages.length; i++) {
            const sub1 = this.subMessages[i];
            const sub2 = subMessages[i];

            if (!sub1.isEqual(sub2)) {
                return false;
            }
        }

        return true;
    }
}