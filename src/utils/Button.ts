export default class Button {
    button: any;
    visibleElement: any;

    constructor(selector: any) {
        console.log(typeof selector)
        this.button = selector.querySelector('a');
        this.visibleElement = selector;
    }
}