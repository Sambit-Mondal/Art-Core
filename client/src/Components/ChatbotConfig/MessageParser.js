class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowercase = message.toLowerCase();

        if (lowercase.includes("hello") || lowercase.includes("hi")) {
            this.actionProvider.greet();
        } else if (lowercase.includes("painting")) {
            this.actionProvider.handlePainting();
        } else if (lowercase.includes("design")) {
            this.actionProvider.handleDesign();
        } else if (lowercase.includes("drawing")) {
            this.actionProvider.handleDrawing();
        } else if (lowercase.includes("creativity")) {
            this.actionProvider.handleCreativity();
        } else if (lowercase.includes("techniques")) {
            this.actionProvider.handlePaintingTechniques();
        } else {
            this.actionProvider.handleUnknown();
        }
    }
}

export default MessageParser;  