class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const message = this.createChatBotMessage("Hello! How can I assist you with your art today?");
    this.setChatbotMessage(message);
  }

  handlePainting() {
    const message = this.createChatBotMessage("Painting is a wonderful art form. Are you interested in learning about techniques, materials, or something else?");
    this.setChatbotMessage(message);
  }

  handleDesign() {
    const message = this.createChatBotMessage("Design involves creativity and structure. What aspect of design are you curious about?");
    this.setChatbotMessage(message);
  }

  handleDrawing() {
    const message = this.createChatBotMessage("Drawing is a fundamental skill for many artists. Do you need tips on techniques or tools?");
    this.setChatbotMessage(message);
  }

  handleCreativity() {
    const message = this.createChatBotMessage("Creativity is the heart of all art forms. How can I help you boost your creativity?");
    this.setChatbotMessage(message);
  }

  handleUnknown() {
    const message = this.createChatBotMessage("I'm not sure how to help with that. Could you ask something about creativity, design, painting, or drawing?");
    this.setChatbotMessage(message);
  }

  handlePaintingTechniques() {
    const message = this.createChatBotMessage("Painting techniques can vary widely depending on the style and medium you're working with. Here are some common painting techniques across different styles:" +

      "1. ** Brushwork **: How you handle your brushes can greatly affect your painting.Techniques like stippling(dotting with a brush), blending, dry brushing(using very little paint on a dry brush), and wet - on - wet(painting on a wet surface) are all part of brushwork. \n" +
      "2. ** Layering **: Building up layers of paint allows you to create depth and richness in your work.This technique involves applying translucent layers of paint over each other to achieve desired effects. \n" +
      "3. ** Glazing **: Applying thin, translucent layers of paint over dried layers to modify color or add depth.This technique is common in oil and acrylic painting. \n" +
      "4. ** Impasto **: Applying thick layers of paint, often with a palette knife, to create texture and three - dimensional effects. \n" +
      "5. ** Washes **: Thin layers of diluted paint applied over a larger area to create a translucent effect, commonly used in watercolor and acrylic painting. \n" +
      "6. ** Scumbling **: Dry brushing a lighter color over a darker area, allowing some of the underpainting to show through, creating texture and depth. \n" +
      "7. ** Blending **: Smoothly transitioning colors by mixing them directly on the canvas or blending wet paint edges together. \n" +
      "8. ** Sgraffito **: Scratching through a top layer of paint to reveal underlying layers, creating texture and detail. \n" +
      "9. ** Spray painting **: Using aerosol cans or airbrushes to apply paint in a controlled manner, often used in graffiti and modern art. \n" +
      "10. ** Pointillism **: Creating images through dots of color, popularized by artists like Georges Seurat. \n" +
      "These techniques can be combined and adapted to suit your artistic vision and the specific requirements of your painting.Experimenting with different techniques can help you develop your own style and approach to painting. \n"
    )
    this.setChatbotMessage(message);
  }

  setChatbotMessage(message) {
    this.setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }
}

export default ActionProvider;