export default class Button {
    button: any;
    visibleElement: any;

    constructor(selector: any) {
        const button = selector.querySelector('a');
        this.button = button ?? selector;
        this.visibleElement = selector;
    }
}