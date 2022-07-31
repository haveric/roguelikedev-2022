import SubMessage from "./SubMessage";
import Message from "./Message";

class MessageManager {
    constructor() {
        this.messages = [];
        this.builder = [];
    }

    text(text, color, options) {
        this.builder.push(new SubMessage(text, color, options));
        return this; // Allow chaining
    }

    build(stack = true) {
        this.addMessage(this.builder.slice(0), stack);
        this.builder = [];
    }

    clear() {
        this.messages = [];
    }

    addMessage(subMessages, stack = true) {
        if (stack && this.messages.length > 0) {
            const lastMessage = this.messages[this.messages.length - 1];
            if (lastMessage.isEqual(subMessages)) {
                lastMessage.count += 1;
                this.updateLastMessageCount(lastMessage);
            } else {
                this.messages.push(new Message(subMessages));
                this.addNewMessage();
            }
        } else {
            this.messages.push(new Message(subMessages));
            this.addNewMessage();
        }
    }

    updateLastMessageCount(lastMessage) {
        console.log(lastMessage);
        // const lastMessageDom = document.querySelectorAll(".message:last-child")[0];
        // const amountDom = lastMessageDom.querySelectorAll(".message__amount")[0];
        //
        // if (amountDom) {
        //     amountDom.innerText = "x" + lastMessage.count;
        // } else {
        //     lastMessageDom.appendChild(lastMessage.getCountHtml());
        // }
    }

    addNewMessage() {
        const lastMessage = this.messages[this.messages.length - 1];
        console.log(lastMessage);
        //this.messagesInnerDom.appendChild(lastMessage.getHtml());
    }
}

const messageManager = new MessageManager();
export default messageManager;