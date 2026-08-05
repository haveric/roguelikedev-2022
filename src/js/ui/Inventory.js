import html from "../../html/ui/Inventory.html";
import _UIElement from "./_UIElement";

class Inventory extends _UIElement {
    constructor() {
        super(html);

        this.weapon = null;
        this.armor = null;

        this.maxPotions = 3;
        this.maxScrolls = 3;

        this.potions = [];
        this.scrolls = [];


    }
}


const inventory = new Inventory();
export default inventory;